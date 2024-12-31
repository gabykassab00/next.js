"use client";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const Page = () => {
  const[authenticated,setauthenticated] = useState(false);
  const router = useRouter();

    useEffect(()=>{
      const authentication = async ()=>{
        try {
          const token = localStorage.getItem("acess_token");
          if(!token) throw new Error("token not found");

          const response = await fetch("http://localhost:8000/api/user",{
            method:"GET",
            headers:{
              Authorization: `Bearer ${token}`
            }
          })

            if(response.ok){
              const data = await response.json()
              setauthenticated(true);
            }else {
              throw new Error("not authenticated");
            }

        }catch(error){
          setauthenticated(false);
          router.push("/")
        }
      }
    })

  return (
    <div>
      
    </div>
  )
}

export default Page
