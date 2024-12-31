"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 
import Button from "@/components/Button";
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
    
  }

  if (!authenticated) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h1>Welcome, Authenticated User!</h1>
      <button style={{backgroundColor:"#ff4d4d",}} >log out</button>
    </div>
  );
};

export default WelcomePage;

