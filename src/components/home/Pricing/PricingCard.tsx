import React from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'

type PricingCardProps = {
    title: string,
    description: string,
    price: number,
    subsPeriod:string,
    features: string[],
    buttonLink: string|undefined,
}

const PricingCard:React.FC<PricingCardProps> = ({
    title,
    description,
    price,
    subsPeriod,
    features,
    // buttonText,
    buttonLink
}) => {
    const router = useRouter()
    const PaymentGateway = async (priceId:string|undefined) => {
        let config = {
          method:"post",
          url:`${process.env.NEXT_PUBLIC_SERVER_ROUTE}/subscription/create-checkout-session`,
          headers:{
            "Content-type": "application/json",
          },
          data:JSON.stringify({
              priceId: priceId,
              quantity: 1
          })
        }
        axios.request(config)
        .then(async (res)=>{
            console.log(res.data)
            router.push(res.data.sessionURL)
            // const sessionId = res.data.sessionId
        })
        .catch((err)=>{
            console.error(err)
        })
      }

    return (
    <div className="flex flex-col justify-between p-6 mx-auto max-w-md text-center bg-white rounded-lg border border-me-green-200 shadow xl:p-8 text-white-100">
        <div className="w-full">
            <h3 className="mb-4 text-2xl font-semibold">
                {title}
            </h3>
            {/* <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {description}
            </p> */}
        </div>

        <div className="flex justify-center items-baseline my-8">
            {
                price && (
                    <>
                        <span className="mr-2 text-5xl font-extrabold">${price}</span>
                        <span className="text-gray-500 dark:text-gray-400">/{subsPeriod}</span>
                    </>
                )
            }
        </div>

        <div className="w-full p-3">
            {/* Feature List */}
            <ul role="list" className="mb-8 space-y-4 text-left">
                {
                    features.map((value,index) => 
                        (
                            <li key={index} className="flex items-center space-x-3">
                                {/* <!-- Icon --> */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                <span>{value}</span>
                            </li>
                        )
                    )
                }       
            </ul>

            {/* <Link href={buttonLink} className="w-full text-black bg-me-green-200 font-semibold rounded-lg text-md px-3 py-2.5 text-center">
                Subscribe
            </Link> */}
            <button
                onClick={()=>PaymentGateway(buttonLink)}
                className="w-full text-black bg-me-green-200 font-semibold rounded-lg text-md px-3 py-2.5 text-center"
            >
                Subscribe
            </button>
        </div>
    </div>
  )
}

export default PricingCard