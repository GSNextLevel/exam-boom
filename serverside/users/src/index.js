var AWS = require('aws-sdk')
AWS.config.update({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
})
const docClient = new AWS.DynamoDB.DocumentClient();
const bcrypt = require('bcrypt');
const table = 'examBoom-users';

exports.handler = async (event, context, callback) => {

    if(event.context['http-method'] === "GET") {
        let email = event.params.email;
        let getParams = {
            TableName: table,
            Key: {
                "email": email
            }
        }
        try {
            let user = await docClient.get(getParams).promise();
            return {
                email: user.email,
                nickname: user.nickname,
                emailValidation: user.emailValidation
            }
        } catch (error) {
            callback(new Error("Unknown user")); 
        }
        
    }
    else if(event.context['http-method'] === "PUT") {
        let email = event['body-json']['email']
        var findParams = {
            TableName : 'examBoom-users',
            Key: {
                "email": email
            }
        };
        let findAny = await docClient.get(findParams).promise();
        // console.log(findAny)
        
        if (Object.keys(findAny).length === 0 ){
            // let nickname = event['body-json']['nickname']
            let password = event['body-json']['password']
            let hashedPassword = bcrypt.hashSync(password, 10)
            let putParams = {
                TableName: "examBoom-users",
                Item: {
                    "email": email,
                    // "nickname": nickname,
                    "password": hashedPassword,
                    "emailValidation": false
                }
            };    
            try {
                let result = await docClient.put(putParams).promise();
                console.log(putParams);
                console.log(result);
                return {"message": "회원가입 성공"}
            } catch (err) {
                console.err(err);
            }
            
        } else { //해당 email이 존재하는경우 
            return {"message": "해당 email이 존재합니다."}
        }
    }
    else if(event.context['http-method'] == "DELETE") {
        //delete 
    }

    console.log("end read");
};
