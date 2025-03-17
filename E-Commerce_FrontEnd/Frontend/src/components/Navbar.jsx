import React, { useState, useContext } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Search from "/Search.svg";
import user from "/user.png";
import Cart from "/shopping-cart.svg";
import Logo from "/Logo.png";
import Searchbar from "./Searchbar";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react"; // Import icons for the mobile menu

const Navbar = () => {
  const { SetShowSearch, GetcartCount, navigate, token, setToken, CartItems } =
    useContext(ShopContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const Logout = () => {
    navigate("/login");
    toast.success("Logged out Successfully");
    localStorage.removeItem("token");
    setToken("");
    CartItems({});
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 md:px-10 py-5 font-bold relative">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            className="h-10 md:h-12 w-auto"
            src={Logo}
            alt="Triftopia Logo"
          />
        </NavLink>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex gap-12 font-light text-[17px] text-gray-700 bg-white md:bg-transparent shadow-md md:shadow-none p-5 md:p-0 transition-transform duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden md:flex"
          }`}
        >
          {["home", "limited-access", "antique-access", "contact"].map(
            (route) => (
              <NavLink
                key={route}
                to={`/${route}`}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 transition-all ${
                    isActive ? "font-semibold text-black" : "text-gray-700"
                  }`
                }
                onClick={() => setMenuOpen(false)}
              >
                <p className="capitalize">{route.replace("-", " ")}</p>
                <div
                  className={`w-full h-[2px] mt-1 transition-all ${
                    location.pathname === `/${route}` ||
                    (route === "home" && location.pathname === "/")
                      ? "bg-black"
                      : "bg-transparent"
                  }`}
                />
              </NavLink>
            )
          )}
        </ul>

        {/* Icons Section */}
        <div className="hidden md:flex items-center gap-6">
          <img
            onClick={() => SetShowSearch(true)}
            src={Search}
            className="w-5 cursor-pointer"
            alt="Search"
          />
          <div className="relative group">
            <img
              onClick={() => (token ? null : navigate("/login"))}
              src={user}
              className="w-5 cursor-pointer"
              alt="User"
            />

            {/* Dropdown */}
            {token && (
              <div className="hidden group-hover:block absolute right-0 bg-white text-gray-400 rounded-2xl shadow-lg py-3 px-4 w-40">
                <p className="cursor-pointer hover:text-black p-2 rounded">
                  My Profile
                </p>
                <hr className="border-gray-700" />
                <p
                  onClick={() => navigate("/orders")} //navigation
                  className="cursor-pointer hover:text-black p-2 rounded"
                >
                  Orders
                </p>
                <hr className="border-gray-700" />
                <p
                  onClick={() => Logout()}
                  className="cursor-pointer hover:text-black p-2 rounded"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
          <Link to="/cart" className="relative">
            <img src={Cart} className="w-5" alt="Cart" />
            <p className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {GetcartCount()}
            </p>
          </Link>
        </div>
      </div>
      <Searchbar />
    </>
  );
};

export default Navbar;
