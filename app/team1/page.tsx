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
    <div>
      
    </div>
  )
}

export default page
