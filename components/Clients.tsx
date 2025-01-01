import { FEATURES } from "@/constants";
import Image from "next/image";
import React from "react";
import "../styles/clients.css"
const Clients = () => {
  return (
    <section className="clients-section">
      <div className="max-container padding-container relative w-full flex justify-end">
        <div className="flex flex-1 lg:min-h-[900px]">
          <Image
            src="/clients.png"
            alt="clients page image"
            width={440}
            height={1000}
            className="feauture-phone"
          ></Image>
        </div>
        <div className="z-20 flex w-full flex-col lg:w-[60%]">
            <div className="relative">
                <Image 
                src="/hero-logo.png"
                alt="clients page image"
                width={50}
                height={50}
                className="absolute left-[-5px] top-[-28px] w-10 lg:w-[50px] "
                ></Image>
                <h2 className="bold-40 lg:bold-64">Our Clients</h2>
            </div>
            <ul className="mt-10 grid gap-10 md:grid-cols-2 lg:mg-20 lg:gap-20 ">
                {FEATURES.map((feature)=>(
                    <FeatureItem 
                    key={feature.title}
                    title={feature.title} 
                    icon={feature.icon}
                    description={feature.description}
                    />
                ))}
            </ul>
        </div>
      </div>
    </section>
  );
};

type featureItem = {
    title: string;
    icon: string;
    description: string;
}

const FeatureItem =({title,icon,description}:featureItem)=>{
    return (
    <li className="flex w-full flex-1 flex-col items-start">
        <div className="rounded-full p-4 lg:p-7">
            <Image src={icon} alt="map" width={28} height={28}/>
        </div>
        <h2 className="bold-20 lg:bold-32 mt-5 capitalize">
            {title}
        </h2>
        <p className="regular-16 mt-5 bg-white/80 text-gray-30 lg:mt-[30px] lg:bg-none" >
        {description}
        </p>
    </li>
    )
}
export default Clients;
