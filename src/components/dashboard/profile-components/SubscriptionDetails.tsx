import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { SubscriptionContext } from '@/context/subscriptionContext';

type SubscriptionDetailsProps = {
    email:string;
}

const SubscriptionDetails:React.FC<SubscriptionDetailsProps> = ({
    email
}) => {
    const {} = useContext(SubscriptionContext);

    // useEffect(() => {
    //     getSubscriptionDetails(email)
    //     return () => {
    //     }
    // }, [])
    

    return (
        <div className='space-y-4 border border-me-green-200 p-4 rounded-xl w-full'>
            <p className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                subscription Details
            </p>

            <Link 
                className='flex justify-center w-full rounded-md bg-me-green-200 hover:bg-me-green-200/90 text-black px-3.5 py-2.5 text-center text-sm font-semibold shadow-sm' 
                href='https://billing.stripe.com/p/login/test_eVadR455ObBI1Rm4gg'
            >
                Update Details
            </Link>
        </div>
    )
}

export default SubscriptionDetails