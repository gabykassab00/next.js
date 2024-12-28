import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Aipro",
  description: "Ai Analyzer for footaball matches", 
};

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
        <Navbar></Navbar>
        <main className="relative overflow-hidden">
        {children}
        </main>
      </body>
    </html>
  );
}
