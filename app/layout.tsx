"use client";
import Login from "@/components/Login";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

      const [showlogin,setshowlogin] = useState(false);
      const handleshowlogin = ()=>{
        setshowlogin(!showlogin);
      }

      const pathname = usePathname()

      const hiddenPaths = ['/welcome', '/upload', '/character', '/team', '/player','/player1','/player2','/team1','/team2','/recommendation','/program','/save','/video'];
      const shownavbar = !hiddenPaths.includes(pathname);


  return (
    <html lang="en">
      <body>
       {shownavbar && < Navbar handleshowlogin={handleshowlogin}></Navbar>}
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
