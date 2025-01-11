"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter()
  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>

      <button 
      onClick={()=>router.push('/character')}
      className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4'>
        Go Back
      </button>

      <div className='bg-white p-8 rounded shadow w-96'>
        <h1 className='text-xl font-bold mb-6 text-center'>are you in team1 or team2?</h1>

        <div className='space-y-4'>
          <button 
          onClick={()=>router.push("/team")}
          className='bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600'>
            Team 1 
          </button>
          <button 
          onClick={()=>router.push('/team')}
          className='bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600'>
            Team 2 
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
