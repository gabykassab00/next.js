"use client";

import React, { useEffect, useState } from 'react'


interface PasserData{
  passer :string;
  totalPasses:number;
}

interface PlayerStats{
  playerId:string;
  averageSpeed:number;
  totalDistance:number;
}

interface TeamSummary{
  averageSpeed:number;
  totalDistance:number;
}

interface TeamPassesData {
  team1:PasserData[];
  team2:PasserData[];
  totalPassersPerTeam:{
    team1:number;
    team2:number;
  };
  teamBallControl:{
    team1:number;
    team2:number;
  };
  teamStats:{
    team1:PlayerStats[];
    team2:PlayerStats[];
  }
  teamSummary:{
    team1:TeamSummary;
    team2:TeamSummary;
  }
}

const passColumns =[
  {
    key:"passer",
    label:"passer ID",
  },
  {
    key:"totalpasses",
    label:"total passes",
  }
]

const statsColumns = [
  {
    key :"playerid",
    label:"player id"
  },
  {
    key:"averagespeed",
    label:"average speed (km/h)"
  },
  {
    key:"total distance",
    label:"total distance (m)",
  }
]



const page = () => {
  const [passesData,setpassesData] = useState<TeamPassesData | null>(null);
  const [error,setError] = useState("");

  useEffect(()=>{
    const fecthPassesData = async()=>{
      try{
        const response = await fetch("http://127.0.0.1:8000/api/stats");
        if(!response.ok){
          throw new Error(`failed to fetch ${response.status}`);
        }
        const data = await response.json();

        const formattedData:TeamPassesData = {
          team1:Object.entries(data.passers_totals.team1).map(([passer,totalPasses])=>({
            passer,
            totalPasses:Number(totalPasses)
          })),
          team2:Object.entries(data.passers_totals.team2).map(([passer,totalPasses])=>({
            passer,
            totalPasses:Number(totalPasses)
          })),
          totalPassersPerTeam:data.total_passes_per_team,
          teamBallControl:{
            team1:data.team_ball_control.team1,
            team2:data.team_ball_control.team2,
          },
          teamStats:{
            team1:Object.entries(data.team_stats.team1).map(([playerId,stats])=>{
              const typedStats = stats as {
                average_speed :number;
                total_distance:number;
              };
              return {
                playerId,
                averageSpeed:typedStats.average_speed,
                totalDistance:typedStats.total_distance,
              }
            }),
            team2:Object.entries(data.team_stats.team2).map(([playerId,stats])=>{
              const typedStats = stats as {
                average_speed:number;
                total_distance:number;
              }
              return {
                playerId,
                averageSpeed:typedStats.average_speed,
                totalDistance:typedStats.total_distance,
              }
            })
          },
          teamSummary:{
            team1:{
              averageSpeed:Number(data.team_summary.team1.average_speed),
              totalDistance:Number(data.team_summary.team1.total_distance),
            },
            team2:{
              averageSpeed:Number(data.team_summary.team2.average_speed),
              totalDistance:Number(data.team_summary.team2.total_distance),
            }
          }
        }

        setpassesData(formattedData)
      }catch(error){
        setError("failed to fetch data");
        console.error(error)
      }
    }
    fecthPassesData();
  },[]);




  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6 text-center text-gray-700'>
        Team Passes and Stats
      </h1>
      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-600'>
          team ball control
        </h2>
        <p>team1 : {passesData.teamBallControl.team1.toFixed(2)}%</p>
        <p>team2 : {passesData?.teamBallControl.team2.toFixed(2)}%</p>
      </div>

      <div className='mb-6'>
        <h2 className='text-2xl font-semibold mb-4 text-gray-600'>
          Team Summary
        </h2>
        <p>
          <strong>team1 :</strong>average speed:{" "}
          {passesData?.teamSummary.team1.averageSpeed.toFixed(2)}km/h,total
          distance :{passesData?.teamSummary.team1.totalDistance.toFixed(2)}m
        </p>
        <p>
          <strong>team 2 :</strong> average speed:{ " "}
          {passesData?.teamSummary.team2.averageSpeed.toFixed(2)} km/h,total 
          distance:{passesData?.teamSummary.team2.totalDistance.toFixed(2)} m 
        </p>
      </div>

      <h2 className='text-2xl font-semibold mb-4 text-gray-600'>team 1 passes</h2>
      <div className='overflow-x-auto mb-6'>
        <table className='min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg'>
          <thead>
            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
              {passColumns.map((column)=>(
                <th key={column.key} className='py-3 px-6 text-left'>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {passesData?.team1.map((row,index)=>(
              <tr key={index} className='border-b border-gray-200 hover:bg-gray-100'>
                <td className='py-3 px-6 text-left'>{row.passer}</td>
                <td className='py-3 px-6 text-left'>{row.totalPasses}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className='mt-2 font-semibold'>
          total team passes :{passesData?.totalPassersPerTeam.team1}
        </p>
      </div>
      
    </div>
  )
}

export default page
