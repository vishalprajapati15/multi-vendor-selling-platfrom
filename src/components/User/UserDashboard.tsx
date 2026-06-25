import React from 'react'
import Slider from './Slider'
import CategorySlider from './CategorySlider'

const UserDashboard = () => {
  return (
    <div className='w-full flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 font-sans flex-col'>
      <Slider/>
      <CategorySlider/>
    </div>
  )
}

export default UserDashboard