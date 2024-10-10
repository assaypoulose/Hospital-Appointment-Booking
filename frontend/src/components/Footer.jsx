import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div className='flex items-center justify-between text-justify border border-primary'>
                <img className='w-40' src={assets.logo1} alt="" />
                <p className=' text-gray-600 leading-6 p-2'>Medicare connects you with trusted and experienced healthcare professionals, offering comprehensive services for your well-being.</p>
            </div>

            {/* center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+1-202-847-8736</li>
                    <li>support@medicare.com</li>
                </ul>
            </div>
        </div>
        {/* -------copyright------- */}
        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ Medicare - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer