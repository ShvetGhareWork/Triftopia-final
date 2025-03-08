import React from "react";
import HeroPic from "/Hero-pic.png";

const Hero = () => {
  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto border-2 sm:flex-row border-gray-400 p-4 sm:p-8">
      {/* Hero Left */}
      <div className="sm:w-1/2 flex items-center justify-center py-10 sm:py-0 border-gray-100 text-center sm:text-left">
        <div className="text-[#414141] max-w-md">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLERS</p>
          </div>
          <h1 className="text-4xl sm:text-7xl sm:py-3 leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <p className="font-medium text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[1.9px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      <div className="w-full sm:w-1/2 flex justify-center">
        <img
          src={HeroPic}
          className="w-full max-w-sm sm:max-w-full"
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
