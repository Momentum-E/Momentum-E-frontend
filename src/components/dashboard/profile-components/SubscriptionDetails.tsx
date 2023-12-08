import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { SubscriptionContext } from '@/context/subscriptionContext';

type SubscriptionDetailsProps = {
    email:string;
}

const SubscriptionDetails:React.FC<SubscriptionDetailsProps> = ({
    email
}) => {
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
    

    return (
        <div className='space-y-4 border border-me-green-200 p-4 rounded-xl w-full'>
            <p id='subscription_details' className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                subscription Details
            </p>
            <p className="text-white-200 text-base font-medium">Subscription Start: {" "}
                <span className="text-white-100 text-base font-normal">{convertDate(subscriptionData?.startDate)}</span>
            </p>
            <p className="text-white-200 text-base font-medium">Subscription End: {" "}
                <span className="text-white-100 text-base font-normal">{convertDate(subscriptionData?.endDate)}</span>
            </p>
            <p className="text-white-200 text-base font-medium">Payment Status: {" "}
                <span className="text-white-100 text-base font-normal">{subscriptionData?.paymentStatus.toUpperCase()}</span>
            </p>
            <p className="text-white-200 text-base font-medium">Vehicles Allowed: {" "}
                <span className="text-white-100 text-base font-normal">{subscriptionData?.quantity}</span>
            </p>
            <p className="text-white-200 text-base font-medium">Amount Paid: {" "}
                <span className="text-white-100 text-base font-normal">{`${subscriptionData?.amountTotal} ${subscriptionData?.currency.toUpperCase()}`}</span>
            </p>
            <div className="w-full flex justify-center">
                <Link 
                    className='flex justify-center rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm' 
                    href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_DASHBOARD}`}
                >
                    Update Details
                </Link>
            </div>
        </div>
    )
}

export default SubscriptionDetails