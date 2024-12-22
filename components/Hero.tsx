import Image from "next/image";
import React from "react";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="max-container padding-container flex flex-col gap-20 py-10 pb-32 md:gap-28 lg:py-20 xl:flex-row border-2 border-red-500">
      <div className="hero-map" />
      {/*left */}
      <div className="relative z-20 flex flex-1 flex-col xl:w-1/2">
        <Image
          src="/hero-logo.png"
          alt="football"
          width={50}
          height={50}
          className="absolute left-[-5px] top-[-30px] w-10 lg:w-[50px]"
        />
        <h1 className="bold-52 lg:bold-88 text-blue">AIPRO,<br></br>OFFICIALLY RELEASED</h1>
        <h2>THE SMARTEST AI ANALYZER</h2>
        <p className="regular-16 mt-6 text-gray-30 xl:max-w-[520px] ">
        The smartest Ai Analyzer and chosen by many top professional clubs to capture,
        review,share and analyze your games & training sessions
        </p>
        <div className="flex w-full gap-3 sm:flex-row">
            <Button
            type="button"
            title = 'try software'
            variant="btn_blue"
            ></Button>

        </div>
      </div>
      {/*right */}
      
    </section>
  );
};

export default Hero;
