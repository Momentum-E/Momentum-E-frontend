import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { VehicleInfo } from '../../vehicle-components/vehicle-card-components';

type YourVehicleProps = {
    isLoading:boolean;
    vehicleData:vehicleDataProps;
    isTab:boolean;
    setIsOpen:any;
}

type vehicleDataProps = {
    id:string;
    vendor:string;
    isReachable:boolean;
    information:{
        vin:string;
        brand:string;
        model:string;
        year:number;
    },
}[];

function YourVehicles({isLoading,vehicleData, setIsOpen, isTab}:YourVehicleProps) {

    const DeleteVehicle = (v_no:string) => {
        // function to delete Vehicle
        const delete_vehicle = v_no
        console.log(delete_vehicle)
    }
 
    return (
      <>
        {/* vehice items */}  
        <span className="text-white-100 inline-block ">Your Vehicles</span>
        <div className="flex flex-col items-center h-full space-y-2">
            <div
                className="whitespace-pre flex flex-col text-left w-full gap-1 p-1 h-[46%] md:h-[46%]
                    font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
                {
                isLoading ?
                (
                    <span className='text-sm text-gray-400 flex items-center'>Loading...</span>
                )
                :    
                vehicleData.length===0 ?
                    <span className='flex items-center justify-center text-sm text-gray-400'>
                        No vehicles added
                    </span>
                :
                vehicleData.map((data) => (
                    <Disclosure key={data.id}> 
                    {
                        ({open}) => (
                        <>
                            <div
                            className={`${open ? `active `:` `} group text-white-100 link`}>
                                <Disclosure.Button>
                                    <svg  
                                    className={`${
                                    open ? 'rotate-90 transform' : ''
                                    } w-4 h-4`} 
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>  
                                </Disclosure.Button>
                                <Link
                                    onClick={()=>setIsOpen(!isTab && true)}
                                    href={`/dashboard/vehicles/${data.id}`}
                                    className="px-2 h-full overflow-hidden group-hover:mr-2">
                                        <span className='text-left overflow-ellipsis'>
                                            {data.information.vin}
                                        </span>
                                </Link>
                                <button
                                type="button" 
                                onClick={()=>DeleteVehicle(data.id)}
                                className='flex md:hidden md:group-hover:flex hover:bg-gray-700/40 rounded-md'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 p-1 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                    </svg>
                                </button>
                            </div>

                            {/* Instead of it going to a new page make it a modal */}
                            <Disclosure.Panel>
                                <Link 
                                onClick={()=>setIsOpen(!isTab && true)}
                                href={`/dashboard/vehicles/${data.id}/VehicleInfo`} 
                                className='link text-white-100 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-9' viewBox="0 0 48 49" fill="currentColor">
                                    <g filter="url(#filter0_d_172_32)">
                                    <rect x="7" y="3" width="34.6341" height="34.6341" rx="13.8537" fill="#C6DE41"/>
                                    </g>
                                    <path d="M24.4819 14.5497C22.7991 14.5497 21.1852 15.2182 19.9952 16.4082C18.8052 17.5981 18.1367 19.2121 18.1367 20.8949C18.1367 22.5778 18.8052 24.1917 19.9952 25.3817C21.1852 26.5716 22.7991 27.2401 24.4819 27.2401C25.3154 27.2405 26.1408 27.0766 26.9109 26.7578C27.681 26.4391 28.3808 25.9718 28.9703 25.3825C29.5597 24.7933 30.0273 24.0937 30.3463 23.3237C30.6654 22.5537 30.8296 21.7284 30.8296 20.8949C30.8296 19.2121 30.1611 17.5981 28.9711 16.4082C27.7811 15.2182 26.1672 14.5497 24.4843 14.5497H24.4819ZM24.4819 16.4537C24.607 16.4537 24.7308 16.4784 24.8463 16.5262C24.9618 16.574 25.0667 16.6442 25.1551 16.7326C25.2435 16.821 25.3137 16.9259 25.3615 17.0414C25.4093 17.1569 25.434 17.2807 25.434 17.4058C25.434 17.6582 25.3337 17.9004 25.1551 18.0789C24.9766 18.2575 24.7344 18.3578 24.4819 18.3578C24.2295 18.3578 23.9873 18.2575 23.8088 18.0789C23.6302 17.9004 23.5299 17.6582 23.5299 17.4058C23.5299 17.2807 23.5545 17.1569 23.6024 17.0414C23.6502 16.9259 23.7204 16.821 23.8088 16.7326C23.8972 16.6442 24.0021 16.574 24.1176 16.5262C24.2331 16.4784 24.3569 16.4537 24.4819 16.4537ZM23.8513 19.6263H25.4364V23.751H26.3884V25.0196H22.8968V23.7486H23.8489V20.8949H22.8968L23.8513 19.6263Z" fill="white"/>
                                    <path d="M19.3119 14.5499C19.2409 14.554 19.1733 14.5819 19.1201 14.6291C18.2163 15.4034 17.4907 16.3638 16.9928 17.4446C16.4949 18.5255 16.2365 19.7012 16.2354 20.8912C16.2342 22.0812 16.4903 23.2575 16.9862 24.3393C17.482 25.4211 18.2058 26.3829 19.1081 27.1589C19.1392 27.1879 19.176 27.2104 19.2161 27.2249C19.2562 27.2395 19.2988 27.2457 19.3413 27.2434C19.3839 27.241 19.4256 27.2302 19.4638 27.2113C19.5021 27.1925 19.5361 27.1661 19.5639 27.1338C19.5917 27.1014 19.6127 27.0638 19.6256 27.0232C19.6385 26.9825 19.6431 26.9397 19.639 26.8973C19.635 26.8549 19.6224 26.8136 19.602 26.7762C19.5817 26.7387 19.5539 26.7058 19.5205 26.6793C18.687 25.9632 18.0182 25.0752 17.5601 24.0763C17.102 23.0775 16.8653 21.9914 16.8665 20.8925C16.8676 19.7935 17.1065 18.7079 17.5667 17.71C18.0269 16.712 18.6975 15.8255 19.5325 15.1111C19.5845 15.0687 19.6217 15.0108 19.6386 14.9459C19.6556 14.881 19.6515 14.8125 19.627 14.75C19.6025 14.6876 19.5587 14.6346 19.5021 14.5986C19.4454 14.5627 19.3788 14.5456 19.3119 14.5499ZM29.6523 14.5452C29.7233 14.5493 29.7909 14.5771 29.8441 14.6243C30.748 15.3984 31.4738 16.3587 31.9719 17.4394C32.47 18.5202 32.7286 19.6958 32.73 20.8859C32.7314 22.0759 32.4755 23.2522 31.9799 24.3341C31.4842 25.416 30.7606 26.378 29.8585 27.1541C29.827 27.1813 29.7905 27.2021 29.7509 27.2152C29.7114 27.2283 29.6697 27.2335 29.6282 27.2305C29.5866 27.2275 29.5461 27.2164 29.5089 27.1977C29.4717 27.179 29.4385 27.1532 29.4113 27.1217C29.384 27.0902 29.3633 27.0537 29.3501 27.0142C29.337 26.9747 29.3318 26.9329 29.3348 26.8914C29.3378 26.8498 29.349 26.8093 29.3677 26.7721C29.3863 26.7349 29.4121 26.7017 29.4436 26.6745C30.2773 25.9585 30.9463 25.0707 31.4046 24.0719C31.863 23.0732 32.0998 21.9871 32.0989 20.8882C32.098 19.7893 31.8593 18.7036 31.3994 17.7056C30.9394 16.7076 30.2689 15.8208 29.434 15.1063C29.3823 15.064 29.3452 15.0064 29.3282 14.9418C29.3112 14.8771 29.3151 14.8087 29.3393 14.7464C29.3636 14.6841 29.4069 14.6311 29.4631 14.595C29.5193 14.5588 29.5855 14.5414 29.6523 14.5452Z" fill="white"/>
                                    <defs>
                                    <filter id="filter0_d_172_32" x="0.650406" y="0.691056" width="47.333" height="47.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                    <feOffset dy="4.04065"/>
                                    <feGaussianBlur stdDeviation="3.1748"/>
                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172_32"/>
                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172_32" result="shape"/>
                                    </filter>
                                    </defs>
                                    </svg>
                                    Vehicle Info
                                </Link>
                                
                                <Link 
                                onClick={()=>setIsOpen(!isTab && true)}
                                href={`/dashboard/vehicles/${data.id}/ChargingPatter`} 
                                className='link text-white-100 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-9' viewBox="0 0 48 49" fill="none">
                                    <g filter="url(#filter0_d_172_39)">
                                        <rect x="7" y="3" width="34.6341" height="34.6341" rx="13.8537" fill="#C6DE41"/>
                                    </g>
                                    <path d="M28.2406 18.5992H24.9421L25.7983 14.1265C25.8209 14.0133 25.8057 13.8954 25.7553 13.7925C25.7049 13.6895 25.6223 13.6076 25.5212 13.5604C25.4201 13.5132 25.3066 13.5035 25.1995 13.5329C25.0924 13.5623 24.9981 13.6291 24.9324 13.7221L19.0944 21.8506C19.0402 21.926 19.0072 22.0158 18.999 22.1098C18.9909 22.2037 19.008 22.2982 19.0484 22.3826C19.0888 22.467 19.1509 22.5379 19.2278 22.5875C19.3047 22.6371 19.3932 22.6634 19.4836 22.6634H22.782L21.9258 27.1361C21.9032 27.2493 21.9184 27.3672 21.9688 27.4701C22.0192 27.5731 22.1018 27.655 22.2029 27.7022C22.304 27.7494 22.4175 27.7591 22.5246 27.7297C22.6317 27.7003 22.726 27.6335 22.7918 27.5405L28.6298 19.412C28.684 19.3366 28.717 19.2468 28.7251 19.1528C28.7332 19.0589 28.7161 18.9644 28.6757 18.88C28.6353 18.7956 28.5732 18.7247 28.4963 18.6751C28.4195 18.6255 28.3309 18.5992 28.2406 18.5992ZM31.646 20.6313C31.6476 20.1584 31.5431 19.6917 31.3408 19.2686C31.1386 18.8455 30.8442 18.4777 30.4814 18.1948C30.3781 18.117 30.2497 18.0846 30.1238 18.1045C29.9979 18.1245 29.8845 18.1951 29.8079 18.3014C29.7314 18.4077 29.6978 18.5411 29.7144 18.6729C29.731 18.8048 29.7964 18.9246 29.8966 19.0066C30.3899 19.3948 30.673 19.9871 30.673 20.6313C30.673 21.2765 30.3889 21.8699 29.8946 22.258C29.8116 22.321 29.7499 22.41 29.7185 22.5121C29.6871 22.6142 29.6877 22.7241 29.7201 22.8259C29.7525 22.9276 29.8151 23.016 29.8988 23.0781C29.9824 23.1402 30.0829 23.1729 30.1856 23.1714C30.2868 23.1714 30.3899 23.1389 30.4775 23.0688C30.8396 22.7847 31.1336 22.4166 31.3364 21.9936C31.5392 21.5707 31.6452 21.1043 31.646 20.6313Z" fill="white"/>
                                    <path d="M33.7527 20.6252C33.7561 19.7053 33.4853 18.803 32.9713 18.0211C32.4573 17.2393 31.7207 16.6093 30.8454 16.2031C30.7839 16.1742 30.717 16.1571 30.6484 16.1527C30.5799 16.1482 30.5111 16.1565 30.4459 16.1772C30.3808 16.1978 30.3206 16.2303 30.2688 16.2729C30.217 16.3154 30.1746 16.3672 30.144 16.4252C30.1134 16.4833 30.0952 16.5464 30.0905 16.611C30.0858 16.6757 30.0946 16.7406 30.1165 16.802C30.1384 16.8634 30.1729 16.9202 30.218 16.969C30.2631 17.0179 30.318 17.0579 30.3796 17.0867C31.8138 17.7591 32.7058 19.1156 32.7058 20.6252C32.7058 22.1348 31.8138 23.4914 30.3785 24.1647C30.3133 24.1914 30.2546 24.2303 30.2059 24.2791C30.1572 24.3278 30.1195 24.3855 30.0952 24.4484C30.0708 24.5113 30.0603 24.5783 30.0643 24.6452C30.0683 24.7121 30.0867 24.7775 30.1183 24.8375C30.15 24.8975 30.1943 24.9508 30.2485 24.9941C30.3026 25.0374 30.3656 25.0699 30.4336 25.0895C30.5015 25.1092 30.573 25.1155 30.6436 25.1083C30.7142 25.101 30.7825 25.0803 30.8444 25.0474C31.7199 24.6414 32.4568 24.0115 32.971 23.2296C33.4852 22.4477 33.7561 21.5453 33.7527 20.6252Z" fill="white"/>
                                    <path d="M31.5516 14.0856C31.4908 14.0587 31.4254 14.0443 31.359 14.0433C31.2927 14.0422 31.2268 14.0546 31.1652 14.0796C31.1036 14.1046 31.0475 14.1418 31.0003 14.1889C30.9531 14.2361 30.9156 14.2923 30.8901 14.3543C30.8645 14.4163 30.8514 14.4828 30.8516 14.5499C30.8517 14.6171 30.8651 14.6835 30.8909 14.7454C30.9166 14.8073 30.9544 14.8633 31.0018 14.9103C31.0492 14.9573 31.1054 14.9942 31.1671 15.019C33.4102 15.9695 34.8602 18.1715 34.8602 20.633C34.8602 23.0945 33.4102 25.2975 31.1671 26.246C31.1065 26.2716 31.0514 26.309 31.0051 26.356C30.9587 26.4031 30.922 26.459 30.897 26.5204C30.8465 26.6445 30.8467 26.7839 30.8977 26.9078C30.9487 27.0317 31.0463 27.13 31.1689 27.1811C31.2915 27.2322 31.4292 27.232 31.5516 27.1804C34.1692 26.0738 35.8616 23.5039 35.8616 20.633C35.8616 17.7621 34.1692 15.1922 31.5516 14.0856ZM16.8354 20.633C16.8354 19.9905 17.1268 19.3997 17.6355 19.0116C17.6895 18.9722 17.7352 18.9223 17.7699 18.8647C17.8046 18.8072 17.8276 18.7433 17.8376 18.6767C17.8476 18.61 17.8443 18.542 17.828 18.4767C17.8117 18.4114 17.7827 18.35 17.7427 18.2961C17.7026 18.2423 17.6524 18.197 17.5949 18.1631C17.5374 18.1291 17.4737 18.1071 17.4077 18.0983C17.3417 18.0896 17.2746 18.0942 17.2104 18.112C17.1461 18.1298 17.0861 18.1604 17.0337 18.2019C16.66 18.4842 16.3568 18.8511 16.1485 19.2733C15.9401 19.6954 15.8324 20.1611 15.834 20.633C15.8349 21.1046 15.9439 21.5697 16.1524 21.9915C16.3609 22.4133 16.6633 22.7804 17.0357 23.0641C17.088 23.1044 17.1477 23.1338 17.2113 23.1506C17.2749 23.1674 17.3412 23.1713 17.4064 23.1619C17.4715 23.1526 17.5341 23.1303 17.5906 23.0963C17.6472 23.0622 17.6964 23.0172 17.7356 22.9637C17.7753 22.9107 17.8042 22.8502 17.8207 22.7858C17.8371 22.7214 17.8408 22.6543 17.8315 22.5884C17.8222 22.5226 17.8 22.4592 17.7664 22.4021C17.7328 22.3449 17.6883 22.2951 17.6355 22.2554C17.3862 22.067 17.184 21.8221 17.0451 21.5403C16.9061 21.2586 16.8343 20.9479 16.8354 20.633Z" fill="white"/>
                                    <path d="M17.1196 24.175C15.6758 23.501 14.7786 22.1432 14.7786 20.6322C14.7786 19.1213 15.6758 17.7635 17.1196 17.0895C17.182 17.0609 17.2378 17.0209 17.2837 16.972C17.3296 16.923 17.3647 16.866 17.387 16.8043C17.4093 16.7425 17.4184 16.6772 17.4137 16.6122C17.409 16.5471 17.3906 16.4836 17.3596 16.4252C17.3286 16.3669 17.2856 16.3148 17.2331 16.2721C17.1806 16.2294 17.1196 16.1969 17.0536 16.1765C16.9876 16.156 16.918 16.148 16.8487 16.1529C16.7794 16.1578 16.7119 16.1755 16.6499 16.2051C14.8471 17.046 13.7256 18.7428 13.7256 20.6322C13.7256 22.5217 14.8471 24.2184 16.6499 25.0584C16.7116 25.0877 16.779 25.1052 16.848 25.1099C16.917 25.1146 16.9863 25.1064 17.0519 25.0858C17.1175 25.0653 17.1781 25.0327 17.2302 24.99C17.2823 24.9473 17.3249 24.8953 17.3554 24.8371C17.4176 24.7199 17.4277 24.5843 17.3834 24.4602C17.3392 24.3361 17.2443 24.2335 17.1196 24.175Z" fill="white"/>
                                    <path d="M16.5401 26.2362C14.1879 25.2881 12.6673 23.086 12.6673 20.6257C12.6673 18.1654 14.1879 15.9643 16.5401 15.0152C16.6036 14.9896 16.6613 14.9522 16.7098 14.9051C16.7583 14.858 16.7967 14.8021 16.8229 14.7407C16.849 14.6793 16.8623 14.6135 16.8621 14.5471C16.8619 14.4807 16.8481 14.415 16.8216 14.3538C16.795 14.2925 16.7562 14.2369 16.7074 14.1901C16.6586 14.1433 16.6007 14.1063 16.537 14.0811C16.4733 14.0559 16.4051 14.043 16.3363 14.0432C16.2674 14.0434 16.1993 14.0567 16.1358 14.0823C13.3908 15.1874 11.6172 17.7561 11.6172 20.6257C11.6172 23.4953 13.3908 26.064 16.1369 27.1701C16.2011 27.1996 16.2709 27.2162 16.342 27.2189C16.4131 27.2215 16.484 27.2103 16.5504 27.1857C16.6169 27.1612 16.6774 27.1238 16.7285 27.076C16.7795 27.0282 16.8199 26.9709 16.8472 26.9075C16.8746 26.8442 16.8883 26.7761 16.8876 26.7075C16.8868 26.6389 16.8716 26.5711 16.8429 26.5083C16.8142 26.4455 16.7725 26.3891 16.7205 26.3423C16.6684 26.2955 16.6071 26.2594 16.5401 26.2362Z" fill="white"/>
                                    <defs>
                                        <filter id="filter0_d_172_39" x="0.650406" y="0.691056" width="47.333" height="47.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="4.04065"/>
                                        <feGaussianBlur stdDeviation="3.1748"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172_39"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172_39" result="shape"/>
                                        </filter>
                                    </defs>
                                    </svg>
                                    Charging Pattern
                                </Link>

                                <Link 
                                onClick={()=>setIsOpen(!isTab && true)}
                                href={`/dashboard/vehicles/${data.id}/Usage`} 
                                className='link text-white-100 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-9' viewBox="0 0 48 49" fill="none">
                                    <g filter="url(#filter0_d_172_50)">
                                        <rect x="7" y="3" width="34.6341" height="34.6341" rx="13.8537" fill="#C6DE41"/>
                                    </g>
                                    <path d="M17.9727 28.687H27.7755L32.7492 24.3C32.8359 24.2423 32.9227 24.1846 32.9805 24.1268C33.5299 23.7805 33.7034 23.0589 33.4143 22.4817C33.0962 21.8467 32.3154 21.587 31.6793 21.9045L26.6767 25.2236H22.6283C22.3681 25.2236 22.1367 25.0793 22.05 24.8195C21.9343 24.4154 22.2235 24.0691 22.5994 24.0691H25.4911C26.1851 24.0691 26.7634 23.4341 26.6188 22.7126C26.5321 22.1354 25.9827 21.7602 25.4043 21.7602H21.3271C21.0379 21.7602 20.7198 21.8756 20.5174 22.1065L18.58 24.0691H17.9727V23.2032H15.0811V29.5528H17.9727V28.687ZM16.7293 28.687C16.6136 28.8602 16.4401 28.9756 16.2377 28.9756C16.0353 28.9756 15.8329 28.8602 15.7461 28.687C15.6883 28.6004 15.6594 28.5138 15.6594 28.3984C15.6594 28.0809 15.9196 27.8211 16.2377 27.8211C16.5558 27.8211 16.8161 28.0809 16.8161 28.3984C16.8161 28.5138 16.7871 28.6004 16.7293 28.687ZM16.2377 27.2439C15.9196 27.2439 15.6594 26.9841 15.6594 26.6667C15.6594 26.3492 15.9196 26.0894 16.2377 26.0894C16.5558 26.0894 16.8161 26.3492 16.8161 26.6667C16.8161 26.9841 16.5558 27.2439 16.2377 27.2439ZM27.3418 21.4427C27.4863 21.4715 27.6598 21.4715 27.8044 21.4715C30.031 21.4715 31.8528 19.7398 31.8528 17.6041C31.8528 15.4683 27.8044 11.0813 27.8044 11.0813C27.8044 11.0813 26.2718 12.7553 25.0863 14.5447C24.3344 15.6415 23.7561 16.7959 23.7561 17.6041C23.7561 19.5955 25.3176 21.2406 27.3418 21.4427ZM26.0405 15.1797C26.6188 14.3138 27.2839 13.448 27.8044 12.8419C27.8912 12.9573 28.0068 13.0728 28.0936 13.1882C27.6309 13.7654 27.0815 14.4581 26.6188 15.1797C25.5778 16.7671 25.4911 17.4309 25.4911 17.6041C25.4911 18.9894 26.5899 20.1439 28.0647 20.2882C28.0936 20.2882 28.0936 20.2882 28.0936 20.2882C28.0068 20.2882 27.8912 20.2882 27.8044 20.2882C27.6888 20.2882 27.5731 20.2882 27.4863 20.2593C26.0116 20.0862 24.9128 18.9317 24.9128 17.5752C24.9128 17.4309 24.9995 16.7671 26.0405 15.1797Z" fill="white"/>
                                    <defs>
                                        <filter id="filter0_d_172_50" x="0.650406" y="0.691056" width="47.333" height="47.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="4.04065"/>
                                        <feGaussianBlur stdDeviation="3.1748"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172_50"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172_50" result="shape"/>
                                        </filter>
                                    </defs>
                                    </svg>
                                    Usage
                                </Link>

                                <Link 
                                onClick={()=>setIsOpen(!isTab && true)}
                                href={`/dashboard/vehicles/${data.id}/BatteryHealth`} 
                                className='link text-white-100 '>
                                    <svg xmlns="http://www.w3.org/2000/svg" className='w-10 h-9' viewBox="0 0 48 49" fill="none">
                                    <g filter="url(#filter0_d_172_55)">
                                        <rect x="7" y="3" width="34.6341" height="34.6341" rx="13.8537" fill="#C6DE41"/>
                                    </g>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M24.3143 13.3903L16.6019 17.2435L24.3096 21.0922L32.0361 17.2412L24.3143 13.3903ZM26.0274 15.448L27.7381 16.3435L26.0274 17.2412L27.7405 18.1277L26.025 19.0367L24.3167 18.139L22.6083 19.0367L20.8952 18.1457L22.6083 17.2412L20.8952 16.3481L22.6153 15.4548L24.3167 16.3435L26.0274 15.448ZM16.2354 17.732L24.0065 21.6145V23.0347L16.2377 19.1565L16.2354 17.732ZM32.398 17.732V19.1565L24.6315 23.0278V21.6078L32.398 17.732ZM16.8557 20.138L24.0065 23.7085V28.3984L16.8557 24.5474V20.138ZM31.7729 20.138L31.7799 24.5474L24.6292 28.3962V23.7017L31.7729 20.138Z" fill="white"/>
                                    <defs>
                                        <filter id="filter0_d_172_55" x="0.650406" y="0.691056" width="47.333" height="47.3333" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                        <feOffset dy="4.04065"/>
                                        <feGaussianBlur stdDeviation="3.1748"/>
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
                                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_172_55"/>
                                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_172_55" result="shape"/>
                                        </filter>
                                    </defs>
                                    </svg>
                                    Battery Health
                                </Link>
                            </Disclosure.Panel>
                        </>
                        )
                    }
                    </Disclosure>
                ))}
            </div>
                
            <div 
            className="bg-dashboard-sidebar-image space-y-5 w-56 h-44 p-4 bg-cover bg-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none">
                <rect width="35" height="35" rx="12" fill="white"/>
                <path d="M17.5 7C20.2848 7 22.9555 8.10625 24.9246 10.0754C26.8938 12.0445 28 14.7152 28 17.5C28 20.2848 26.8938 22.9555 24.9246 24.9246C22.9555 26.8938 20.2848 28 17.5 28C14.7152 28 12.0445 26.8938 10.0754 24.9246C8.10625 22.9555 7 20.2848 7 17.5C7 14.7152 8.10625 12.0445 10.0754 10.0754C12.0445 8.10625 14.7152 7 17.5 7ZM18.0565 11.488C16.8355 11.488 15.8785 11.8345 15.169 12.5275C14.443 13.2205 14.0965 14.1775 14.0965 15.3985H15.9775C15.9775 14.7055 16.1095 14.161 16.39 13.7815C16.7035 13.3195 17.215 13.105 17.941 13.105C18.502 13.105 18.9475 13.2535 19.261 13.567C19.558 13.8805 19.723 14.3095 19.723 14.854C19.723 15.2665 19.5745 15.6625 19.2775 16.0255L19.0795 16.2565C18.007 17.2135 17.3635 17.9065 17.149 18.352C16.918 18.7975 16.819 19.342 16.819 19.969V20.2H18.7165V19.969C18.7165 19.573 18.799 19.2265 18.964 18.8965C19.1125 18.5995 19.327 18.319 19.624 18.0715C20.416 17.3785 20.8945 16.933 21.043 16.768C21.439 16.24 21.6535 15.5635 21.6535 14.7385C21.6535 13.732 21.3235 12.94 20.6635 12.3625C20.0035 11.7685 19.129 11.488 18.0565 11.488ZM17.7595 21.0085C17.4231 20.9994 17.0967 21.124 16.852 21.355C16.7312 21.4688 16.6362 21.6073 16.5736 21.761C16.511 21.9147 16.4821 22.0801 16.489 22.246C16.489 22.609 16.6045 22.906 16.852 23.137C17.0949 23.3728 17.421 23.5032 17.7595 23.5C18.1225 23.5 18.4195 23.3845 18.667 23.1535C18.7904 23.0373 18.888 22.8965 18.9533 22.7401C19.0187 22.5838 19.0505 22.4154 19.0465 22.246C19.0497 22.0806 19.0191 21.9163 18.9567 21.7631C18.8943 21.61 18.8013 21.4711 18.6835 21.355C18.4324 21.1236 18.1009 20.9992 17.7595 21.0085Z" fill="#C6DE41"/>
                </svg>

                <p className='flex flex-col text-white-100 text-base font-bold'>
                Need Help, contact us
                <span className=' font-medium'>
                    <a href="mailto:info@momentum-e.com">info@momentum-e.com</a>
                </span>
                </p>
            </div>
        </div>
    </>
  )
}

export default YourVehicles