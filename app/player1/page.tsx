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
    <div className='min-h-screen flex flex-col items-center justify-center bg-cover bg-center' style={{backgroundImage:"url('/background-pic.jpg')"}}>
        <button onClick={()=>router.push('/player')} className='absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100'>
            Go Back
        </button>

        <div className='bg-white p-6 rounded shadow w-4/5 max-w-4xl'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-700'>
            team 1 player stats
        </h1>

        <div className='overflow-x-auto'>
            <table className='min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg'>
                <thead>
                    <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                        <th className='py-3 px-6 text-left'>Player ID</th>
                        <th className='py-3 px-6 text-left'>Average Speed (km/h)</th>
                        <th className='py-3 px-6 text-left'>total distance (m)</th>
                        <th className='py-3 px-6 text-left'>total passes</th>

                    </tr>
                </thead>
                <tbody className='text-gray-600 text-sm font-light '>
                    {team1PlayerStats.map((player,index)=>(
                        <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
                            <td className='py-3 px-6 text-left'>{player.playerId}</td>
                            <td className='py-3 px-6 text-left'>{player.averageSpeed.toFixed(2)}</td>
                            <td className='py-3 px-6 text-left'>{player.totalDistance.toFixed(2)}</td>
                            <td className='py-3 px-6 text-left'>{player.totalPasses}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>      
    </div>
  )
}

export default page
