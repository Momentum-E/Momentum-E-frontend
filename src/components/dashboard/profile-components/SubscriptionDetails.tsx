import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { SubscriptionContext } from '@/context/subscriptionContext';

type SubscriptionDetailsProps = {
    email:string;
    idToken:string;
}

const SubscriptionDetails:React.FC<SubscriptionDetailsProps> = ({
    email,
    idToken
}) => {
    const router = useRouter();
    const { subscriptionData } = useContext(SubscriptionContext);

    const convertDate = (toDate:Date|string|undefined) => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        if(toDate){
            const date = new Date(toDate).getDate();
            const month = new Date(toDate).getMonth();
            const year = new Date(toDate).getFullYear();
            return `${date} ${monthNames[month]} ${year}`
        }
        else{
            return "-"
        }
    }

    const CreateCustomerSession = () => {
        axios.request({
            method:"post",
            url:`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/create-customer-portal-session`,
            headers:{
                authorization: `Bearer ${idToken}`,
            },
            data:{
                email: email,
            }
        })
        .then((response) => {
            console.log("Fetching the session url")
            if(response.status === 200){
                console.log(response)
                router.replace(response.data.sessionURL)    
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }
    
    const subsDetails = {
        SubscriptionStart:convertDate(subscriptionData?.startDate),
        SubscriptionEnd:convertDate(subscriptionData?.endDate),
        PaymentStatus:subscriptionData?.paymentStatus,
        VehiclesAllowed:subscriptionData?.quantity,
        AmountPaid:subscriptionData?.amountTotal,
        Currency:subscriptionData?.currency,
    }

    return (
        <div className='space-y-4 border border-me-green-200 p-4 rounded-xl w-full'>
            <p id='subscription_details' className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                Subscription Details
            </p>
            {/* <p className="text-gray-700 dark:text-white-200 text-base font-medium">Subscription Start: {" "}
                <span className="text-black dark:text-white-100 text-base font-normal">{convertDate(subscriptionData?.startDate)}</span>
            </p>
            <p className="text-gray-700 dark:text-white-200 text-base font-medium">Subscription End: {" "}
                <span className="text-black dark:text-white-100 text-base font-normal">{convertDate(subscriptionData?.endDate)}</span>
            </p>
            <p className="text-gray-700 dark:text-white-200 text-base font-medium">Payment Status: {" "}
                <span className="text-black dark:text-white-100 text-base font-normal">{subscriptionData?.paymentStatus.toUpperCase()}</span>
            </p>
            <p className="text-gray-700 dark:text-white-200 text-base font-medium">Vehicles Allowed: {" "}
                <span className="text-black dark:text-white-100 text-base font-normal">{subscriptionData?.quantity}</span>
            </p>
            <p className="text-gray-700 dark:text-white-200 text-base font-medium">Amount Paid: {" "}
                <span className="text-black dark:text-white-100 text-base font-normal">{`${subscriptionData?.amountTotal} ${subscriptionData?.currency.toUpperCase()}`}</span>
            </p> */}
            <div className="w-full h-full">
                <table className='table-auto w-full '>
                    {/* <thead className='w-full  border-b-[1px] border-b-me-green-200 dark:border-b-white-200/30'>
                        <tr className=''>
                            <th className=' border-r-me-green-200 dark:border-r-white-200/30'>Vendor Name</th>
                            <th className=' border-r-me-green-200 dark:border-r-white-200/30'>Number of Connected Cars</th>
                            <th></th>
                        </tr>
                    </thead> */}
                    <tbody className='w-full text-left text-base'>
                        <tr className="text-center border-t-me-green-200 dark:border-t-white-200/30">
                            <td className='border-r-[1px] p-2 font-medium border-r-me-green-200 dark:border-r-white-200/30'>
                                Subscription Start
                            </td>
                            <td className='text-base text-left pl-4 font-normal border-r-me-green-200 dark:border-r-white-200/30'>
                                {subsDetails.SubscriptionStart}
                            </td>
                        </tr>
                        <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30">
                            <td className='border-r-[1px] p-2 font-medium border-r-me-green-200 dark:border-r-white-200/30'>
                                Subscription End 
                            </td>
                            <td className='text-base text-left pl-4 font-normal border-r-me-green-200 dark:border-r-white-200/30'>
                                {subsDetails.SubscriptionEnd}
                            </td>
                        </tr>
                        <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30">
                            <td className='border-r-[1px] p-2 font-medium border-r-me-green-200 dark:border-r-white-200/30'>
                                Payment Status
                            </td>
                            <td className='text-base text-left pl-4 font-normal border-r-me-green-200 dark:border-r-white-200/30'>
                                {subsDetails.PaymentStatus}
                            </td>
                        </tr>
                        <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30">
                            <td className='border-r-[1px] p-2 font-medium border-r-me-green-200 dark:border-r-white-200/30'>
                                Vehicles Allowed
                            </td>
                            <td className='text-base text-left pl-4 font-normal border-r-me-green-200 dark:border-r-white-200/30'>
                                {subsDetails.VehiclesAllowed}
                            </td>
                        </tr>
                        <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30">
                            <td className='border-r-[1px] p-2 font-medium border-r-me-green-200 dark:border-r-white-200/30'>
                                Amount Paid 
                            </td>
                            <td className='text-base text-left pl-4 font-normal border-r-me-green-200 dark:border-r-white-200/30'>
                                {subsDetails.AmountPaid}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="w-full flex justify-center">
                <button 
                    className='flex justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm' 
                    // href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_DASHBOARD}`}
                    onClick={CreateCustomerSession}
                >
                    Update Details
                </button>
            </div>
        </div>
    )
}

export default SubscriptionDetails