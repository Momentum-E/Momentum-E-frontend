import React from 'react'
import BasicCarData from './BasicCarData'




function VehicleData() {
  return (
    <div className="max-h-full overflow-auto">
          <div className="p-2 rounded-lg dark:border-gray-700 space-y-4">
            {/* <h1 className='text-white-100'>Vehicle Dashboard Content for Vehicle ID: {vehicleId}</h1> */}
            <div className="lg:grid lg:grid-cols-4 md:grid-cols-2 flex flex-col gap-4">
              <BasicCarData 
              heading='Model Year'
              data='2021' 
              icon={
              <svg width="27" height="24" viewBox="0 0 27 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M23.88 1.515C23.7263 1.07255 23.4386 0.688947 23.0569 0.417458C22.6752 0.145968 22.2184 6.25246e-05 21.75 0H5.25C4.2675 0 3.4275 0.63 3.12 1.515L0 10.5V22.5C0 23.325 0.675 24 1.5 24H3C3.39782 24 3.77936 23.842 4.06066 23.5607C4.34196 23.2794 4.5 22.8978 4.5 22.5V21H22.5V22.5C22.5 23.325 23.175 24 24 24H25.5C25.8978 24 26.2794 23.842 26.5607 23.5607C26.842 23.2794 27 22.8978 27 22.5V10.5L23.88 1.515ZM5.25 16.5C4.005 16.5 3 15.495 3 14.25C3 13.005 4.005 12 5.25 12C6.495 12 7.5 13.005 7.5 14.25C7.5 15.495 6.495 16.5 5.25 16.5ZM21.75 16.5C20.505 16.5 19.5 15.495 19.5 14.25C19.5 13.005 20.505 12 21.75 12C22.995 12 24 13.005 24 14.25C24 15.495 22.995 16.5 21.75 16.5ZM3 9L5.25 2.25H21.75L24 9H3Z" fill="white"/>
              </svg>}/>
              
              <BasicCarData 
              heading='Date of Manufacture'
              data='2018' 
              icon={
              <svg width="23" height="23" viewBox="0 0 23 23" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M19.55 2.3H17.25V1.15C17.25 0.845001 17.1288 0.552494 16.9132 0.336827C16.6975 0.12116 16.405 0 16.1 0C15.795 0 15.5025 0.12116 15.2868 0.336827C15.0712 0.552494 14.95 0.845001 14.95 1.15V2.3H8.05V1.15C8.05 0.845001 7.92884 0.552494 7.71317 0.336827C7.49751 0.12116 7.205 0 6.9 0C6.595 0 6.30249 0.12116 6.08683 0.336827C5.87116 0.552494 5.75 0.845001 5.75 1.15V2.3H3.45C2.535 2.3 1.65748 2.66348 1.01048 3.31048C0.363481 3.95748 0 4.835 0 5.75V19.55C0 20.465 0.363481 21.3425 1.01048 21.9895C1.65748 22.6365 2.535 23 3.45 23H19.55C20.465 23 21.3425 22.6365 21.9895 21.9895C22.6365 21.3425 23 20.465 23 19.55V5.75C23 4.835 22.6365 3.95748 21.9895 3.31048C21.3425 2.66348 20.465 2.3 19.55 2.3ZM20.7 19.55C20.7 19.855 20.5788 20.1475 20.3632 20.3632C20.1475 20.5788 19.855 20.7 19.55 20.7H3.45C3.145 20.7 2.85249 20.5788 2.63683 20.3632C2.42116 20.1475 2.3 19.855 2.3 19.55V11.5H20.7V19.55ZM20.7 9.2H2.3V5.75C2.3 5.445 2.42116 5.15249 2.63683 4.93683C2.85249 4.72116 3.145 4.6 3.45 4.6H5.75V5.75C5.75 6.055 5.87116 6.34751 6.08683 6.56317C6.30249 6.77884 6.595 6.9 6.9 6.9C7.205 6.9 7.49751 6.77884 7.71317 6.56317C7.92884 6.34751 8.05 6.055 8.05 5.75V4.6H14.95V5.75C14.95 6.055 15.0712 6.34751 15.2868 6.56317C15.5025 6.77884 15.795 6.9 16.1 6.9C16.405 6.9 16.6975 6.77884 16.9132 6.56317C17.1288 6.34751 17.25 6.055 17.25 5.75V4.6H19.55C19.855 4.6 20.1475 4.72116 20.3632 4.93683C20.5788 5.15249 20.7 5.445 20.7 5.75V9.2Z" fill="white"/>
              </svg>}/>
              
              <BasicCarData 
              heading='Connected on'
              data='20th June’23' 
              icon={
              <svg width="18" height="20" viewBox="0 0 18 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path id="Vector" d="M1.28571 13.75C0.944722 13.75 0.617695 13.8817 0.376577 14.1161C0.135459 14.3505 0 14.6685 0 15V18.75C0 19.0815 0.135459 19.3995 0.376577 19.6339C0.617695 19.8683 0.944722 20 1.28571 20C1.62671 20 1.95373 19.8683 2.19485 19.6339C2.43597 19.3995 2.57143 19.0815 2.57143 18.75V15C2.57143 14.6685 2.43597 14.3505 2.19485 14.1161C1.95373 13.8817 1.62671 13.75 1.28571 13.75ZM6.42857 10C6.08758 10 5.76055 10.1317 5.51943 10.3661C5.27832 10.6005 5.14286 10.9185 5.14286 11.25V18.75C5.14286 19.0815 5.27832 19.3995 5.51943 19.6339C5.76055 19.8683 6.08758 20 6.42857 20C6.76956 20 7.09659 19.8683 7.33771 19.6339C7.57883 19.3995 7.71429 19.0815 7.71429 18.75V11.25C7.71429 10.9185 7.57883 10.6005 7.33771 10.3661C7.09659 10.1317 6.76956 10 6.42857 10ZM16.7143 0C16.3733 0 16.0463 0.131696 15.8051 0.366117C15.564 0.600537 15.4286 0.918479 15.4286 1.25V18.75C15.4286 19.0815 15.564 19.3995 15.8051 19.6339C16.0463 19.8683 16.3733 20 16.7143 20C17.0553 20 17.3823 19.8683 17.6234 19.6339C17.8645 19.3995 18 19.0815 18 18.75V1.25C18 0.918479 17.8645 0.600537 17.6234 0.366117C17.3823 0.131696 17.0553 0 16.7143 0ZM11.5714 5C11.2304 5 10.9034 5.1317 10.6623 5.36612C10.4212 5.60054 10.2857 5.91848 10.2857 6.25V18.75C10.2857 19.0815 10.4212 19.3995 10.6623 19.6339C10.9034 19.8683 11.2304 20 11.5714 20C11.9124 20 12.2394 19.8683 12.4806 19.6339C12.7217 19.3995 12.8571 19.0815 12.8571 18.75V6.25C12.8571 5.91848 12.7217 5.60054 12.4806 5.36612C12.2394 5.1317 11.9124 5 11.5714 5Z" fill="white"/>
              </svg>
              }/>
              
              <BasicCarData 
              heading='Odometer'
              data='57' 
              icon={
              <svg width="29" height="20" viewBox="0 0 29 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <g id="Group 1000001495">
                <path id="Vector" d="M14.1833 0.00431321C12.4436 -0.0467974 10.7207 0.35708 9.18486 1.17592C7.64906 1.99476 6.35358 3.20022 5.42647 4.67319C4.49937 6.14616 3.97276 7.83569 3.89871 9.57456C3.82465 11.3134 4.20572 13.0415 5.00423 14.588C5.80274 16.1344 6.99104 17.4457 8.45166 18.3922C9.91227 19.3386 11.5946 19.8875 13.3324 19.9845C15.0701 20.0814 16.8031 19.7232 18.3599 18.9451C19.9168 18.1671 21.2436 16.9962 22.2093 15.5482C24.158 15.5692 25.8296 15.5608 27.7783 15.5608C28.3957 15.5608 28.8913 13.3894 28.8913 10.0043C28.8913 6.615 28.3957 4.45209 27.7783 4.45209V4.44786C25.8632 4.44786 24.3596 4.44362 22.2135 4.46042C21.3281 3.13067 20.137 2.03254 18.7398 1.25795C17.3426 0.483366 15.7801 0.0549058 14.1833 0.00854284V0.00431321ZM12.7763 1.66758H13.8893V2.78049H12.7763V1.66758ZM15.0023 1.94469H16.111V3.05772H15.0023V1.94469ZM10.5546 2.22615H11.6675V3.33483H10.5546V2.22615ZM17.224 2.78049H18.3328V3.8893H17.224V2.78049ZM8.33281 3.33483H9.44578V4.44786H8.33281V3.33483ZM18.8914 3.8893H20.0001V5.0022H18.8914V3.8893ZM6.66965 5.27944H7.77842V6.39247H6.66125L6.66965 5.27944ZM17.7784 6.66534H26.111C26.4218 6.66534 26.6696 6.91745 26.6696 7.22404V12.7805C26.6696 12.8537 26.6551 12.9261 26.627 12.9936C26.5988 13.0612 26.5576 13.1224 26.5057 13.174C26.4538 13.2255 26.3922 13.2662 26.3244 13.2938C26.2567 13.3214 26.1841 13.3354 26.111 13.3348H17.7784C17.6313 13.3348 17.4903 13.2764 17.3864 13.1724C17.2824 13.0685 17.224 12.9275 17.224 12.7805V7.22404C17.224 6.91745 17.4718 6.66957 17.7784 6.66957V6.66534ZM13.3349 7.22404H14.4437V8.14802C15.2416 8.39162 15.8338 9.13074 15.8338 10.0043C15.8338 10.8737 15.2458 11.6129 14.4479 11.8523V17.5012H13.3349V11.8523C12.9359 11.7336 12.5855 11.49 12.3353 11.1573C12.085 10.8247 11.9481 10.4206 11.9447 10.0043C11.9447 9.13074 12.5327 8.39162 13.3307 8.14802L13.3349 7.22404ZM5.83387 7.50115H6.94265V8.61418H5.83387V7.50115ZM13.8893 9.16852C13.7794 9.16738 13.6704 9.18826 13.5687 9.22991C13.4671 9.27157 13.3747 9.33312 13.2972 9.41102C13.2197 9.48891 13.1586 9.58162 13.1175 9.68351C13.0763 9.7854 13.056 9.89445 13.0577 10.0043C13.0577 10.4663 13.4231 10.8359 13.8893 10.8359C13.9988 10.837 14.1074 10.8163 14.2088 10.7749C14.3102 10.7335 14.4024 10.6722 14.4798 10.5948C14.5572 10.5174 14.6185 10.4252 14.6598 10.3238C14.7012 10.2224 14.722 10.1138 14.7209 10.0043C14.7225 9.89445 14.7022 9.7854 14.6611 9.68351C14.6199 9.58162 14.5588 9.48891 14.4813 9.41102C14.4038 9.33312 14.3115 9.27157 14.2098 9.22991C14.1081 9.18826 13.9992 9.16738 13.8893 9.16852ZM5.55668 9.72298H6.66545V10.8359H5.55668V9.72298ZM6.11107 11.9489H7.22404V13.0576H6.11107V11.9489ZM7.22404 14.1706H8.33281V15.2794H7.22404V14.1706ZM8.8872 15.838H10.0002V16.9468H8.8872V15.838ZM10.8318 16.6696H11.9447V17.7825H10.8318V16.6696Z" fill="white"/>
                <path id="Vector_2" d="M2.31158 2.49927C0.807636 4.70722 0.00225156 7.31627 4.71399e-06 9.98777C-0.00224213 12.6593 0.798752 15.2698 2.29898 17.4802C3.42876 17.5012 4.83572 17.497 5.8899 17.497C3.98304 15.4678 2.91991 12.789 2.91637 10.0044C2.91637 7.1485 4.03354 4.48992 5.8983 2.50337C4.86932 2.50337 3.50435 2.50767 2.31158 2.49927Z" fill="white"/>
                </g>
              </svg>}/>
            </div>

            <div className="flex-row space-y-4 lg:flex md:flex-row lg:space-y-0 gap-4">
              <div className="lg:w-[60%] flex-0 h-80 p-4 rounded bg-dashboard-gradient backdrop-blur-3xl dark:bg-gray-800">
                <div className="text-gray-400">
                  <p>Welcome Back,</p>
                  <span className='text-white-100 text-xl'>Kishu Raj</span>
                  <p>Glad to see you</p>
                </div>
              </div>
            
              <div className="lg:w-[40%] flex flex-0  h-80 rounded bg-dashboard-gradient backdrop-blur-3xl dark:bg-gray-800">
                
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="flex items-center justify-center rounded bg-dashboard-gradient backdrop-blur-3xl h-[445px] dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>

              <div className="flex items-center justify-center rounded bg-dashboard-gradient backdrop-blur-3xl h-[445px] dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>

              {/* <div className="flex items-center justify-center rounded bg-dashboard-gradient backdrop-blur-3xl h-28 dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div>
              <div className="flex items-center justify-center rounded bg-dashboard-gradient backdrop-blur-3xl h-28 dark:bg-gray-800">
                <p className="text-2xl text-white-100 dark:text-gray-500">+</p>
              </div> */}
            </div>

          </div>
        </div>
  )
}

export default VehicleData