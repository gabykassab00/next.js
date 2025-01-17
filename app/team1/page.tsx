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
  const [showmodal,setshowmodal]= useState(false);
  const [gamedate,setgamedate] = useState("");
  const [gamename,setgamename] = useState("");

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
          action:"analyze",
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


  const handleSaveStats = async () => {
    if (!team1Data || !gamedate || !gamename) {
      return;
    }
    try {
      const accessToken = localStorage.getItem("access_token"); 
      if (!accessToken) {
        return;
      }
  
      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${accessToken}`); 
  
      const response = await fetch("http://127.0.0.1:8000/api/team", {
        method: "POST",
        headers,
        body: JSON.stringify({
          date: gamedate,
          game: gamename,
          ball_control: team1Data.ballControl,
          distance_covered: team1Data.totalDistance,
          average_speed: team1Data.averageSpeed,
          total_passes: team1Data.totalPasses,
        }),
        credentials: "include", 
      });
  
      setshowmodal(false);
    } catch (err: any) {
      console.error("Error in handleSaveStats:", err.message);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }}
    >
      <button
        onClick={() => router.push("/team")}
        className="absolute top-4 left-4 bg-white  rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100"style={{color:"#1976d2"}}
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
          className="mt-6  text-white py-2 px-20 rounded-lg hover:bg-blue-700" style={{backgroundColor:"#1976d2"}}
        >
          Get AI Feedback
        </button>
        <button
          onClick={() => setshowmodal(true)}
          className="mt-6 ml-6 bg-green-600 text-white py-2 px-28 rounded-lg hover:bg-green-700"
        >
          Save Stats
        </button>
      </div>
      {showmodal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Save Stats</h2>
            <input
              type="text"
              placeholder="Game Date (YYYY-MM-DD)"
              className="border p-2 rounded w-full mb-4"
              value={gamedate}
              onChange={(e) => setgamedate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Game Name"
              className="border p-2 rounded w-full mb-4"
              value={gamename}
              onChange={(e) => setgamename(e.target.value)}
            />
            <button
              onClick={() => setshowmodal(false)}
              className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 mr-2 ml-44"
            >
              Close
            </button>
            <button
              onClick={handleSaveStats}
              className="bg-green-600 text-white py-2 px-4  rounded-lg hover:bg-green-700 "
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team1StatsPage;


