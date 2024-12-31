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
        }
      }
    })

  return (
    <div>
      
    </div>
  )
}

export default Page
