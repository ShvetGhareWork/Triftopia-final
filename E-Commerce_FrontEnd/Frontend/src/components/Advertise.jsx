import React from "react";
import Button from "./Button";
import Ad from "/Add.jpg";
import "../Advertise.css";

const Advertise = ({ text1, text2 }) => {
  return (
    <div className="h-auto w-full flex items-center justify-center mt-10 mb-4 px-4 sm:px-0">
      <div className="ola w-full sm:w-4/5 rounded-4xl h-auto sm:h-56 text-white p-5 sm:p-0">
        <h1 className="m-2 sm:m-5 sm:ml-9 text-3xl sm:text-5xl">{text1}</h1>
        <p className="m-2 sm:ml-10 text-sm sm:text-base">{text2}</p>
        <div className="flex items-center justify-center sm:justify-end sm:mr-10 sm:mb-10">
          <Button title="REGISTER NOW!" />
        </div>
      </div>
    </div>
  );
};

export default Advertise;
