import { toast } from 'react-toastify';
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AccountContext } from './account';

type SubscriptionContextProps = {
  getSubscriptionDetails: (email: string) => Promise<void>
}

type subscriptionDataProps = {
  quantity:number;
  currency:string;
  endDate:Date|string;
  subscriptionId:string;
  amountTotal:number;
  subscriptionStatus:string;
  sessionId:string;
  paymentStatus:string;
  startDate:Date|string;
  priceId:string;
  customer_email:string;
  invoiceId:string;
  productId:string;
  customerId:string;
}

const SubscriptionContext = createContext({} as SubscriptionContextProps);

const SubscriptionProvider = ({ children }:any) => {
  const { IdToken } = useContext(AccountContext)
  const [ subscriptionData, setSubscriptionData ] = useState<subscriptionDataProps|null>(null)
  
  const getSubscriptionDetails = async (email:string) => {
    // const token = localStorage.getItem(`CognitoIdentityServiceProvider.${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}.${username}.idToken`)
    axios.get(`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/get-customer-details`,{
      params:{
        email:email
      },
      headers:{
        Authorization:`Bearer ${IdToken}`
      }
    })
    .then((res)=>{
        console.log(res.data)
        if(res.status !== 404){
          setSubscriptionData(res.data)
        }
        else{

          console.log('No data found for the email')
          toast.error('No data found for the email: '+ email)
        }
    })
    .catch((err)=>{
      console.log(err)
    })
  };

  return (
    <SubscriptionContext.Provider value={{
      getSubscriptionDetails
      }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

const useSubscriptionContext = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscriptionContext must be used within the AccountProvider');
  }
  return context;
};

export { SubscriptionProvider, SubscriptionContext, useSubscriptionContext };