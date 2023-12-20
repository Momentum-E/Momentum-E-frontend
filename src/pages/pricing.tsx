import React from 'react'

import { PagesLayout } from '@/layouts';
import { PricingCard } from '@/components/home';

const Pricing = () => {
  return (
    <PagesLayout>
        {/* <main className="px-4 lg:px-16">*/}
        {/* flex items-center */}
        <section id='pricing' className="py-16 px-4 mx-auto max-w-screen-lg space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-4 lg:space-y-0 lg:py-20 lg:px-6 ">
            <PricingCard 
                title='Monthly Plan'
                description='Best option for users who want to tracks a small fleet of vehicles for personal or standard use.'
                price= {12}
                subsPeriod='month'
                features={[
                    'Monthly battery health reports',
                    // 'No setup, or hidden fees',
                    'Real range achieved analytics',
                    'Energy consumption statistics'
                ]}
                // buttonText='Subscribe'
                buttonLink={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_MONTHLY}
            />
    
            <PricingCard 
                title='Yearly Plan'
                description='Best option for enterprise users who run large fleets of vehicles.'
                price= {120}
                subsPeriod='year'
                features={[
                    'Monthly battery health reports',
                    // 'No setup, or hidden fees',
                    'Real range achieved analytics',
                    'Energy consumption statistics'
                ]}
                // buttonText='Contact Us'
                buttonLink={process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_YEARLY}
            />
        </section>
    </PagesLayout>
  )
}

export default Pricing