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
            
        </button>
      </div>
    </div>
  )
}

export default Login
