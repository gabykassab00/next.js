"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

const page = () => {
  const router = useRouter()
  return (
    <div className='min-h-screen flex items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>

      <button 
      onClick={()=>router.push('/upload')}
      className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4'>
        Go Back
      </button>
      
      
    </div>
  )
}

export default page
