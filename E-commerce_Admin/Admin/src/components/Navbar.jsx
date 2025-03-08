import React from "react";
// import logo from "/adminlogo.png";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-[200px]" src="" alt="" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:py-2 sm:px-7 rounded-full text-xs sm:text-sm"
      >
        LogOut
      </button>
    </div>
  );
};

export default Navbar;
