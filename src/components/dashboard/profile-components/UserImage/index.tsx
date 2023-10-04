import React from 'react'
import Image from 'next/image'
import {UserImageProps} from '@/utils/props'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const UserImage = ({
    userImage,
    imageWidth,
    imageHeight,
    imageSize,
    svgClassName,
    isLoading,
    fontSize,
    setUserImage,
}:UserImageProps) => {

    function imageError(){
        setUserImage('')
        // return
    }

    return (
        <>
        {
            !isLoading ?
            (
                userImage ?
                    <Image  
                        width={imageWidth}
                        height={imageHeight}
                        className={imageSize+` object-cover object-center rounded-full `}
                        src={userImage}
                        alt=''
                        onError={() => imageError()}
                        // placeholder='blur'
                        // blurDataURL=''
                    />
                :
                    <div className={`flex items-center justify-center rounded-full w-full h-full`}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={svgClassName}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    </div>
            )
            :
            (
                <Spin 
                    indicator={<LoadingOutlined style={{ fontSize: fontSize }} spin />} 
                    className='text-me-green-200'
                />
            )
        }
        </>
  )
}
