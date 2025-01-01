import { FEATURES } from "@/constants";
import Image from "next/image";
import React from "react";
import "../styles/clients.css"
const Clients = () => {
  return (
    <section className="clients-section">
      <div className="clients-container">
        <div className="clients-image-container">
          <Image
            src="/clients.png"
            alt="clients page image"
            width={440}
            height={1000}
            className="clients-phone"
          ></Image>
        </div>
        <div className="clients-content">
            <div className="clients-header">
                <Image 
                src="/hero-logo.png"
                alt="clients page image"
                width={50}
                height={50}
                className="clients-logo "
                ></Image>
                <h2 className="clients-title">Our Clients</h2>
            </div>
            <ul className="clients-features-list ">
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
