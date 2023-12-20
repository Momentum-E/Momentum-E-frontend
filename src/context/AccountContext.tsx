import { toast } from 'react-toastify';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails, CognitoUserSession } from 'amazon-cognito-identity-js';
import Pool from './user-pool/user-pool';
import axios from 'axios';

type AccountContextProps = {
  user:string|null;
  IdToken:string;
  accessToken:string;
  isAuthenticated:boolean;
  setIsAuthenticated:React.Dispatch<React.SetStateAction<boolean>>;
  getSession:() => Promise<unknown>;
  DeleteUserAccount:(username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AccountContext = createContext({} as AccountContextProps);

const AccountProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string|null>(null)
  const [IdToken, setIdToken] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

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
        user.getSession((err:any, session:CognitoUserSession) => {
          if (err) {
            reject(err);
          } 
          else {
            resolve(session);
            // console.log("IdToken: "+ session.getIdToken().getJwtToken())
            // console.log("accessToken: "+ session.getAccessToken().getJwtToken())
            // console.log("refreshToken: "+ session.getRefreshToken().getToken())
            // console.log("UserId: "+ user.getUsername())
            setUser(user.getUsername())
            setIdToken(session.getIdToken().getJwtToken());
            setAccessToken(session.getAccessToken().getJwtToken());
            setRefreshToken(session.getRefreshToken().getToken());
            localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${user}.accessToken`,session.getAccessToken().getJwtToken());
            localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${user}.refreshToken`,session.getRefreshToken().getToken());
            localStorage.setItem(`CognitoIdentityServiceProvider.75uahg9l9i6r2u6ikt46gu0qfk.${user}.idToken`,session.getIdToken().getJwtToken());
          }
        });
      } 
      else {
        reject();
      }
    });
  };

  const DeleteUserAccount = async (username:string, password:string) => {
    await getSession();
    const user = new CognitoUser({ Username: username, Pool });
    const authDetails = new AuthenticationDetails({ Username: username, Password: password });
    const token = localStorage.getItem(`CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}.${username}.idToken`)
    
    user.authenticateUser(authDetails, {
      onSuccess: (session) => {
        // console.log(session.getIdToken().payload.email)
          user.deleteUser((err, data) => {
            if (err) {
              console.error('Error deleting user: ', err);
            } 
            else {
              user.signOut();
              setIsAuthenticated(false)
              
              // Delete user from DynamoDb
              axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/delete/${username}`,{
                headers: {
                  authorization:`Bearer ${token}`
                }
              })
              .then((res)=>{
                console.log('Deleted user from dynamoDB: '+res.data)
              }).catch((err)=>{
                console.log('Error deleting user from dynamoDB: '+err)
              })
  
              // Deleting the user from enode
              axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/vehicles/delete-user/${username}`,{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              .then((res)=>{
                console.log('Deleted user from enode: '+res.data)
              }).catch((err)=>{
                console.log('Error deleting user from enode: '+err)
              })
  
              // Deleting user saved image from S3 bucket 
              axios.delete(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/user-data/users/image/${username}`,{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              .then((res)=>{
                console.log('User image from s3: '+res.data)
              }).catch((err)=>{
                console.log('Error deleting user image from s3: '+err)
              })
  
              // Deleting user subscription from stripe 
              axios.delete(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/delete-customer?email=${session.getIdToken().payload.email}`,{
                headers:{
                  authorization:`Bearer ${token}`
                }
              })
              .then((res)=>{
                console.log('Customer deleted from stripe: '+res.data)
              })
              .catch((err)=>{
                console.log('Error deleting customer from stripe: '+ err)
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
      user,
      IdToken,
      accessToken,
      isAuthenticated,
      setIsAuthenticated,
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