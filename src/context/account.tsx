// @ts-nochec
import { toast } from 'react-toastify';
import React, { createContext, useContext, useState, useEffect } from 'react';
// import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import Pool from './user-pool/user-pool';
import axios from 'axios';

type AccountContextProps = {
  isAuthenticated:boolean;
  userid:string;
  checkAuthentication:() => Promise<unknown>;
  // authenticate:(Username: string, Password: string) => Promise<void>;
  // getSession:() => Promise<unknown>;
  DeleteUserAccount:() => Promise<void>;
  logout: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
}

const AccountContext = createContext({} as AccountContextProps);

const AccountProvider = ({ children }:any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [AccessToken, setAccessToken] = useState('')
  const [userid, setUserid] = useState('')

  useEffect(() => {
    checkAuthentication();
    console.log('chekAuthentication inside useEffect')
  }, [isAuthenticated]);
  
  const checkAuthentication = async () => {
    // if(AccessToken!==""){
      return await new Promise((resolve, reject) => {
        const token = localStorage.getItem('AccessToken')
        axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/get-current-user`,{
          headers:{
            authorization:`Bearer ${token}`
          }
        })
        .then((res)=>{
          console.log("checkAuthenticaton:"+res.data)
          setIsAuthenticated(true);
          setUserid(res.data.Username)
          console.log(res.data)
          resolve(res.data)
        })
        .catch((err)=>{
          setIsAuthenticated(false);
          setUserid('')
          console.log("checkAuthentication: "+err)
          // return(err)
          reject(err)
        })
      })
    // }
    // else{
    //   console.log("No user present")
    // }
  };

  // const getSession = async () => {
  //   return await new Promise((resolve, reject) => {
  //     const user = Pool.getCurrentUser();
  //     if (user) {
  //       user.getSession((err:any, session:any) => {
  //         if (err) {
  //           reject();
  //         } else {
  //           resolve(session);
  //         }
  //       });
  //     } 
  //     else {
  //       reject();
  //     }
  //   });
  // };

  // const authenticate = async (Username:string, Password:string) => {
  //   await new Promise((resolve, reject) => {
  //     console.log(Username, Password)
  //     let config = {
  //       method: 'post',
  //       url: `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/login`,
  //       headers: { 
  //         'Content-Type': 'application/json'
  //       },
  //       data : JSON.stringify({
  //         "password": Password,
  //         "email": Username
  //       })
  //     };
  //     try{
  //       axios.request(config)
  //       .then((res)=>{
  //         setAccessToken(res.data.AuthenticationResult.AccessToken)
  //         localStorage.setItem('AccessToken',res.data.AuthenticationResult.AccessToken)
  //         localStorage.setItem('RefreshToken',res.data.AuthenticationResult.RefreshToken)
  //         localStorage.setItem("IdToken",res.data.AuthenticationResult.IdToken)
  //         console.log(res.data)
          
  //         window.history.replaceState({
  //           fromHashChange: true
  //         },null, '/dashboard');
          
  //         window.location.reload()
  //         setIsAuthenticated(true);
          
  //         resolve(res.data);
  //       })
  //       .catch((err)=>{
  //         toast.error(err)
  //       })
  //     }
  //     catch(error){
  //       toast.error(error)
  //       reject(error);
  //     }
  //   })
  // };

  const DeleteUserAccount = async () => {
    // const user = new CognitoUser({ Username: username, Pool });
    // const authDetails = new AuthenticationDetails({ Username: username, Password: password });

    // user.authenticateUser(authDetails, {
    //   onSuccess: (session) => {
    //     user.deleteUser((err, data) => {
    //       if (err) {
    //         console.error('Error deleting user: ', err);
    //       } 
    //       else {

    // Deleting a user from cognito
    const token = localStorage.getItem('AccessToken')
    console.log(token, AccessToken)
    if(token){
      axios.delete(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/delete-user`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      }).then((res)=>{
        console.log("Deleted user from congnito"+res.data)
      }).catch((err)=>{
        console.log("Couldn't delete user from cognito"+err)
      })
    }
    
    // Delete user from DynamoDb
    axios.delete(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/users/delete/${userid}`)
    .then((res)=>{
      console.log('Deleted user from dynamoDB: '+res.data)
    }).catch((err)=>{
      console.log('Error deleting user from dynamoDB: '+err)
    })


    // Deleting the user from enode
    axios.delete(`http://localhost:5000/vehicles/delete-user/${userid}`)
    .then((res)=>{
      console.log('Deleted user from enode: '+res.data)
    }).catch((err)=>{
      console.log('Error deleting user from enode: '+err)
    })

    axios.delete(`http://localhost:5000/user-data/users/image/${userid}`)
    .then((res)=>{
      console.log('User image from s3: '+res.data)
    }).catch((err)=>{
      console.log('Error deleting user image from s3: '+err)
    })

    await logout()
    setIsAuthenticated(false)
    console.log('User deleted successfully');
    toast.success('User deleted successfully');
    // router.replace('/auth/login')
          // }
    //     });
    //   },
    //   onFailure: (err) => {
    //     console.error('Error authenticating user for deletion: ', err);
    //     toast.error(err.message);
    //   },
    // });
  } 

  const logout = async () => {
    const token = localStorage.getItem('AccessToken')
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/logout`,{
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    .then((res)=>{
      console.log(res.data)
      localStorage.removeItem('AccessToken')
      localStorage.removeItem('RefreshToken')
      localStorage.removeItem('IdToken')
      setUserid('')
      setIsAuthenticated(false)
      window.location.reload()
    })
    .catch((err)=>{
      console.log('Error logging out: '+err)
    })
  };

  return (
    <AccountContext.Provider value={{
        isAuthenticated,
        userid,
        // authenticate,
        checkAuthentication,
        // getSession,
        setAccessToken,
        setIsAuthenticated,
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