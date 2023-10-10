import { toast } from 'react-toastify';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './user-pool/user-pool';
import axios from 'axios';

type AccountContextProps = {
  isAuthenticated:boolean;
  authenticate:(Username: string, Password: string) => Promise<void>;
  getSession:() => Promise<unknown>;
  DeleteUserAccount:(username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AccountContext = createContext({} as AccountContextProps);

const AccountProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);
  
  const checkAuthentication = async () => {
    try {
      const user = Pool.getCurrentUser();
      if (user) {
        await getSession();
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
        user.getSession((err:any, session:any) => {
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

  const authenticate = async (Username:string, Password:string) => {
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
          }, '/dashboard');

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

  const DeleteUserAccount = async (username:string,password:string) => {
    const user = new CognitoUser({ Username: username, Pool });
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });

    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        user.deleteUser((err, data) => {
          if (err) {
            console.error('Error deleting user: ', err);
          } 
          else {
            user.signOut();
            setIsAuthenticated(false)
            
            // Delete user from DynamoDb
            axios.get(`http://localhost:5000/auth/users/delete/${username}`)
            .then((res)=>{
              console.log('Deleted user from dynamoDB: '+res.data)
            }).catch((err)=>{
              console.log('Error deleting user from dynamoDB: '+err)
            })

            // Deleting the user from enode
            axios.get(`http://localhost:5000/vehicles/delete-user/${username}`)
            .then((res)=>{
              console.log('Deleted user from enode: '+res.data)
            }).catch((err)=>{
              console.log('Error deleting user from enode: '+err)
            })

            axios.delete(`http://localhost:5000/user-data/users/image/${username}`)
            .then((res)=>{
              console.log('User image from s3: '+res.data)
            }).catch((err)=>{
              console.log('Error deleting user image from s3: '+err)
            })

            console.log('User deleted successfully',data);
            toast.success('User deleted successfully');
          }
        });
      },
      onFailure: (err) => {
        console.error('Error authenticating user for deletion: ', err);
        toast.error(err.message);
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

const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccountContext must be used within the AppProvider');
  }
  return context;
};

export { AccountProvider, AccountContext, useAccountContext };