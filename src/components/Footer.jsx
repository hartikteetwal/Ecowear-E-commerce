import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
    <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-[116px] h-8 ' alt="" />
        <p className='w-full md:w2/3 text-gray-600 text-justify'>
        Welcome to Ecowear, where fashion meets sustainability. We're passionate about creating clothing that not only makes you look great but also does good for the planet. Our eco-friendly collections are designed to inspire a greener lifestyle, without compromising on style or quality.
        Our mission at Ecowear is to revolutionize the fashion industry with sustainable, eco-friendly clothing that's accessible to all.
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
            <li><a href="tel: 7505693449">+91-75-569-3449</a></li>
            <li><a href="mailto: teetwalhartik@gmail.com">teetwalhartik@gmail.com</a></li>
            <li><a href="https://www.instagram.com/hartikteetwal?igsh=MTNjeWo0anM0dG4yYg==" target='_blank'>Instagram</a></li>
        </ul>
      </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright &copy; 2024 ecowear.com - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
