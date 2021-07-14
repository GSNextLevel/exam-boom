const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

AWS.config.update({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
})

const docClient = new AWS.DynamoDB.DocumentClient();

const jwtSecret = "verySecret";

const splitByDelimiter = (data, delim) => {
    const pos = data ? data.indexOf(delim) : -1;
    return pos > 0 ? [data.substr(0, pos), data.substr(pos + 1)] : ["", ""];
  };

const decodeBase64 = (input) => Buffer.from(input, "base64").toString("utf8");

exports.handler = async(event) => {
    const [type, data] = splitByDelimiter(event.headers["Authorization"], " ");
    const [email, pw] = splitByDelimiter(decodeBase64(data), ":");
    const unauthorized = {
        statusCode: 401,
        body: "Unauthorized"
    };
    
    if (type !=="Basic") {
        console.log("Basic 요청이 아님.")
        return unauthorized;
    }

    let getParams = { 
        TableName: 'examBoom-users',
        Key: { email: email }
    }
    
    try {
        let user = await docClient.get(getParams).promise()
        let nickname = user.nickname;
        let result = await bcrypt.compare(pw, user.password);
        
        if (!result) {
            console.log("비밀번호가 일치하지 않음.")
            return unauthorized;
        }

        const token = jwt.sign({ email, nickname }, jwtSecret, { expiresIn: "30m"});
        return {
            statusCode: 200,
            body: JSON.stringify( { token })
        }
    } catch (error){
        console.error(error)
    }
}