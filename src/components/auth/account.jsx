import React, { createContext,useState,useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';
import Pool from '../user-pool/user-pool';
import * as AWS from 'aws-sdk/global';

const AccountContext = createContext();

const Account = ({ children }) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const user = Pool.getCurrentUser();
      if (user) {
        await getSession(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data);
          resolve(data);
          setIsAuthenticated(true);

          // This code got from AWS documentation for establishing a user session with the Amazon Cognito Identity service.
          var accessToken = result.getAccessToken().getJwtToken();

          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = 'ap-south-1';

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: '...', // your identity pool id here
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              'cognito-idp.ap-south-1.amazonaws.com/ap-south-1_1k0YcvhBt': result
                .getIdToken()
                .getJwtToken(),
            },
          });

          //refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
          AWS.config.credentials.refresh(error => {
            if (error) {
              console.error(error);
            } else {
              // Instantiate aws sdk service objects now that the credentials have been updated.
              // example: var s3 = new AWS.S3();
              console.log('Successfully logged!');
            }
          });
        },
        onFailure: (err) => {
          console.error('onFailure: ', err);
          reject(err);
          setIsAuthenticated(false);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired: ', data);
          alert('New password required, kindly change your password.')
        },
      });
    });
  };


  // for checking if the email is verified or not so that when a user log's In it is redirected to confirmSignup page
  const checkEmailConfirmation = async (email) => {
    const user = Pool.getUser(email);
  
    return new Promise((resolve, reject) => {
      user.getUserAttributes((err, result) => {
        if (err) {
          reject(err);
        } else {
          const emailAttribute = result.find(
            (attribute) => attribute.getName() === 'email'
          );
  
          if (emailAttribute) {
            const isEmailConfirmed = emailAttribute.getValue() === 'true';
            resolve(isEmailConfirmed);
          } else {
            // Email attribute not found
            reject(new Error('Email attribute not found'));
          }
        }
      });
    });
  };  

  const logout = async () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      router.replace('/auth/login/')
      setIsAuthenticated(false);
    }
  };

  return (
    <AccountContext.Provider value={{
      isAuthenticated,
      authenticate,
      getSession,
      logout,
      checkEmailConfirmation }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };