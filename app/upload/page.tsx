import React from 'react'

const Upload = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
        <div className='bg-white p-6 rounded shadow w-80'>
            <h1 className='text-lg font-bold mb-4'>
                Upload File
            </h1>
            <input 
            type='file'
            onChange={}
            className='border p-2 mb-4 w-full'/>
            <button onClick={} className='bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600'>
                Upload
            </button>
            {status && <p className='mt-4 text-sm'>{status}</p>}
        </div>
      
    </div>
  )
}

export default Upload
