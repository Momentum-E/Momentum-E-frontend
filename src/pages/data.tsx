import { useEffect, useState } from 'react';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userPoolId = 'ap-south-1_1k0YcvhBt';
      const clientId = '5anhoi3gpfgvnqsd609smuh0qi';
      const region = 'ap-south-1';
      const identityPoolId = 'ap-south-1:c3738724-8009-4c80-89de-ce4f21a2da6b';
      const tableName = 'MomentumUsers';

      const poolData = {
        UserPoolId: userPoolId,
        ClientId: clientId,
      };
      const userPool = new CognitoUserPool(poolData);
      const cognitoUser = userPool.getCurrentUser();

      if (cognitoUser !== null) {
        //@ts-ignore
        cognitoUser.getSession((err, session) => {
          if (err) {
            console.error('Error getting user session:', err);
          } else {
            const { accessToken } = session;

            AWS.config.update({
              region: region,
              credentials: new AWS.CognitoIdentityCredentials({
                IdentityPoolId: identityPoolId,
                Logins: {
                  [`cognito-idp.${region}.amazonaws.com/${userPoolId}`]: session
                    .getIdToken()
                    .getJwtToken(),
                },
              }),
            });

            const dynamodb = new AWS.DynamoDB.DocumentClient();

            // Retrieve user attributes from Cognito
            cognitoUser.getUserAttributes(async (err, attributes) => {
              if (err) {
                console.error('Error retrieving user attributes:', err);
              } else {
                const userIdAttribute = attributes?.find(
                  (attr) => attr.Name === 'sub'
                );
                const userId = userIdAttribute?.Value;

                const params = {
                  TableName: tableName,
                  Key: {
                    userId: userId,
                  },
                };

                try {
                  const response = await dynamodb.get(params).promise();
                  const userData = response.Item;
                  //@ts-ignore
                  setUserData(userData);
                } catch (error) {
                  console.error('Error fetching user data:', error);
                }
              }
            });
          }
        });
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userData && (
        <div>
          {/* <h2>Welcome, {userData.name}</h2> */}
          {userData}
          {/* <p>Email: {userData.email}</p> */}
          {/* Display other user data as needed */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
