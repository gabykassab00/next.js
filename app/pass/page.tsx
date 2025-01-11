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
    <div>
      
    </div>
  )
}

export default page
