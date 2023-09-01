import React, { createContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './user-pool/user-pool';
import { useRouter } from 'next/router';

const AccountContext = createContext();

const Account = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter()

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

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
      } 
      else {
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
          window.history.replaceState({
            fromHashChange: true
          }, null,'/dashboard');
          window.location.reload()
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

  const DeleteUserAccount = async (username,password) => {
    const user = new CognitoUser({ Username: username, Pool });
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        user.deleteUser((err, data) => {
          if (err) {
            console.error('Error deleting user: ', err);
          } else {
            console.log('User deleted successfully',data);
            user.signOut();
            setIsAuthenticated(false)
            // Deleting the user from enode
            // Delete user from DynamoDb
          }
        });
      },
      onFailure: (err) => {
        console.error('Error authenticating user for deletion: ', err);
      },
    });
  } 

  const logout = async () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setIsAuthenticated(false)
    }
  };

  return (
    <AccountContext.Provider value={{
      isAuthenticated,
      authenticate,
      getSession,
      DeleteUserAccount,
      logout 
      }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };