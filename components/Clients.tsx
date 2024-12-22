import { FEATURES } from "@/constants";
import Image from "next/image";
import React from "react";

const Clients = () => {
  return (
    <section className="border-2 border-red-500 flex-col flexCenter overflow-hidden bg-feature-bg bg-center bg-no-repeat py-24">
      <div className="max-container padding-container relative w-full justify-end">
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
            <ul>
                {FEATURES.map((feature)=>(
                    <FeatureItem 
                    key={feature.title}
                    title={feature.title} 
                    icon={feature.icon}
                    variant={feature.variant}
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
    variant: string;
    description: string;
}

const FeatureItem =({title,icon,variant,description}:featureItem)=>{
    return (
    <li className="flex w-full flex-1 flex-col items-start">
        <div className="rounded-full p-4 lg:p-7">
            <Image src={icon} alt="map" width={28} height={28}/>
        </div>

            {title}
        
    </li>
    )
}
export default Clients;
