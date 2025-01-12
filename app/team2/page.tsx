"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

interface TeamSummary {
  averageSpeed: number;
  totalDistance: number;
}

interface TeamPassesData {
  team2: {
    ballControl: number;
    totalPasses: number;
    summary: TeamSummary;
  };
}

const Team2Stats = () => {
  const [team2Data, setTeam2Data] = useState<TeamPassesData["team2"] | null>(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchTeam2Data = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/stats");
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();

        const team2FormattedData = {
          ballControl: data.team_ball_control.team2,
          totalPasses: data.total_passes_per_team.team2,
          summary: {
            averageSpeed: Number(data.team_summary.team2.average_speed),
            totalDistance: Number(data.team_summary.team2.total_distance),
          },
        };

        setTeam2Data(team2FormattedData);
      } catch (err: any) {
        console.error(err);
      }
    };

    fetchTeam2Data();
  }, []);



  if (!team2Data) {
    return <div className="text-center">Loading</div>;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }} 
    >
      <button
        onClick={() => router.push("/team")} 
        className="absolute top-4 right-4 bg-white text-blue-700 rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100"
      >
        Go Back
      </button>

      <div className="bg-white p-6 rounded shadow w-4/5 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Team 2 Stats</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Team Ball Control</h2>
          <p>Team 2 Ball Control: {team2Data.ballControl.toFixed(2)}%</p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Team Summary</h2>
          <p>
            <strong>Average Speed:</strong> {team2Data.summary.averageSpeed.toFixed(2)} km/h
          </p>
          <p>
            <strong>Total Distance:</strong> {team2Data.summary.totalDistance.toFixed(2)} m
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Team 2 Total Passes</h2>
          <p>{team2Data.totalPasses}</p>
        </div>
      </div>
    </div>
  );
};

export default Team2Stats;
