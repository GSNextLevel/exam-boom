var AWS = require('aws-sdk')
AWS.config.update({
    region: 'ap-northeast-2',
    endpoint: "http://dynamodb.ap-northeast-2.amazonaws.com"
})
const docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async(event) => {
    let email = event['body-json']['email'];
    let password = event['body-json']['password'];
    
    let getParams = {
        TableName: 'exam'
    }
}