"use client";
import { useRouter } from 'next/navigation';
import React from 'react';

const Page = () => {
  const router = useRouter();
  const videoUrl = 'http://127.0.0.1:8000/ML/output_videos/final.mp4';

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/background-pic.jpg')" }}
    >
      <button
        onClick={() => router.push('/character')}
        className="absolute top-4 left-4 bg-white rounded-lg py-2 px-4"
        style={{ color: "#1976d2" }}
      >
        Go Back
      </button>

      <div className="bg-white p-8 rounded shadow w-[700px] opacity-90">
        <h1 className="text-center text-xl font-bold mb-6">Video Result</h1>
        
        {/* Video Player */}
        <div className="mb-6 flex items-center justify-center">
          <video
            controls
            className="rounded"
            style={{ width: "700px", height: "400px" }}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => router.push("/team1")}
            className="text-white py-2 px-8 rounded hover:bg-blue-600"
            style={{ backgroundColor: "#1976d2" }}
          >
            Get Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
