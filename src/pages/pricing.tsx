import React from 'react'

import { PagesLayout } from '@/layouts';
import { PricingCard } from '@/components/home';

const pricing = () => {
  return (
    <PagesLayout>
        {/* <main className="px-4 lg:px-16">*/}
        {/* flex items-center */}
        <section className="py-12 px-4 mx-auto max-w-screen-lg space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-4 lg:space-y-0 lg:py-16 lg:px-6 ">
            {/* <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                <h2 className="mb-4 text-2xl font-bold text-white-100">
                    Our Pricing
                </h2> 
                <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Some Text
                </p> 
            </div> */}
            <PricingCard 
                title='Monthly plan'
                description='Best option for users who want to tracks a small fleet of vehicles for personal or standard use.'
                price= {12}
                subsPeriod='month'
                features={[
                    'Individual configuration',
                    'No setup, or hidden fees',
                    'Team size: 1 developer',
                    'Premium support: 6 months',
                    'Free updates: 6 months'
                ]}
                // buttonText='Subscribe'
                buttonLink={`/auth/register?subs_period=Monthly`}
            />
    
            <PricingCard 
                title='Yearly Plan'
                description='Best option for enterprise users who run large fleets of vehicles.'
                price= {120}
                subsPeriod='year'
                features={[
                    'Individual configuration',
                    'No setup, or hidden fees',
                    'Team size: 1 developer',
                    'Premium support: 6 months',
                    'Free updates: 6 months'
                ]}
                // buttonText='Contact Us'
                buttonLink={`/auth/register?subs_period=Yearly`}
            />
        </section>
    </PagesLayout>
  )
}

export default pricing