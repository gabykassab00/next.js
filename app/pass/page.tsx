"use client";

import React from 'react'


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


const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page
