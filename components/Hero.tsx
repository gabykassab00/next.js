import Image from "next/image";
import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row ">
      <div className="hero-map" />
      {/*left */}
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/hero-logo.png"
          alt="football"
          width={50}
          height={50}
          className="absolute left-[+30px] top-[-30px] w-10 lg:w-[30px] mt-3"
        />
        <h1 className="bold-52 lg:bold-80 " style={{color:"#1976d2"}}>AIPRO,<br></br>OFFICIALLY RELEASED</h1>
        <h2 className="bold-20">THE SMARTEST AI ANALYZER</h2>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px] ">
        The smartest Ai Analyzer and chosen by many top professional clubs to capture,
        review,share and analyze your games & training sessions
        </p>
        <div className="flex w-full gap-3 sm:flex-row mt-2 text-center ">
            <Button
            type="button"
            title = 'Try Software'
            variant="btn_blue"
            ></Button>

        </div>
      </div>
      {/*right */}
      <div className="relative flex flex-1 items-start border-2 rounded-lg overflow-hidden">
      <video autoPlay loop muted controls style={{ width: '100%', height: '100%' ,objectFit: 'fill'}} >
        <source src="hero-video.mp4" type="video/mp4" />
      </video>
      </div>
    </section>
  );
};

export default Hero;
