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
      }
    }
  })



  return (
    <div>
      
    </div>
  )
}

export default page
