import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'ap-south-1_0MbT9rHLh',
  // Region: 'ap-south-1',
  ClientId: '695jnckdbn931ctp64k8iop33s',
};

export default new CognitoUserPool(poolData);
