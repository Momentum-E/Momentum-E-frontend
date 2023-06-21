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
} from '@/utils/icons';

function Landing() {
  return (
    <main>
      <div className="relative -z-2 pt-32 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div className="absolute w-full h-full bg-center bg-cover bg-[url('../assets/images/curved14.jpg')]"></div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full h-full lg:w-2/3 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-6xl">
                  Know your battery better through our deep analysis
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="pb-20 -mt-24">
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
      </section>

      <section className="relative py-20">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}>
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0">
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <Image
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                width={500}
                height={500}
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <div className="text-lightBlue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-lightBlue-300">
                  <figure className="text-2xl">
                    <Rocket />
                  </figure>
                </div>
                <h3 className="text-3xl font-semibold">A growing company</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  The extension comes with three pre-built pages to help you get
                  started faster. You can change the text and images and you`re
                  good to go.
                </p>
                <ul className="list-none mt-6">
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
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 relative block">
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
      <section className="relative block py-24 lg:pt-0 bg-blueGray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                <div className="flex-auto p-5 lg:p-10">
                  <h4 className="text-2xl font-semibold">
                    Want to work with us?
                  </h4>
                  <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                    Complete this form and we will get back to you in 24 hours.
                  </p>
                  <div className="relative w-full mb-3 mt-8">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="full-name">
                      Full Name
                    </label>
                    <input
                      id='full-name'
                      type="text"
                      autoComplete='full-name'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="email">
                      Email
                    </label>
                    <input
                      id='email'
                      type="email"
                      autoComplete='email'
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      autoComplete='message'
                      id='message'
                      rows={4}
                      cols={80}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Type a message..."
                    />  
                  </div>
                  <div className="text-center mt-6">
                    <button
                      className="hover:bg-white hover:text-gray-800 bg-gray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
