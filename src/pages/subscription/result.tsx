import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Loader } from '@/components/shared'

const result = () => {
    const router = useRouter() 
    const id = router.query.session_id

    const { data, error, isLoading } = useSWR(
        id ? `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/checkout/?id=${id}` : null,
        (url) => fetch(url).then(res => res.json())
    )

    useEffect(() => {
        if (data) {
            // Save necessary data in the db
            console.log(data);
            router.replace('/auth/login?email=${data.session.customer_details.email}&payment_status=${data.session.payment_status}')
            // router.replace(`/auth/get-user-data?email=${data.session.customer_details.email}&payment_status=${data.session.payment_status}`)
        }
    }, [data]);

    if (error) 
    return (
        <div>Payment Failed</div>
    )
    if (isLoading) 
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Loader LoaderSize={36}/>
        </div>
    ) 
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <p className='font-semibold flex flex-col items-center justify-center text-xl text-me-green-200'>
                Payment Successful
                <span className='font-semibold text-base'>
                    Please sign up to create an account
                </span>
            </p>
        </div>
    )
}

export default result