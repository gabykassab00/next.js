import React from 'react'

const Review = () => {
  return (
    <div className='pt-20 pb-20 flex items-center justify-center flex-col bg-[#1976d2]'>
      <div className='w-[80%] mx-auto grid items-center grid-cols-1 lg:grid-cols-2 gap-10'>
        <div>
            <h1 className='text-2xl font-semibold text-white'>FeedBack</h1>
            <p className='mt-6 text-gray-200'>
            Let’s hear what people say about AIPRO!
            </p>
            <div className='mt-6 flex items-center space-x-6'>
                <div>
                    <p className='text-2xl font-bold text-white'>4.88</p>
                    <p className='text-white mb-2'>Overall Rating</p>
                    
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Review
