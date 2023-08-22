import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_R3M6j4kWx',
  // Region: 'ap-south-1',
  ClientId: '75uahg9l9i6r2u6ikt46gu0qfk',
};

export default new CognitoUserPool(poolData);
