"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter()
  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>

      <button 
      onClick={()=>router.push('/upload')}
      className='absolute top-4 left-4 bg-white  rounded-lg py-2 px-4 text-[#1976d2]' style={{color:'#1976d2'}}>
        Go Back
      </button>

      <div className='bg-white p-8 rounded shadow w-96'>
        <h1 className='text-xl font-bold mb-6 text-center'>are you a player or a coach ?</h1>

        <div className='space-y-4'>
          <button 
          onClick={()=>router.push("/player")}
          className='bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600'>
            Player
          </button>
          <button 
          onClick={()=>router.push('/team')}
          className='bg-green-500 text-white py-2 px-4 rounded w-full hover:bg-green-600'>
            coach
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
