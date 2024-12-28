import Image from 'next/image';
import React, { useState } from 'react'

const Login = ({handleshowlogin}:{handleshowlogin:()=>void}) => {


    const[signup,setsignup] = useState(false);

    const toggleform = (tosignup:boolean)=>{
        setsignup(tosignup);
    }

    const stoppropagation = (e:React.MouseEvent)=>{
        e.stopPropagation();
    }

    const handlesubmit = (e:React.FormEvent)=>{
        e.preventDefault();
        console.log(signup?"sign up success":"login success");
    }

  return (
    <div className='w-full h-full absolute top-0 backdrop-filter backdrop-brightness-75 backdrop-blur-md flex justify-center items-center'onClick={handleshowlogin}>
      <div onClick={(e)=>e.stopPropagation()} className='relative bg-white rounded-lg shadow px-16'>
        <button type='button' className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close' onClick={handleshowlogin}>
        <svg aria-hidden="true" className="w-5 h-5" fill="#1976d2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
          </svg>
        </button>

        <div className='p-5'>
        <div className='flex flex-row items-center justify-center gap-2'>
            <Image src="/logo.png" width={100} height={100} alt='logo'/>
            <h1 className='text-6xl font-semibold'>AIPRO</h1>
        </div>

        <div className='text-center'>
            <p className='mb-3 text-2xl font-semibold leading-5 text-slate-900'>
                {signup?'create your account':'login to your account'}
            </p>
            <p className='mt-2 text-sm leading-4 text-slate-600'>
            {signup?'please fill in the details below to sign up':'you must be logged in to perform this action '}
            </p>
        </div>

        <div className='flex w-full items-center gap-2 py-6 text-sm text-slate-600'>
            <div className='h-px w-full bg-slate-200'>
                Or
            </div>
            <div className='h-px w-full bg-slate-200'></div>
        </div>

        <form onSubmit={handlesubmit} className='w-full'>
            <label htmlFor='email' className='sr-only'>Email Adress</label>
            <input name='email' type='email' autoComplete='email' required className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-black focus:ring-offset-1' placeholder='Email Adress'/>

            <label htmlFor='password' className='sr-only'>Password</label>
            <input name='passowrd' type='password' autoComplete='current-password' required className='mt-2 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1' placeholder='Password'/>

            {signup && (
                <>
                <label htmlFor='confirm-password' className='sr-only'>
                    Confirm Password
                </label>
                <input name='confirm-password' type='password' autoComplete='current-password' required className='mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1' placeholder='confirm password'/>
                </>
            )}

        </form>
        </div>
      </div>
    </div>
  )
}

export default Login
