import React, { useEffect, useState, useRef } from 'react'
import { heros } from '../assets/assets'

const Hero = () => {
  const [count, setCount] = useState(0)
  const intervalRef = useRef(null)

  const nextImage = () => {
    setCount(prev => (prev === heros.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCount(prev => (prev === 0 ? heros.length - 1 : prev - 1))
  }

  const resetInterval = () => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCount(prev => (prev === heros.length - 1 ? 0 : prev + 1))
    }, 4000)
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCount(prev => (prev === heros.length - 1 ? 0 : prev + 1))
    }, 4000)

    return () => clearInterval(intervalRef.current)
  }, [])

  const handleManualChange = (action) => {
    if (action === 'next') nextImage()
    else if (action === 'prev') prevImage()
    resetInterval()
  }

  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 relative'>
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'></link>

      {/* Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 fadein">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
          <div className="flex items-center gap-2">
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="group w-full sm:w-1/2 slide overflow-hidden relative">
        <div className="hero flex transition-all duration-700 ease-in-out">
          <img src={heros[count]} className='w-full object-cover' alt={`slide-${count}`} />
        </div>

        {/* Buttons: hidden by default, visible on hover */}
        <button 
          onClick={() => handleManualChange('prev')} 
          className="hidden group-hover:flex absolute top-1/2 left-3 transform -translate-y-1/2 text-2xl text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-10 transition-opacity duration-300"
        >
          <i className='bx bx-chevron-left'></i>
        </button>

        <button 
          onClick={() => handleManualChange('next')} 
          className="hidden group-hover:flex absolute top-1/2 right-3 transform -translate-y-1/2 text-2xl text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-10 transition-opacity duration-300"
        >
          <i className='bx bx-chevron-right'></i>
        </button>
      </div>
    </div>
  )
}

export default Hero
