import {useRouter} from 'next/router';
import Head from 'next/head';
import Image from "next/image";
import lpImg from '../../public/illustrations/highFive.png';

import Header from "../Header";

const LandingPageLoggedOut = () => {
    const router = useRouter();


    return (
        <>
            <Head>
                <title>Spinoze | Landing Page</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header />
            <section>
                <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 md:px-12 lg:px-24 lg:py-24">
                    <div className="flex flex-wrap items-center mx-auto max-w-7xl">
                        <div className="w-full lg:max-w-lg lg:w-1/2 rounded-xl">
                            <div>
                                <div className="relative w-full max-w-lg">
                                    <div
                                        className="absolute top-0 rounded-full bg-green-300 -left-4 w-72 h-72 mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>

                                    <div
                                        className="absolute rounded-full bg-yellow-200 -bottom-24 right-20 w-72 h-72 mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
                                    <div className="relative">
                                        <Image className="object-cover object-center mx-auto rounded-lg shadow-2xl" alt="hero" src={lpImg} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className="flex flex-col items-start mt-12 mb-16 text-left lg:flex-grow lg:w-1/2 lg:pl-6 xl:pl-24 md:mb-0 xl:mt-0">
                            <span className="mb-8 text-xs font-bold tracking-widest text-blue-600 uppercase"> Get More Done </span>
                            <h1 className="mb-8 text-4xl font-bold leading-none tracking-tighter text-neutral-600 md:text-7xl lg:text-5xl">
                                Less time planning
                                more time doing.
                            </h1>
                            <p className="mb-8 text-base leading-relaxed text-left text-gray-500">
                                Time is our most valuable resource. It cannot be replaced, rebuilt,
                                or altered. So why do companies who claim to help you manage life,
                                end up making it more complicated?
                                Were here to make your life easier, not add to the pile. Get out there
                                and do.
                            </p>
                            <div className="mt-0 lg:mt-6 max-w-7xl sm:flex">
                                <div className="mt-3 rounded-lg sm:mt-0">
                                    <button
                                        className="items-center block px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                        onClick={() => router.push('/signup')}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                                <div className="mt-3 rounded-lg sm:mt-0 sm:ml-3">
                                    <button
                                        className="items-center block px-10 py-3.5 text-base font-medium text-center text-blue-600 transition duration-500 ease-in-out transform border-2 border-white shadow-md rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        See features
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default LandingPageLoggedOut;