// @ts-nocheck
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
  // const [AccessToken, setAccessToken] = useState('')

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);
  
  const checkAuthentication = async (userId:string) => {
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
    // const token = localStorage.getItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.accessToken`)
    // axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/get-current-user`,{
    //   headers:{
    //     AccessToken:token
    //   }
    // })
    // .then((res)=>{
    //   await getSession();
    //   setIsAuthenticated(true);
    // })
    // .catch((err)=>{
    //   console.log(err)
    //   setIsAuthenticated(false);
    // })
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
    // await new Promise((resolve, reject) => {
    //   const user = new CognitoUser({ Username, Pool });

    //   const authDetails = new AuthenticationDetails({ Username, Password });

    //   user.authenticateUser(authDetails, {
    //     onSuccess: (data) => {
    //       console.log('onSuccess: ', data);
    //       resolve(data);
    //       setIsAuthenticated(true);

    //       window.history.replaceState({
    //         fromHashChange: true
    //       },null, '/dashboard');

    //       window.location.reload()
    //     },
    //     onFailure: (err) => {
    //       console.error('onFailure: ', err);
    //       reject(err);
    //       setIsAuthenticated(false);
    //     },
    //     newPasswordRequired: (data) => {
    //       console.log('newPasswordRequired: ', data);
    //       alert('New password required, kindly change your password in your profile page.')
    //     },
    //   });
    // });
    console.log(Username,Password)
    await new Promise((resolve, reject) => {
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/login`,{
        headers:{
          password:Password,
          username:Username,
        }
      })
      .then((res)=>{
        console.log('onSuccess: ', res.data);
        resolve(res.data);
        setIsAuthenticated(true);

        window.history.replaceState({
          fromHashChange: true
        },null, '/dashboard');

        window.location.reload()
      })
      .catch((err)=>{
        console.error('onFailure: ', err);
        reject(err);
        setIsAuthenticated(false);
      })
    })
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
            axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/delete/${username}`)
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

  const logout = async (userId:string) => {
    const token = localStorage.getItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${userId}.accessToken`)
    // const user = Pool.getCurrentUser();
    // if (user) {
    //   user.signOut();
    //   setIsAuthenticated(false)
    // }
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/logout`,{
      headers:{
        AccessToken:token
      }
    })
    .then((res)=>{
      setIsAuthenticated(false)
    })
    .catch((err)=>{
      console.log('Error logging out: '+err)
    })
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