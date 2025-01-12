"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface TeamSummary{
    averageSpeed:number;
    totalDistance:number;
}

interface TeamPassesData{
    team1:{
        ballControl : number;
        totalPasses :number;
        summary :TeamSummary;
    }
}

const page = () => {
    const [team1Data,setTeam1Data] = useState<TeamPassesData["team1"] | null >(null);
    const router = useRouter()

    useEffect(()=>{
        const fetchTeam1Data = async () =>{
            try {
                const response = await fetch("http://127.0.0.1:8000/api/stats");
                if(!response.ok){
                    throw new Error(`failed to fetch ${response.status}`)
                }
                const data = await response.json()
                   
                const team1FormattedData = {
                    ballControl : data.team_ball_control.team1,
                    totalPasses:data.total_passes_per_team.team1,
                    summary :{
                        averageSpeed:Number(data.team_summary.team1.average_speed),
                        totalDistance:Number(data.team_summary.team1.total_distance),
                    }
                }
                setTeam1Data(team1FormattedData);

            }catch(err:any){
                console.error(err)
            }
        }
        fetchTeam1Data()
    },[])


  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')" }}>
        <button onClick={()=>router.push("/team")} className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100'>
           Go Back 
        </button>
      
        <div className='bg-white p-6 rounded shadow w-4/5 max-w-2xl'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-700'>
        team 1 stats
        </h1>

        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-600'>team ball control</h2>
            <p>team 1 ball control:{team1Data?.ballControl.toFixed(2)}%</p>
        </div>

        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-600'>team summary</h2>
            <p>
                <strong>average speed:</strong> {team1Data?.summary.averageSpeed.toFixed(2)} km/h
            </p>
            <p>
                <strong>total distance:</strong> {team1Data?.summary.totalDistance.toFixed(2)} m 
            </p>
        </div>

        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-4 text-gray-600'>team 1 total passes</h2>
            <p>{team1Data?.totalPasses}</p>
        </div>

        </div>

    </div>
  )
}

export default page
