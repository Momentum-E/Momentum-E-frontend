import React from 'react'
import { Progress } from 'antd';
import { CharginPatternProps } from '@/utils/props/props';

const ChargingPattern = ({
    avgSoC,
    chargeRate,
}:CharginPatternProps) => {
  return (
    <div className='xl:space-x-2 h-full w-full flex justify-between'>
        <div className="w-[20%] flex flex-col justify-around">
            <p className='flex flex-col text-sm font-medium text-gray-500'>
                Average SoC
                <span className='text-black dark:text-white-100 text-base'>
                    {96}%
                </span>
            </p>
            <p className='flex flex-col text-sm font-medium text-gray-500'>
                Connector Type
                <span className='text-black dark:text-white-100 text-base'>
                {`CCS`}
                </span>
            </p>
        </div>
        <div className="w-[60%] px-2 relative flex justify-center items-end">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Battery level of the car */}
                <Progress 
                    type="dashboard" 
                    percent={(avgSoC!==null) ? 96 : undefined} 
                    status='exception' 
                    size={200}
                    strokeColor={{ '0%': 'rgba(198, 222, 65, 0.00)', '100%': '#C6DE41' }} 
                />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-me-green-200 rounded-full p-2">
                <svg width="30" height="29" viewBox="0 0 30 29" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 1000001474">
                    <path id="Vector" d="M20.3279 12.0155H16.2947L17.3417 6.54652C17.3693 6.40808 17.3507 6.26396 17.2891 6.13805C17.2274 6.01215 17.1264 5.91203 17.0028 5.8543C16.8792 5.79658 16.7404 5.78472 16.6094 5.82068C16.4785 5.85665 16.3632 5.93829 16.2828 6.05205L9.14436 15.9912C9.07808 16.0835 9.03772 16.1932 9.02779 16.3081C9.01787 16.423 9.03879 16.5385 9.08819 16.6417C9.1376 16.7449 9.21354 16.8316 9.30752 16.8923C9.4015 16.9529 9.50979 16.9851 9.62026 16.9851H13.6535L12.6065 22.4541C12.5789 22.5925 12.5975 22.7366 12.6591 22.8625C12.7208 22.9884 12.8218 23.0886 12.9454 23.1463C13.069 23.204 13.2078 23.2159 13.3388 23.1799C13.4697 23.1439 13.585 23.0623 13.6654 22.9485L20.8038 13.0094C20.8701 12.9171 20.9105 12.8074 20.9204 12.6925C20.9303 12.5776 20.9094 12.4621 20.86 12.3589C20.8106 12.2557 20.7347 12.1689 20.6407 12.1083C20.5467 12.0476 20.4384 12.0155 20.3279 12.0155ZM24.492 14.5003C24.4939 13.9221 24.3661 13.3514 24.1188 12.834C23.8715 12.3167 23.5116 11.867 23.0679 11.521C22.9416 11.4259 22.7847 11.3863 22.6307 11.4107C22.4768 11.435 22.3381 11.5215 22.2445 11.6514C22.1509 11.7814 22.1098 11.9445 22.1301 12.1057C22.1503 12.2669 22.2303 12.4134 22.3529 12.5137C22.9561 12.9883 23.3023 13.7126 23.3023 14.5003C23.3023 15.2892 22.9549 16.0148 22.3505 16.4894C22.2489 16.5664 22.1735 16.6753 22.1351 16.8001C22.0967 16.925 22.0974 17.0593 22.137 17.1837C22.1767 17.3081 22.2532 17.4162 22.3555 17.4921C22.4579 17.5681 22.5807 17.6081 22.7062 17.6063C22.83 17.6063 22.9561 17.5665 23.0632 17.4808C23.506 17.1333 23.8655 16.6833 24.1134 16.1661C24.3614 15.6489 24.491 15.0787 24.492 14.5003Z" fill="white"/>
                    <path id="Vector_2" d="M27.0677 14.4929C27.0718 13.368 26.7407 12.2647 26.1122 11.3087C25.4837 10.3527 24.583 9.58239 23.5128 9.08568C23.4376 9.0504 23.3557 9.02945 23.2719 9.02401C23.1881 9.01857 23.1039 9.02875 23.0243 9.05397C22.9447 9.0792 22.8711 9.11896 22.8077 9.17101C22.7444 9.22306 22.6925 9.28636 22.6551 9.3573C22.6177 9.42825 22.5955 9.50545 22.5897 9.58449C22.584 9.66353 22.5948 9.74287 22.6215 9.81798C22.6482 9.89309 22.6904 9.9625 22.7456 10.0222C22.8008 10.082 22.8679 10.1309 22.9431 10.1662C24.6969 10.9883 25.7876 12.647 25.7876 14.4929C25.7876 16.3387 24.6969 17.9975 22.9419 18.8208C22.8622 18.8534 22.7904 18.901 22.7308 18.9606C22.6712 19.0203 22.6252 19.0907 22.5954 19.1677C22.5656 19.2447 22.5528 19.3265 22.5576 19.4083C22.5625 19.4901 22.585 19.5702 22.6237 19.6435C22.6624 19.7168 22.7166 19.782 22.7828 19.835C22.8491 19.8879 22.9261 19.9276 23.0092 19.9516C23.0922 19.9757 23.1796 19.9835 23.266 19.9746C23.3523 19.9657 23.4359 19.9404 23.5115 19.9001C24.582 19.4036 25.4831 18.6335 26.1119 17.6774C26.7406 16.7214 27.0719 15.6179 27.0677 14.4929Z" fill="white"/>
                    <path id="Vector_3" d="M24.3751 6.49646C24.3008 6.46354 24.2207 6.44593 24.1396 6.44465C24.0585 6.44338 23.9779 6.45848 23.9026 6.48905C23.8273 6.51963 23.7588 6.56508 23.701 6.62275C23.6433 6.68042 23.5974 6.74916 23.5662 6.82495C23.535 6.90074 23.519 6.98206 23.5191 7.06417C23.5193 7.14628 23.5356 7.22754 23.5672 7.30319C23.5987 7.37885 23.6448 7.44739 23.7028 7.50482C23.7608 7.56225 23.8295 7.60741 23.9049 7.63768C26.6477 8.79995 28.4207 11.4925 28.4207 14.5023C28.4207 17.5121 26.6477 20.2059 23.9049 21.3657C23.8308 21.3969 23.7635 21.4426 23.7068 21.5002C23.6502 21.5578 23.6053 21.6261 23.5747 21.7012C23.5129 21.853 23.5132 22.0233 23.5756 22.1748C23.6379 22.3263 23.7572 22.4465 23.9071 22.509C24.0571 22.5716 24.2254 22.5712 24.3751 22.5081C27.5758 21.155 29.6451 18.0127 29.6451 14.5023C29.6451 10.9919 27.5758 7.84956 24.3751 6.49646ZM6.38071 14.5023C6.38071 13.7167 6.73703 12.9943 7.35904 12.5197C7.42508 12.4715 7.48095 12.4105 7.52338 12.3401C7.56581 12.2698 7.59396 12.1916 7.60616 12.1102C7.61837 12.0287 7.61439 11.9456 7.59447 11.8657C7.57454 11.7858 7.53907 11.7107 7.49012 11.6449C7.44118 11.579 7.37974 11.5237 7.30941 11.4822C7.23908 11.4406 7.16127 11.4137 7.08054 11.403C6.99981 11.3923 6.91777 11.398 6.83923 11.4197C6.7607 11.4415 6.68724 11.4789 6.62315 11.5297C6.16621 11.8748 5.79552 12.3234 5.54078 12.8397C5.28605 13.3559 5.15436 13.9253 5.15627 14.5023C5.15741 15.079 5.29069 15.6476 5.54563 16.1634C5.80058 16.6792 6.17026 17.1281 6.6256 17.4749C6.68956 17.5242 6.76257 17.5602 6.84038 17.5808C6.91819 17.6013 6.99926 17.606 7.07888 17.5946C7.1585 17.5832 7.23509 17.5559 7.30421 17.5143C7.37332 17.4727 7.43358 17.4176 7.48149 17.3522C7.53001 17.2874 7.56535 17.2134 7.58546 17.1346C7.60558 17.0559 7.61007 16.9739 7.59869 16.8933C7.5873 16.8128 7.56027 16.7353 7.51913 16.6654C7.478 16.5956 7.42359 16.5346 7.35904 16.4861C7.05425 16.2557 6.80701 15.9562 6.63713 15.6117C6.46724 15.2673 6.37942 14.8873 6.38071 14.5023Z" fill="white"/>
                    <path id="Vector_4" d="M6.72716 18.8333C4.96183 18.0093 3.86477 16.349 3.86477 14.5014C3.86477 12.6539 4.96183 10.9936 6.72716 10.1696C6.80349 10.1345 6.87169 10.0857 6.92781 10.0258C6.98393 9.96598 7.02687 9.89628 7.05416 9.82078C7.08144 9.74527 7.09253 9.66544 7.08679 9.58589C7.08104 9.50634 7.05857 9.42865 7.02068 9.35729C6.98278 9.28592 6.93021 9.22231 6.86599 9.1701C6.80177 9.1179 6.72718 9.07814 6.64651 9.05311C6.56584 9.02809 6.48069 9.01829 6.39597 9.0243C6.31125 9.0303 6.22863 9.05198 6.15288 9.08809C3.94847 10.1164 2.57715 12.1911 2.57715 14.5014C2.57715 16.8118 3.94847 18.8865 6.15288 19.9136C6.22838 19.9494 6.31069 19.9708 6.39506 19.9766C6.47943 19.9823 6.56418 19.9723 6.6444 19.9472C6.72463 19.922 6.79874 19.8821 6.86245 19.8299C6.92617 19.7777 6.97821 19.7141 7.01559 19.6429C7.09158 19.4997 7.10389 19.3339 7.04981 19.1822C6.99574 19.0304 6.8797 18.9049 6.72716 18.8333Z" fill="white"/>
                    <path id="Vector_5" d="M6.01957 21.3536C3.14332 20.1944 1.28404 17.5018 1.28404 14.4934C1.28404 11.485 3.14332 8.79361 6.01957 7.6331C6.09722 7.60179 6.16771 7.55604 6.22703 7.49845C6.28635 7.44086 6.33333 7.37256 6.36528 7.29746C6.39724 7.22236 6.41354 7.14193 6.41327 7.06075C6.413 6.97957 6.39615 6.89923 6.36369 6.82434C6.33123 6.74944 6.28379 6.68144 6.22409 6.62422C6.16438 6.56701 6.09358 6.52169 6.01572 6.49087C5.93786 6.46005 5.85447 6.44432 5.77031 6.44458C5.68615 6.44485 5.60286 6.4611 5.52521 6.49241C2.16874 7.84365 0 10.9846 0 14.4934C0 18.0022 2.16874 21.1431 5.5265 22.4956C5.60504 22.5316 5.69037 22.5519 5.7773 22.5552C5.86422 22.5585 5.95093 22.5447 6.03217 22.5147C6.1134 22.4847 6.18746 22.439 6.24984 22.3805C6.31223 22.3221 6.36165 22.252 6.3951 22.1745C6.42854 22.0971 6.44532 22.0138 6.44441 21.9299C6.4435 21.846 6.42492 21.7632 6.3898 21.6864C6.35468 21.6096 6.30375 21.5406 6.24011 21.4834C6.17646 21.4262 6.10143 21.382 6.01957 21.3536Z" fill="white"/>
                </g>
                </svg>
            </div>
            <div className="absolute w-full me-green-200/10 opacity-90 rounded-3xl">
                <div className="w-full bg-gradient-to-br from-white-100 to-me-green-200/40 dark:bg-dashboard-gradient flex justify-between text-xs border-[0.5px] border-me-green-200 dark:border-gray-400 p-4  rounded-3xl text-gray-500 font-normal h-20">
                    <span>0%</span>
                    <p className='text-black dark:text-white-100 text-3xl pl-3'>
                        {/* {avgSoC}% */}
                        {96}% 
                    </p>
                    <span>100%</span>
                </div>
            </div>
        </div>
        <div className="w-[20%] pl-1 flex flex-col justify-around">
            <p className='flex flex-col text-sm font-medium text-gray-500'>
                Total Charging Sessions
                <span className='text-black dark:text-white-100 text-xl'>
                {20}
                </span>
            </p>
            <p className='flex flex-col text-sm font-medium text-gray-500'>
                Average Charging Rate
                <span className='text-black dark:text-white-100 text-base'>
                    {/* {`${chargeRate!==null ? chargeRate+' Kw' : 'NA'}`} */}
                    45 kW
                </span>
            </p>
        </div>
    </div>
  )
}

export default ChargingPattern