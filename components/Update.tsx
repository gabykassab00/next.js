import Image from "next/image";
import React from "react";

const Update = () => {
  return (
    <div>
      <h2 className="text-center font-semibold text-5xl mt-5">
        Our Latest News & Updates 
      </h2>
      <div className="grid grid-cols-3 gap-5 mt-10">
        <div className="flex shadow-md h-96 flex-col0" style={{height:"500px"}}>
            <div className="relative w-full">
                <Image src="/editor.png" alt="upload" className="object-cover" layout="fill"/>
            </div>
        </div>

      </div>
    </div>
  );
};

export default Update;
