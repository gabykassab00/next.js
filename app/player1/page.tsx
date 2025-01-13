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
    const [showmodal,setshowmodal] = useState(false)

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


    const handlegetairesponse = async(playerId:string)=>{
      const selectedplayer = team1PlayerStats.find((player)=>player.playerId === playerId);

      if(!selectedplayer){
        alert("player not found");
        return;
      }

      try {
        
        const response = await fetch("http://127.0.0.1:8000/api/ai",{
          method:"POST",
          headers:{
            'content-type':"application/json",
          },
          body:JSON.stringify({
            stats:[
              {
                averagespeed:selectedplayer.averageSpeed,
                totaldistance :selectedplayer.totalDistance,
                totalpasses :selectedplayer.totalPasses,
              }
            ]
          })
        })

        if(!response.ok){
          throw new Error(`failed to fetch AI response : ${response.status}`)
        }

        const data = await response.json();

        router.push(`/recommendation?feedback=${encodeURIComponent(data.answer)}`)
      } catch(err:any){
        console.error("error in handleairepsonse",err.message);
      }
    }



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
        <button onClick={()=>setshowmodal(true)}
        className='mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700'>
          Get AI Feedback
        </button>
        </div>   
        {showmodal && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center' >
            <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
              <h2 className='text-2xl font-semibold mb-4'>select a player</h2>
              <ul>
                {team1PlayerStats.map((player)=>(
                  <li
                  key={player.playerId}
                  className='cursor-pointer py-2 px-4 hover:bg-gray-200 rounded' onClick={()=>{
                    setshowmodal(false);
                    handlegetairesponse(player.playerId);
                  }}
                  >
                    player{player.playerId}
                  </li>
                ))}
              </ul>
              <button 
              onClick={()=>setshowmodal(false)}
              className='mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400'>
                Close
              </button>
            </div>
          </div>
        )}

    </div>
  )
}

export default page
