"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface TeamStats {
  ballControl: number;
  totalPasses: number;
  averageSpeed: number;
  totalDistance: number;
}

const Team1StatsPage = () => {
  const [team1Data, setTeam1Data] = useState<TeamStats | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTeam1Stats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/stats");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.status}`);
        }

        const data = await response.json();

        const team1FormattedData = {
          ballControl: data.team_ball_control.team1,
          totalPasses: data.total_passes_per_team.team1,
          averageSpeed: Number(data.team_summary.team1.average_speed),
          totalDistance: Number(data.team_summary.team1.total_distance),
        };

        setTeam1Data(team1FormattedData);
      } catch (err: any) {
        console.error("Error fetching team data:", err.message);
      }
    };

    fetchTeam1Stats();
  }, []);

  const handleGetAIResponse = async () => {
    if (!team1Data) {
      alert("No data available to send.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stats: [
            {
              ballControl: team1Data.ballControl,
              totalPasses: team1Data.totalPasses,
              averageSpeed: team1Data.averageSpeed,
              totalDistance: team1Data.totalDistance,
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch AI response: ${response.status}`);
      }

      const data = await response.json();

      if (!data.answer) {
        console.error("API did not return an answer:", data);
        throw new Error("AI response is empty or undefined.");
      }

      router.push(`/recommendation?feedback=${encodeURIComponent(data.answer)}`);
    } catch (err: any) {
      console.error("Error in handleGetAIResponse:", err.message);
    }
  };

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
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Team 1 Stats
        </h1>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Team Ball Control
          </h2>
          <p>
            Team 1 Ball Control: {team1Data?.ballControl.toFixed(2)}%
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Team Summary
          </h2>
          <p>
            <strong>Average Speed:</strong> {team1Data?.averageSpeed.toFixed(2)} km/h
          </p>
          <p>
            <strong>Total Distance:</strong> {team1Data?.totalDistance.toFixed(2)} m
          </p>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Team 1 Total Passes
          </h2>
          <p>{team1Data?.totalPasses}</p>
        </div>

        <button
          onClick={handleGetAIResponse}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Get AI Feedback
        </button>
      </div>
    </div>
  );
};

export default Team1StatsPage;
