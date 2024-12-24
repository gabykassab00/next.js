import Image from "next/image";
import React from "react";

const Workflow = () => {
  return (
    <div className="container">
      <h4 className="uppercase font-semibold text-center mb-1 text-red-700-xl">
        {`Cameras,Analysis Software and Data for sport`}
      </h4>
      <h2 className="text-center font-semibold text-5xl mt-5">
        Designed to improve any team’s workflow
      </h2>
      <div className="grid grid-cols-4 gap-5 mt-10 ">
        <div
          className="flex shadow-md h-96  flex-col0"
          style={{ height: "500px" }}
        >
          <div className="relative w-full ">
            <Image
              src={"/upload.jpg"}
              alt="upload"
              className="object-cover"
              layout="fill"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/upload.svg"
                alt="Upload Icon"
                className="w-16 h-16 filter invert "
              />
            </div>
          </div>
        </div>
        <div
          className="flex shadow-md h-96  flex-col0"
          style={{ height: "500px" }}
        >
          <div className="relative w-full h-full">
            <Image
              src={"/share.avif"}
              alt="upload"
              className="object-fill"
              layout="fill"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/share.svg"
                alt="Upload Icon"
                className="w-16 h-16 filter invert "
              />
            </div>
          </div>
        </div>
        <div
          className="flex shadow-md h-96  flex-col0"
          style={{ height: "500px" }}
        >
          <div className="relative w-full h-full">
            <Image
              src={"/analyze.avif"}
              alt="upload"
              className="object-fill"
              layout="fill"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/analyze.svg"
                alt="Upload Icon"
                className="w-16 h-16 filter invert "
              />
            </div>
          </div>
        </div>
        <div
          className="flex shadow-md h-96  flex-col0"
          style={{ height: "500px" }}
        >
          <div className="relative w-full h-full">
            <Image
              src={"/improve.jpg"}
              alt="upload"
              className="object-fill"
              layout="fill"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflow;
