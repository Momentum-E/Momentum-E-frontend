import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

type LoaderProps = {
    LoaderSize:number;
}

const Loader = ({
    LoaderSize
}:LoaderProps) => {
  return (
    <Spin 
        indicator={<LoadingOutlined style={{ fontSize: LoaderSize }} spin />} 
        className='text-me-green-200'
    />
  )
}

export default Loader