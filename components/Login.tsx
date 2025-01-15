import Image from 'next/image';
import React, {  useState } from 'react'
import {GoogleLogin,GoogleOAuthProvider} from '@react-oauth/google'
import { useRouter } from 'next/navigation';
const Login = ({handleshowlogin}:{handleshowlogin:()=>void}) => {
    const [email,setemail] =useState('');
    const [password,setpassword] =useState('');
    const [confirmPassword,setconfirmpassword] =useState('')
    const[signup,setsignup] = useState(false);
    const router = useRouter();

    
    const toggleform = (tosignup:boolean)=>{
        setsignup(tosignup);
    }

    const stoppropagation = (e:React.MouseEvent)=>{
        e.stopPropagation();
    }

    const handleregister = async(e:React.FormEvent)=>{
        e.preventDefault()

        if(password!==confirmPassword){
            alert("passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/register',{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                },
                body:JSON.stringify({
                    email,
                    password,
                    password_confirm:confirmPassword
                })
            })
            const data = await response.json()
            if(response.ok){
                alert(signup?"signup successful":"login successful")
                console.log(signup?"sign up success":"login success",data)
            }
        }catch(error){
            console.error("error during form submission",error)
        }
    }


        const handlelogin = async(e:React.FormEvent)=>{
            e.preventDefault();
            try{
                const response = await fetch('http://localhost:8000/api/login',{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify({
                        email,
                        password
                    })
                })

                const data = await response.json();
                if(response.ok){
                    if(data.token){
                        
                        localStorage.setItem("access_token",data.token)
                        
                        if(data.refresh_token){
                            document.cookie = `refresh_token=${data.refresh_token}; HttpOnly; Secure`;
                        }

                        alert("login successfull");
                        console.log("login successfull",data)
                        window.location.href = '/welcome'
                    }
                }
            }catch(error){
                console.error("error during login",error)
            }
        }

        const handleSubmitForm = (e:React.FormEvent)=>{
            if(signup){
                handleregister(e);
            }else {
                handlelogin(e)
            }
        }


        const onSucess = async(Credentialresponse:any)=>{
            try {
                const response = await fetch("http://localhost:8000/api/google",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json",
                    },
                    body:JSON.stringify({
                        token:Credentialresponse.credential
                    })
                })
                if(response.ok){
                    const data = await response.json();
                    console.log("bakend response",data);

                if(data.token){
                    localStorage.setItem("access_token",data.token);
                    router.push('/welcome');
                }else{
                    console.error("token missing");
                }
                }else {
                    console.error("bakcend error",await response.text())
                }
            }catch(error){
                console.error("error during google login",error)
            }
        }

        
          

        const onError = ()=>{
            console.log("login failed")
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
        <div className='flex flex-row items-center justify-center gap-2  mr-20'>
            <Image src="/logo.png" width={90} height={90} alt='logo' />
            <h1 className='text-3xl text-center justify-center font-semibold'>AIPRO</h1>
        </div>

        <div className='text-center'>
            <p className='mb-3 text-xl font-semibold leading-5 text-slate-900'>
                {signup?'Create your account':'Login to your account'}
            </p>
            <p className='mt-2 text-sm leading-4 text-slate-600'>
            {signup?'Please fill in the details below to sign up':'You must be logged in to perform this action '}
            </p>
        </div>

        <div className='flex w-full items-center gap-2 py-6 text-sm text-slate-600'>
            <div className='h-px w-full bg-slate-200'></div>
        </div>

        <form onSubmit={handleSubmitForm} className='w-full'>
            <label htmlFor='email' className='sr-only mt-2'>Email Adress</label>
            <input name='email' type='email' autoComplete='email' required className='block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-black focus:ring-offset-1' placeholder='Email Adress' value={email} onChange={(e)=>setemail(e.target.value)}/>

            <label htmlFor='password' className='sr-only'>Password</label>
            <input name='password' type='password' autoComplete='current-password' required className='mt-2 block w-full rounded-lg border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1' placeholder='Password' value={password} onChange={(e)=>setpassword(e.target.value)}/>

            {signup && (
                <>
                <label htmlFor='confirm-password' className='sr-only'>
                    Confirm Password
                </label>
                <input name='confirm-password' type='password' autoComplete='current-password' required className='mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1' placeholder='confirm password' value={confirmPassword} onChange={(e)=>setconfirmpassword(e.target.value)}/>
                </>
            )}

                <button type='submit' className='inline-flex w-full items-center justify-center rounded-lg  p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400 mt-2' style={{backgroundColor:"#1976d2"}}>
                    {signup?"Sign Up":"Login"}
                </button>
                <GoogleOAuthProvider  clientId='429897524558-b5k6c8ppsg45su3vf92fllnfpu6q49ui.apps.googleusercontent.com'>
                    <div className='mt-2'>
                    <GoogleLogin onSuccess={onSucess} onError={onError} />
                    </div>
                </GoogleOAuthProvider>
                
        </form>
        <div className='mt-6 text-center text-sm text-slate-600'>
            {signup ?(
                <>
                Already have an account ? {""}
                <a className='font-medium text-[#4285f2]' onClick={(e)=>{stoppropagation(e);toggleform(false)}}>
                    Log in
                </a>
                </>
            ):(
                
                <>
                Don't you have an account? {""}
                <a className='font-medium text-[#4285f4]' onClick={(e)=>{stoppropagation(e);toggleform(true)}}>
                    Sign Up
                </a>
                
                </>
            )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Login
