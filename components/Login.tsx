import { sign } from 'crypto';
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

        <div className='text-center'>
            <p className='mb-3 text-2xl font-semibold leading-5 text-slate-900'>
                {signup?'create your account':'login to your account'}
            </p>
        </div>
      </div>
    </div>
  )
}

export default Login
