import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Car,
  CarBattery,
  Fingerprint,
  Friends,
  Html,
  LightBulb,
  Medal,
  PaperPlane,
  Poll,
  Rocket,
  Truck,
  DottedIcon
} from '@/utils/icons';
import {
  unrivaled_performance_img1,
  unrivaled_performance_img2
} from '@/assets/images/'

function Landing() {
  return (
    <main className='px-5 mx-auto lg:px-16'>
      <div className="relative pt-5 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap w-full h-full lg:w-2/3 ml-auto mr-auto text-center">
            {/* <DottedIcon classname={`absolute top-0 left`}/> */}
            <div className="relative text-5xl text-white font-bold">
              <DottedIcon classname={`absolute left-0`}/>
              <h1 className='pt-10 '>
                  Know your battery  better through our deep analysis 
              </h1>
              <DottedIcon classname={`absolute right-0`}/>
            </div>
          </div>
        </div>
      </div>

      {/* <section className="pb-20 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap ">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative group flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 group flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-900">
                    <figure className="text-xl">
                      <Car />
                    </figure>
                  </div>
                  <h6 className="text-xl font-semibold">Individual Owner</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    If you want to understand your car better battery and its
                    performance better.
                  </p>
                  <Link
                    href="/individualowner"
                    className="flex items-center justify-center ">
                    <button className="font-bold p-3 rounded-md flex hover:text-white hover:bg-gray-800">
                      Learn More
                      <span className=" mt-0.5 w-5 ml-1 group-hover:translate-x-1 transition ease-in-out flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative group flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-900">
                    <figure className="text-xl">
                      <Truck />
                    </figure>
                  </div>
                  <h6 className="text-xl font-semibold">Fleet Owner</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    If you are an EV fleet owner and want to reduce your battery
                    repair and maintainence cost.
                  </p>
                  <Link
                    href="/fleetowner"
                    className="flex items-center justify-center ">
                    <button className="font-bold p-3 rounded-md flex hover:text-white hover:bg-gray-800">
                      Learn More
                      <span className=" mt-0.5 w-5 ml-1 group-hover:translate-x-1 transition ease-in-out flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center group">
              <div className="relative group flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-indigo-900">
                    <figure>
                      <CarBattery />
                    </figure>
                  </div>
                  <h6 className="text-xl font-semibold">
                    Battery Rocomposition
                  </h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    Write a few lines about each one. A paragraph describing a
                    feature will be enough. Keep you user engaged!
                  </p>
                  <Link
                    href="/batteryrecompositon"
                    className="flex items-center justify-center ">
                    <button className="font-bold p-3 rounded-md flex hover:text-white hover:bg-gray-800">
                      Learn More
                      <span className=" mt-0.5 w-5 ml-1 group-hover:translate-x-1 transition ease-in-out flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          viewBox="0 0 24 24"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <figure className="text-2xl">
                  <Friends />
                </figure>
              </div>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                Working with us is a pleasure
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                Don`t let your uses guess by attaching tooltips and popoves to
                any element. Just make sure you enable them first via
                JavaScript.
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you`re good to
                go. Just make sure you enable them first via JavaScript.
              </p>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-lightBlue-500">
                <Image
                  alt="..."
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80"
                  className="w-full align-middle rounded-t-lg"
                  width={500}
                  height={500}
                />
                <blockquote className="relative p-8 mb-4">
                  <svg
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 583 95"
                    className="absolute left-0 w-full block h-95-px -top-94-px"></svg>
                  <h4 className="text-xl font-bold text-black">
                    Top Notch Services
                  </h4>
                  <p className="text-md font-light mt-2 text-black">
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* The Grid to be EDITTED */}
      <section className='grid grid-rows-7 grid-cols-4 gap-2'>
        <Image src="" alt="" className=" row-span-2" />
        <div className="row-span-5 bg-[#C6DE41]">
          Individual Owner
        </div>

        <div className="row-span-3 bg-[#C6DE41]">Fleet Owner</div>
        <Image src="" alt="" className="row-span-4" />
        
        <Image src="" alt="" className="row-span-5" />
        <Image src="" alt="" className="row-span-2" />
        
        <div className="row-span-5 bg-[#C6DE41]">Battery Recompositon</div>
        <Image src="" alt="" className="row-span-2" />
      </section>

      <section className="relative lg:pt-20 pt-30">
        {/* Heading */}
        <div className="relative pt-5 pb-10 flex content-center items-center justify-center">
            <div className="">
              <div className="relative items-center w-full h-full  ml-auto mr-auto text-center lg:w-2/3">
                <DottedIcon classname={`absolute -translate-x-2`}/>
                <h1 className='pt-5 text-4xl w-full text-white font-bold'>
                  OUR UNRIVALED PERFORMANCE
                </h1>
                <DottedIcon classname={`absolute right-0 sm:-translate-y-3 sm:-translate-x-3`}/>
              </div>
            </div>
        </div>

        {/* Working with us is a pleasure */}
        <div className=" mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
            <h3 className="text-3xl pb-5 font-semibold text-white block lg:hidden">Working with us is a pleasure</h3>
              <Image
                alt="Working with us is a pleasure"
                className="max-w-full w-full h-full rounded-lg shadow-lg"
                src={unrivaled_performance_img1}
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold text-white hidden lg:block">Working with us is a pleasure</h3>
                <p className="mt-4 text-lg leading-relaxed text-[#FFFFFFBF]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Doloremque, corporis nulla tempora pariatur 
                </p>
                {/* <ul className="list-none mt-6 text-[#FFFFFFBF]">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <Fingerprint />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Carefully crafted components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <Html />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Amazing page examples
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <PaperPlane />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Dynamic components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
        
        {/* A growing company */}
        <div className=" mx-auto lg:pt-5 pt-20">
          <div className="items-center flex flex-row-reverse flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
            <h3 className="text-3xl pb-5 font-semibold text-white block lg:hidden">A growing company</h3>
              <Image
                alt="A growing company"
                className="max-w-full w-full h-full rounded-lg shadow-lg"
                src={unrivaled_performance_img2}
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto pt-4 px-4">
              <div className="md:pr-12">
                <h3 className="text-3xl font-semibold text-white hidden lg:block">A growing company</h3>
                <p className="mt-4 text-lg leading-relaxed text-[#FFFFFFBF]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Doloremque, corporis nulla tempora pariatur 
                </p>
                {/* <ul className="list-none mt-6 text-[#FFFFFFBF]">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <Fingerprint />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Carefully crafted components
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <Html />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Amazing page examples
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-lightBlue-600 bg-lightBlue-200 mr-3">
                          <figure className="text-xl">
                            <PaperPlane />
                          </figure>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Dynamic components
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* TO BE EDITTED BY SHIVAM */}
      <section className="pb-20 block">
        <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">
          <div className="flex flex-wrap text-center justify-center">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold ">Build something</h2>
              <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">
                Put the potentially record low maximum sea ice extent tihs year
                down to low ice. According to the National Oceanic and
                Atmospheric Administration, Ted, Scambos.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap mt-12 justify-center">
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <figure className="text-xl">
                  <Medal />
                </figure>
              </div>
              <h6 className="text-xl mt-5 font-semibold text-white">
                Excelent Services
              </h6>
              <p className="mt-2 mb-4 text-blueGray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card`s content.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <figure>
                  <Poll />
                </figure>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Grow your market
              </h5>
              <p className="mt-2 mb-4 text-blueGray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card`s content.
              </p>
            </div>
            <div className="w-full lg:w-3/12 px-4 text-center">
              <div className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                <figure>
                  <LightBulb />
                </figure>
              </div>
              <h5 className="text-xl mt-5 font-semibold text-white">
                Launch time
              </h5>
              <p className="mt-2 mb-4 text-blueGray-400">
                Some quick example text to build on the card title and make up
                the bulk of the card`s content.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Want to work with us */}
      <section className="container pt-24 pb-10 mx-auto block lg:pt-0 text-white">
        <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
          <div className="w-full lg:w-6/12">
            <div className="flex flex-col flex-auto lg:p-10 min-w-0 break-words w-full mb-6">
              <div className="">
                <div className="pt-5 pb-10 flex content-center items-center justify-center">
                  <div className="w-full">
                    <div className="relative items-center w-full h-full ml-auto mr-auto text-center ">
                      <DottedIcon classname={`absolute lg:-translate-x-6 lg:-translate-y-4`}/>
                      <h1 className='pt-5 text-3xl w-full text-white font-bold'>
                        Want to work with us
                      </h1>
                      <DottedIcon classname={`absolute right-0 sm:-translate-y-7 lg:-translate-y-2 lg:translate-x-3`}/>
                    </div>
                  </div>
                </div>
                {/* <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                  Complete this form and we will get back to you in 24 hours.
                </p> */}
                <div className="space-y-4">
                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-xs font-bold pb-2"
                      htmlFor="full-name">
                      Full Name
                    </label>
                    <input
                      id='full-name'
                      type="text"
                      autoComplete='name'
                      className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold pb-2"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      id='email'
                      type="email"
                      autoComplete='email'
                      className="border-b border-[#C6DE41] px-3 py-2 text-white bg-transparent text-sm focus:outline-none focus-within:outline-none focus:ring-0 w-full ease-linear transition-all duration-150"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-xs font-bold pb-4"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id='message'
                      rows={4}
                      cols={80}
                      className="border border-[#C6DE41] px-3 py-3 text-white bg-transparent rounded text-sm focus:outline-none focus:ring-0 w-full"
                      placeholder="Type a message..."
                    />    
                  </div>

                  <div className="text-right mt-6">
                    <button
                      className=" hover:bg-white bg-[#C6DE41] text-black active:bg-[#C6DE4180] text-xs font-medium uppercase px-2 py-2 rounded-lg hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150"
                      type="button">
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
