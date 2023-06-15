import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_1k0YcvhBt',
  ClientId: '5anhoi3gpfgvnqsd609smuh0qi',
};

export default new CognitoUserPool(poolData);
