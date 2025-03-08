import React from "react";
import Logo from "/weblogo.png";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className=" py-10 px-5">
      {/* Main Footer Section */}
      <div className="flex flex-col sm:grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-14 items-center sm:items-start my-10">
        {/* Logo & Description */}
        <div className="text-center sm:text-left">
          <img
            src={Logo}
            alt="Triftopia Logo"
            className="w-24 mx-auto sm:mx-0 mb-5"
          />
          <p className="max-w-[400px] text-gray-600 text-sm">
            At Triftopia, we bring you a curated collection of rare, vintage,
            and limited-edition treasures. From collectibles to unique fashion
            pieces, explore a world of exclusivity with us.
          </p>
        </div>

        {/* Company Links */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold mb-3">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-sm">
            <li>
              <NavLink to="/home" className="hover:text-gray-900">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="hover:text-gray-900">
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="hover:text-gray-900">
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="hover:text-gray-900">
                Cart
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="text-center sm:text-left">
          <p className="text-lg font-semibold mb-3">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600 text-sm">
            <li className="hover:text-gray-900">📞 +91-72498-32504</li>
            <li className="hover:text-gray-900">📧 support@triftopia.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center">
        <hr className="w-4/5 mx-auto border-gray-300" />
        <p className="py-5 text-sm font-medium text-gray-600">
          &copy; 2025 Triftopia - All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
