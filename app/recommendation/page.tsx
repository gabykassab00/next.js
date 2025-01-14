"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const page = () => {
 const searchparams = useSearchParams()
 const feedback = searchparams.get("feedback");
 const router = useRouter()
  return (
    <div
    className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center'
    style={{backgroundImage:"url('/background-pic.jpg')"}}
    >
      <button 
      onClick={()=>router.push("/player1")}
      className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100'>
        Go Back
      </button>
      <div className='bg-white p-6 rounded shadow-lg w-97'>
        <h1 className='text-3xl font-bold mb-6 text-center'>AI Game Analyzer</h1>
        {feedback?(
          <div className='mt-4 p-3 bg-green-100 text-green-800 rounded'>
            <strong>response :</strong>{feedback}
          </div>
        ):(
          <div className='text-center text-gray-500'>
            no response availble
          </div>
        )}
        <button 
        onClick={()=>window.history.back()}
        className='bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600 mt-4'
        >
          Get Training Program
        </button>
      </div>
    </div>
  )
}

export default page
