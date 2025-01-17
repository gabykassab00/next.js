"use client";

import { useSearchParams } from "next/navigation";
import React from "react";

const ProgramPage = () => {
  const searchParams = useSearchParams();
  const trainingProgram = searchParams.get("training");

  const formatTrainingProgram = (program:any) => {
    if (!program) return "";
    return program
      .replace(/- /g, "\n- ") 
      .replace(/\.\s*/g, ".\n"); 
  };

  const formattedProgram = formatTrainingProgram(trainingProgram);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }}
    >
      <button
        onClick={() => window.history.back()}
        className="absolute top-4 left-4 bg-white rounded-lg py-2 px-4 shadow-lg hover:bg-blue-100"
        style={{ color: "#1976d2" }}
      >
        Go Back
      </button>
      <div className="bg-white p-6 rounded shadow-lg" style={{ width: "750px" }}>
        <h1 className="text-3xl font-bold mb-6 text-center">Training Program</h1>
        {trainingProgram ? (
          <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-sm whitespace-pre-line">
            <strong>Program:</strong>
            <div>{formattedProgram}</div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No program available</div>
        )}
      </div>
    </div>
  );
};

export default ProgramPage;
