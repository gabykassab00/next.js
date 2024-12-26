import Image from "next/image";
import React from "react";

const Update = () => {
  return (
    <div>
      <h2 className="text-center font-semibold text-5xl mt-5">
        Our Latest News & Updates
      </h2>
      <div className="grid grid-cols-3 gap-5 mt-10">
        <div className=" shadow-md " style={{ height: "500px" }}>
          <div className="relative w-full" style={{ height: "70%" }}>
            <Image
              src="/editor.png"
              alt="upload"
              className="object-cover"
              layout="fill"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-semibold text-blue-500" color="blue">
              Introducing AIpro Editor
            </p>
            <p className="text-sm">
              Explore AIpro Editor's latest updates: New Label Window, Project
              Label Preset, and the launch of Editor Premium to elevate your
              video clipping and coding experience!
            </p>
          </div>
        </div>
        <div className=" shadow-md " style={{ height: "500px" }}>
          <div className="relative w-full" style={{ height: "70%" }}>
            <Image
              src="/tactics.jpg"
              alt="upload"
              className="object-cover"
              layout="fill"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-semibold text-blue-500" color="blue">
            AIpro’s Tactical Feed 
            </p>
            <p className="text-sm">
            See how we’ve imporved our automated tactical feed
            </p>
          </div>
        </div>
        <div className=" shadow-md " style={{ height: "500px" }}>
          <div className="relative w-full" style={{ height: "70%" }}>
            <Image
              src="/dev.png"
              alt="upload"
              className=""
              layout="fill"
            />
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-semibold text-blue-500" color="blue">
              Introducing AIpro Editor
            </p>
            <p className="text-sm">
            How do we benefit from being able to develop using a server-less platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
