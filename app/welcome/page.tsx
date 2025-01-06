"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
const WelcomePage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("Token not found");

        const response = await fetch("http://localhost:8000/api/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAuthenticated(true); 
        } else {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        setAuthenticated(false);
        router.push("/"); 
      }
    };

    checkAuthentication();
  }, [router]);

  const handlelogout = async()=>{
    try {
      const response = await fetch("http://localhost:8000/api/logout",{
        method:"POST",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "content-type":"application/json"
        }
      })

      if(response.ok){
        localStorage.removeItem("access_token");
        router.push("/");
      }
        else {
          throw new Error("logout failed");
        }
    }catch(error){
      console.error("error during logout",error);
      alert("an error occured while logging out")
    }
  }

  if (!authenticated) {
    return <div>Loading...</div>; 
  }

  return (
    <>
    <div>
      <h1>Welcome, Authenticated User!</h1>
      <button style={{backgroundColor:"#ff4d4d",}} onClick={handlelogout}>log out</button>
    </div>
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage:"url('/background-pic.jpg')"}}>

    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
      <div className="bg-gray-100 rounded-lg p-6 text-center">
        <div className="mb-4">
          <Image src="/logo.png" alt="logo" width={50} height={50} className="mx-auto"/>
         </div>
         
      </div>
    </div>

    </div>
    </>
  );
};

export default WelcomePage;

