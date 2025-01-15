"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface PlayerStats {
  playerId: string;
  averageSpeed: number;
  totalDistance: number;
  totalPasses: number;
}

const Player1StatsPage = () => {
  const [team1PlayerStats, setTeam1PlayerStats] = useState<PlayerStats[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [saveStatsModal, setSaveStatsModal] = useState(false);
  const [selectedPlayerid,setselectedplayerid] = useState<string | null>(null)
  const [gameDate, setGameDate] = useState("");
  const [gameName, setGameName] = useState("");
  const [actiontype,setactiontype] = useState<"aifeedback" |"savestats" | null >(null)
  const router = useRouter();

  useEffect(() => {
    const fetchTeam1PlayerStats = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/stats");
        if (!response.ok) {
          throw new Error(`Failed to fetch ${response.status}`);
        }
        const data = await response.json();

        const team1PlayerStatsFormatted = Object.entries(data.team_stats.team1).map(
          ([playerId, stats]) => {
            const typedStats = stats as {
              average_speed: number;
              total_distance: number;
            };

            return {
              playerId,
              averageSpeed: typedStats.average_speed,
              totalDistance: typedStats.total_distance,
              totalPasses: data.passers_totals.team1[playerId],
            };
          }
        );
        setTeam1PlayerStats(team1PlayerStatsFormatted);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchTeam1PlayerStats();
  }, []);

  const handleGetAIResponse = async (playerId: string) => {
    const selectedPlayer = team1PlayerStats.find((player) => player.playerId === playerId);
  
    if (!selectedPlayer) {
      alert("Player not found.");
      return;
    }
  
    try {
      console.log("Sending player data to AI API:", selectedPlayer);
  
      const response = await fetch("http://127.0.0.1:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stats: [
            {
              averageSpeed: selectedPlayer.averageSpeed,
              totalDistance: selectedPlayer.totalDistance,
              totalPasses: selectedPlayer.totalPasses,
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
    if (!gameDate || !gameName || !selectedPlayerid) {
      alert("Please fill out all fields before saving.");
      return;
    }

    const selectedPlayer = team1PlayerStats.find(
      (player) => player.playerId === selectedPlayerid
    );

    if (!selectedPlayer) {
      alert("Player not found.");
      return;
    }

    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        alert("User is not authenticated. Please log in.");
        return;
      }

      const headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Authorization", `Bearer ${accessToken}`);

      const response = await fetch("http://127.0.0.1:8000/api/team", {
        method: "POST",
        headers,
        body: JSON.stringify({
          date: gameDate,
          game: gameName,
          ball_control: 0,
          distance_covered: selectedPlayer.totalDistance,
          average_speed: selectedPlayer.averageSpeed,
          total_passes: selectedPlayer.totalPasses,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`Failed to save stats: ${response.status}`);
      }

      alert("Stats saved successfully!");
      setSaveStatsModal(false);
    } catch (err: any) {
      console.error("Error in handleSaveStats:", err.message);
      alert("Failed to save stats.");
    }
  };

  const handleplayerselection = (playerID:string)=>{
    setselectedplayerid(playerID);
    setShowModal(false);
    
    if(actiontype ==="aifeedback"){
      handleGetAIResponse(playerID);
    }else if (actiontype ==="savestats"){
      setSaveStatsModal(true)
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }}
    >
      <button
        onClick={() => router.push("/player")}
        className="absolute top-4 left-4 bg-white rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100" style={{color:"#1976d2"}}
      >
        Go Back
      </button>

      <div className="bg-white p-6 rounded shadow w-4/5 max-w-4xl ">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">
          Team 1 Player Stats
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left text-sm">Player ID</th>
                <th className="py-3 px-6 text-left text-sm">Average Speed (km/h)</th>
                <th className="py-3 px-6 text-left text-sm">Total Distance (m)</th>
                <th className="py-3 px-6 text-left text-sm">Total Passes</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {team1PlayerStats.map((player, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-1 px-6 text-left text-xs">{player.playerId}</td>
                  <td className="py-1 px-6 text-left text-xs">
                    {player.averageSpeed.toFixed(2)}
                  </td>
                  <td className="py-1 px-6 text-left">
                    {player.totalDistance.toFixed(2)}
                  </td>
                  <td className="py-1 px-6 text-left">{player.totalPasses}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button
          onClick={() =>{
            setactiontype("aifeedback")
            setShowModal(true)}}
          className="mt-6  text-white py-2 px-28 rounded-lg hover:bg-blue-700" style={{backgroundColor:'#1976d2'}}
        >
          Get AI Feedback
        </button>
        <button
          onClick={() => {
            setactiontype("savestats")
            setShowModal(true)}}
          className="mt-6 bg-green-600 text-white py-2 px-32 ml-32 rounded-lg hover:bg-green-700"
        >
          Save Stats
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Select a Player</h2>
            <ul>
              {team1PlayerStats.map((player) => (
                <li
                  key={player.playerId}
                  className="cursor-pointer py-2 px-4 hover:bg-gray-200 rounded text-xs"
                  onClick={() => {
                    handleplayerselection(player.playerId)
                  }}
                >
                  Player {player.playerId}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {saveStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 ">
            <h2 className="text-xl font-semibold mb-4">Save Team Stats</h2>
            <input
              type="text"
              placeholder="Game Date (YYYY-MM-DD)"
              className="border p-2 rounded w-full mb-4"
              value={gameDate}
              onChange={(e) => setGameDate(e.target.value)}
            />
            <input
              type="text"
              placeholder="Game Name"
              className="border p-2 rounded w-full mb-4"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
            />
            <button
              onClick={handleSaveStats}
              className="bg-green-600 text-white py-2 px-4  rounded-lg hover:bg-green-700 mr-2"
            >
              Save
            </button>
            <button
              onClick={() => setSaveStatsModal(false)}
              className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Player1StatsPage;

