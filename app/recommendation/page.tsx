"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
  const searchparams = useSearchParams();
  const feedback = searchparams.get("feedback");
  const router = useRouter();

  const handleGetTrainingProgram = async () => {
    if (!feedback) {
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          stats: [feedback],
          action: "training",
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch AI response: ${response.status}`);
      }

      const data = await response.json();

      if (!data.answer) {
        console.error("API did not return a training program:", data);
        throw new Error("AI training program is empty or undefined.");
      }

      router.push(`/program?training=${encodeURIComponent(data.answer)}`);
    } catch (err: any) {
      console.error("Error in handleGetTrainingProgram:", err.message);
    }
  };

  const formatFeedback = (text:any) => {
    if (!text) return "";
    return text
      .replace(/- /g, "\n- ") 
      .replace(/\.\s*/g, ".\n") 
      .trim();
  };

  const formattedFeedback = formatFeedback(feedback);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }}
    >
      <button
        onClick={() => router.push("/character")}
        className="absolute top-4 left-4 bg-white rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100"
        style={{ color: "#1976d2" }}
      >
        Go Back
      </button>
      <div className="bg-white p-6 rounded shadow-lg" style={{ width: "750px" }}>
        <h1 className="text-3xl font-bold mb-6 text-center">AI Game Analyzer</h1>
        {feedback ? (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-sm whitespace-pre-line">
            <strong>Analyzer Feedback:</strong>
            <div>{formattedFeedback}</div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No response available</div>
        )}
        <button
          onClick={handleGetTrainingProgram}
          className="text-white px-4 py-2 rounded w-full hover:bg-blue-600 mt-4"
          style={{ backgroundColor: "#1976d2" }}
        >
          Get Training Program
        </button>
      </div>
    </div>
  );
};

export default Page;
