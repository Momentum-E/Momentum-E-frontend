import { toast } from 'react-toastify';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

type AccountContextProps = {
  isAuthenticated:boolean;
  userid:any;
  checkAuthentication:() => Promise<unknown>;
  getSession:() => Promise<unknown>;
  DeleteUserAccount:() => Promise<void>;
  logout: () => void;
  RefreshToken: (callback:()=>any) => Promise<void>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
}

const AccountContext = createContext({} as AccountContextProps);

const AccountProvider = ({ children }:any) => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [AccessToken, setAccessToken] = useState('')
  const [userid, setUserid] = useState<any>()

  useEffect(() => {
    checkAuthentication();
    console.log('chekAuthentication inside useEffect')
  }, [isAuthenticated]);
  
  const checkAuthentication = async () => {
    try {
      if(isAuthenticated){
        console.log('User Authenticated')
      }
      else{
        getSession()
        .then((res)=>{
          console.log("checkAuth getSession Run"+res)
          setIsAuthenticated(true);
        })
        .catch((err)=>{
          console.log("checkAuth getSession Run"+err)
          setIsAuthenticated(false);
        })
      }
    } 
    catch (error) {
      setIsAuthenticated(false);
    }
  };

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const token = localStorage.getItem('AccessToken')
      axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/get-current-user`,{
        headers:{
          authorization:`Bearer ${token}`
        }
      })
      .then((res)=>{
        console.log(res.data)
        console.log("checkAuth"+JSON.stringify(res.data.Username))
        setUserid(res.data.Username)
        resolve(res.data)
        return(res.data)
      })
      .catch(async (err)=>{
        console.log("checkAuthentication: "+err)
        logout()
        reject(err)
        // if()
        // refresh the accessToken here
        await RefreshToken(getSession)
      })
    });
  };

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

  const RefreshToken = async (callback:()=>any) => {
    const token = localStorage.getItem('RefreshToken')
    console.log("RefreshToken: "+typeof token)
    if(token?.trim() !== 'undefined' ||  !!token){
      let config = {
        method: 'post',
        url: `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/refresh-token`,
        headers: { 
          authorization:`Bearer ${token}`
        },
        data : {}
      };
      axios.request(config)
      .then((res)=>{
        console.log(res.data)
        localStorage.setItem('AccessToken', res.data.authenticatedResult.AccessToken)
        setAccessToken(res.data.authenticatedResult.AccessToken)
        localStorage.setItem('IdToken', res.data.authenticatedResult.IdToken)
        // if(!(res.data.authenticatedResult.RefreshToken) || res.data.authenticatedResult.RefreshToken !== "undefined" || res.data.authenticatedResult.RefreshToken !== null){
        // if(!!res.data.authenticatedResult.IdToken && res.data.authenticatedResult.IdToken.trim() !== 'undefined'){
        //   localStorage.setItem('RefreshToken', res.data.authenticatedResult.RefreshToken)
        // }
        // else{
        //   console.log("No refresh sent to user")
        // }
        callback()
      })
      .catch((err)=>{
        console.log("Error refreshing token: "+err)
        // router.replace('/auth/login')
        setIsAuthenticated(false)
      })
    }
    else{
      console.log("No refresh token found")
      router.replace('/auth/login')
    }
  }

  const logout = async () => {
    const token = localStorage.getItem('AccessToken')
    // console.log("logout"+token)
    axios.post(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/auth/logout`,{},{
      headers:{
        authorization:`Bearer ${token}`
      },
      data:{}
    })
    .then((res)=>{
      console.log(res.data)
      setUserid('')
      setIsAuthenticated(false)
    })
    .catch(async (err)=>{
      // Get the error and check if the token has expired if yes get the new token and logout
      if(err.status === 401){
        console.log("Logout NotAuthorizedException")
      }
      else{
        console.log('Error logging out: '+err)
        await RefreshToken(logout)
      }
    })
  };

  return (
    <AccountContext.Provider value={{
        isAuthenticated,
        userid,
        checkAuthentication,
        getSession,
        setAccessToken,
        setIsAuthenticated,
        DeleteUserAccount,
        RefreshToken,
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