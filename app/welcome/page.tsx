"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import Image from "next/image";
const WelcomePage = () => {
  const [authenticated, setAuthenticated] = useState(false);
  // const [file,setfile] = useState(null)
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
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{backgroundImage:"url('/background-pic.jpg')"}}>

      <button className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600" onClick={handlelogout}>Logout</button>
    <div className="bg-white rounded-lg shadow-lg w-96 p-6">
      <div className="bg-white-100 rounded-lg p-6 text-center">
        <div className="mb-4">
          <Image src="/logo.png" alt="logo" width={50} height={50} className="mx-auto"/>
         </div>
         <h1 className=" text-2xl font-bold mb-2 ">AIPRO</h1>
         <p className=" mb-2" style={{color:"#1976d2"}}>
         AIPRO Football Analyzer For in-Depth Match Insights
         </p>
         <p className="text-gray-700 mb-6">Premium AI Analyzer Tool</p>

         <div className="space-y-4">
          <button className=" text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600" onClick={()=>router.push('/save')} style={{backgroundColor:"#1976d2"}}>
            Saved Stats
          </button>
          <p className="text-gray-500">Or</p>
          <button className=" text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600" onClick={()=>router.push("/upload")} style={{backgroundColor:"#1976d2"}}>
            Upload File
          </button>
         </div>
      </div>
    </div>

    </div>
    </>
  );
};

export default WelcomePage;

