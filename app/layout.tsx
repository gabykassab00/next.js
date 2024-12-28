"use client";
import Login from "@/components/Login";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

      const [showlogin,setshowlogin] = useState(false);
      const handleshowlogin = ()=>{
        setshowlogin(!showlogin);
      }



  return (
    <html lang="en">
      <body>
        <Navbar handleshowlogin={handleshowlogin}></Navbar>
        <main className="relative overflow-hidden">
        {children}
        {showlogin && (
          <div
          className="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-md backdrop-brightness-75"
          onClick={handleshowlogin}
          >
            <Login handleshowlogin={handleshowlogin}/>
          </div>
        )}
        </main>
      </body>
    </html>
  );
}
