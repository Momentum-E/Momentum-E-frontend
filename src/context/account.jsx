import { toast } from 'react-toastify';
import React, { createContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './user-pool/user-pool';
import { useRouter } from 'next/router';
import axios from 'axios';

const AccountContext = createContext();

const Account = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter()
  const [token, setToken] = useState('');

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

            // Geting token
            axios.get('http://localhost:5000/auth/token')
            .then((res)=>{
              setToken(res.data.Access_Token)
            })
            .catch((err)=>{
              console.log('Error getting token: '+err)
            })

            // Deleting the user from enode
            // axios.get(`http://localhost:5000/vehicles/delete-user/${username}`)
            // .then((res)=>{
            //   console.log('Deleted user from enode: '+res.data)
            // }).catch((err)=>{
            //   console.log('Error deleting user from enode: '+err)
            // })

            // Deleting the user from enode
            let config = {
              method: 'delete',
              maxBodyLength: Infinity,
              url: `https://enode-api.sandbox.enode.io/users/${username}`,
              headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
              }
            };
            
            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
              console.log(error);
            });

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

export { Account, AccountContext };