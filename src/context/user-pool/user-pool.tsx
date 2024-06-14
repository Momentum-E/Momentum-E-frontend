import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolId = process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID;
const clientId = process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID;

if (!userPoolId || !clientId) {
  throw new Error(
    "Missing Cognito User Pool ID or Client ID in environment variables"
  );
}

// console.log("Cognito User Pool ID:", process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID);
// console.log("Cognito Client ID:", process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID);

const poolData = {
  UserPoolId: userPoolId as string,
  ClientId: clientId as string,
};

export default new CognitoUserPool(poolData);
