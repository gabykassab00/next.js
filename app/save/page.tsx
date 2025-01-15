"use client";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

interface Teamdata {
  date :string;
  game:string;
  ball_control?: number | null ; 
  distance_covered?:number | null ; 
  average_speed?:number | null ; 
  total_passes? : number | null;
}


const Save = () => {

  const [teamdata,setteamdata] = useState<Teamdata[]>([]);
  const [loading,setloading] = useState(true);
  const [error,seterror] = useState<string | null>(null);
  const router = useRouter();

  useEffect(()=>{
    const fetchteamdata = async () =>{
      const accesstoken = localStorage.getItem("access_token");
      if(!accesstoken){
        alert("user is not authenticated. please log in");
        setloading(false);
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/api/save",{
          method:"GET",
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${accesstoken}`
          }
        })

        const responsedata = await response.json()
        if(responsedata?.data){
          setteamdata(responsedata.data);
        }else {
          console.error("unexpected response error",responsedata);
          setteamdata([]);
        }
        setloading(false);
      }catch(err:any){
        console.error("error fetching team data :",err.message);
        seterror(err.message);
        setloading(false);
      }
    }
    fetchteamdata();
  },[])




  return (
    <div>
      
    </div>
  )
}

export default Save
