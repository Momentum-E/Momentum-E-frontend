import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { useRouter } from 'next/router';
import Pool from '../user-pool/user-pool';

const AccountContext = createContext();

const Account = ({ children }) => {
  const router = useRouter()

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
        },
        onFailure: (err) => {
          console.error('onFailure: ', err);
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired: ', data);
          resolve(data);
        },
      });
    });
  };

  const logout = async () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      router.replace('/')
    }
  };

  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };