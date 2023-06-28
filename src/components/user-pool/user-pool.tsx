import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_1k0YcvhBt',
  // Region: 'ap-south-1',
  ClientId: '5anhoi3gpfgvnqsd609smuh0qi',
};

export default new CognitoUserPool(poolData);
