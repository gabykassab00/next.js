import React, { useState } from 'react'

const Login = ({handleshowlogin}:{handleshowlogin:()=>void}) => {


    const[signup,setsignup] = useState(false);

    const toggleform = (tosignup:boolean)=>{
        setsignup(tosignup);
    }

    const stoppropagation = (e:React.MouseEvent)=>{
        e.stopPropagation();
    }















  return (
    <div>
      
    </div>
  )
}

export default Login
