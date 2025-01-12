"use client";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface PlayerStats {
    playerId:string;
    averageSpeed:number;
    totalDistance:number;
    totalPasses:number;
}

const page = () => {

    const [team1PlayerStats,setTeam1PlayerStats] = useState<PlayerStats[]>([])
    const router = useRouter()

    useEffect(()=>{
        const fetchTeam1PlayerStats = async()=>{
            try {
                const response = await fetch("http://127.0.0.1:8000/api/stats")
                if (!response.ok){
                    throw new Error(`failed to fetch ${response.status}`)
                }
                const data = await response.json()

                const team1PlayerStatsFormatted = Object.entries(data.team_stats.team1).map(
                    ([playerId,stats])=>{
                        const typedStats = stats as {
                            average_speed : number ;
                            total_distance : number;
                        }

                        return {
                            playerId,
                            averageSpeed:typedStats.average_speed,
                            totalDistance :typedStats.total_distance,
                            totalPasses:data.passer_totals.team1[playerId]
                        }
                    }
                )
                setTeam1PlayerStats(team1PlayerStatsFormatted);
            } catch(err:any){
                console.error(err)
            }
        }
        fetchTeam1PlayerStats();
    },[])

  return (
    <div>
      
    </div>
  )
}

export default page
