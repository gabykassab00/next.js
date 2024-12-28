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
    <div>
      
    </div>
  )
}

export default Login
