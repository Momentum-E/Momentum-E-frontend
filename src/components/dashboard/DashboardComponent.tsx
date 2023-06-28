import React, { useEffect, useState, useContext } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Sidebar, DashboardNavbar, DashboardContent } from '@/components/dashboard';
import {
  CognitoUserPool,
  CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';


const DashboardComponent = () => {
  
  let isTab = useMediaQuery({ query: '(max-width:768px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);
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
                  console.log(userData)
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
  
  useEffect(() => {
    if (isTab) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isTab]);

  return (
    <div className="flex ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isTab={isTab}/>
      {/* main had a class max-w-5xl */}
      <main className="max-w-full flex-1 mx-auto h-screen pb-16 overflow-hidden">
        <DashboardNavbar setIsOpen={setIsOpen} isOpen={isOpen}/>
        {/*  Main Content */}
        <DashboardContent />
      </main>
    </div>
  );
}

export default DashboardComponent