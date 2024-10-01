import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32 ' alt="" />
        <p className='w-full md:w2/3 text-gray-600'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quis dignissimos impedit enim ex ducimus, doloribus vero. Placeat, distinctio magni. Culpa minima, natus cupiditate eaque nostrum reprehenderit est et delectus id sunt. Nesciunt, aut.
        </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>  
            <li>+91-750-569-3449</li>
            <li>teetwalhartik@gmail.com</li>
            <li><a href="https://www.instagram.com/hartikteetwal?igsh=MTNjeWo0anM0dG4yYg==" target='_blank'>Instagram</a></li>
        </ul>
      </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright &copy; 2024 forever.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
