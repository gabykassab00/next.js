"use client";
import { useRouter } from 'next/navigation';
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
    <div className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>
      <button 
      onClick={()=>router.push("/welcome")}
      className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100'>
        Go Back
      </button>

      <div className='bg-white p-6 rounded shadow w-4/5 max-w-6xl'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-700'>
        Team Data
      </h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Date</th>
              <th className='py-3 px-6 text-left'>Game</th>
              <th className='py-3 px-6 text-left'>Ball control(%)</th>
              <th className='py-3 px-6 text-left'>Distance Covered (m)</th>
              <th className='py-3 px-6 text-left'>Average Speed (km/h)</th>
              <th className='py-3 px-6 text-left'>Total Passes</th>    
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {teamdata.length > 0 ? (
              teamdata.map((data,index)=>(
                <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
                  <td className='py-3 px-6 text-left '>{data.date || "N/A"}</td>
                  <td className='py-3 px-6 text-left '>{data.game || "N/A"}</td>
                  <td className='py-3 px-6 text-left '>
                    {data.ball_control !== null && data.ball_control !== undefined ? `${data.ball_control.toFixed(2)}%` : "N/A"}
                    </td>
                    <td className='py-3 px-6 text-left '>
                    {data.distance_covered !== null && data.distance_covered !== undefined ? `${data.distance_covered.toFixed(2)}%` : "N/A"}
                    </td>
                    <td className='py-3 px-6 text-left '>
                    {data.average_speed !== null && data.average_speed !== undefined ? `${data.average_speed.toFixed(2)}%` : "N/A"}
                    </td>
                    <td className='py-3 px-6 text-left '>
                    {data.total_passes !== null && data.total_passes !== undefined ? `${data.total_passes.toFixed(2)}%` : "N/A"}
                    </td>
                </tr>
              ))
            ):(
              <tr>
                <td colSpan={6} className='py-3 px-6 text-center text-gray-500'>
                  No Data Availble
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default Save
