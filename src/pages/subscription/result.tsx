import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Loader } from '@/components/shared'

const result = () => {
    const router = useRouter() 
    const id = router.query.session_id
    const result = router.query.result

    const { data, error, isLoading } = useSWR(
        id ? `${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/checkout/?id=${id}` : null,
        (url) => fetch(url).then(res => res.json())
    )

    useEffect(() => {
        if(result === 'FAILURE'){
            console.log({result,data})
            setTimeout(()=>{
                router.replace('/pricing')
            },2000)
        }
        if (data) {
            // Subscription data saved in db through webhooks  
            console.log(data);
            setTimeout(()=>{
                router.replace(`/auth/register?payment_status=${data.session.payment_status}&result=${result}&email=${data.session.customer_details.email}`)
            },2000)
        }
    }, [data]);

    if(result === 'FAILURE')
    return (
        <div className="flex items-center justify-center w-full h-screen">
            Payment Cancelled
        </div>    
    )
    if (isLoading) 
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <Loader LoaderSize={36}/>
        </div>
    ) 
    if (error) 
    return (
        <div className='flex items-center justify-center w-full h-screen'>
            Payment Failed
        </div>
    )
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <p className='font-semibold flex flex-col items-center justify-center text-xl text-me-green-200'>
                Payment Successful
                <span className='font-semibold text-base'>
                    Please login and confim your email.
                </span>
            </p>
        </div>
    )
}

export default result