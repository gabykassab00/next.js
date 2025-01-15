import Image from "next/image";
import React from "react";

const Update = () => {
  return (
    <div>
      <h2 className="text-center font-semibold text-4xl mt-20">
        Our Latest News & Updates
      </h2>
      <div className="grid grid-cols-3 gap-5 mt-10 ml-8">
        <div className=" shadow-md " style={{ height: "500px",width:"350px" ,marginLeft:"5px" }}>
          <div className="relative w-full" style={{ height: "70%",width:"300px"  }}>
            <Image
              src="/editor.png"
              alt="upload"
              className="object-cover  ml-6"
              layout="fill"
            />
          </div>
          <div className="text-left mt-4">
            <p className="text-2xl font-semibold px-6 " color="blue" style={{color:"#1976d2"}}>
              Introducing AIpro Editor
            </p>
            <p className="text-sm px-6">
              Explore AIpro Editor's latest updates: New Label Window, Project
              Label Preset, and the launch of Editor Premium to elevate your
              video clipping and coding experience!
            </p>
          </div>
        </div>
        <div className=" shadow-md " style={{ height: "500px" ,width:"350px"}}>
          <div className="relative w-full" style={{ height: "70%",width:"300px"  }}>
            <Image
              src="/tactics.jpg"
              alt="upload"
              className="object-cover ml-6"
              layout="fill"
            />
          </div>
          <div className="text-left mt-4 ">
            <p className="text-2xl font-semibold px-6 " color="blue" style={{color:"#1976d2"}}>
            AIpro’s Tactical Feed 
            </p>
            <p className="text-sm px-6">
            See how we’ve imporved our automated tactical feed
            </p>
          </div>
        </div>
        <div className=" shadow-md " style={{ height: "500px",width:"350px" }}>
          <div className="relative w-full" style={{ height: "70%",width:"300px" }}>
            <Image
              src="/dev.png"
              alt="upload"
              className="ml-6"
              layout="fill"
            />
          </div>
          <div className="text-left mt-4">
            <p className="text-2xl font-semibold px-6 " color="blue" style={{color:"#1976d2"}}>
              Introducing AIpro Editor
            </p>
            <p className="text-sm px-6">
            How do we benefit from being able to develop using a server-less platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
