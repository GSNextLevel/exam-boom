const jwt = require('jsonwebtoken');

const splitByDelimiter = (data, delim) => {
    const pos = data ? data.indexOf(delim) : -1;
    return pos > 0 ? [data.substr(0, pos), data.substr(pos + 1)] : ["", ""];
  };

const jwtSecret = "verySecret";

exports.handler = async event => {
    const [type, token] = splitByDelimiter(event.authorizationToken, " ");
    const allow = type === "Bearer" && !!jwt.verify(token, jwtSecret);
    let decoded = jwt.verify(token, jwtSecret);
    return {
      principalId: "user",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: allow ? "Allow" : "Deny",
            Resource: event.methodArn
          }
        ]
      },
      context: {
          email: decoded.email,
          nickname: decoded.nickname
      }
    };
  };