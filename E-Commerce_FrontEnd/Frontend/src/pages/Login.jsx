import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const Login = () => {
  const [currentState, SetCurrentState] = useState("Login");
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const { token, setToken, navigate, backEndURL } = useContext(ShopContext);

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (currentState === "Sign Up") {
        // Resigtration API
        const response = await axios.post(backEndURL + "/api/user/register", {
          name: Name,
          email: Email,
          password: Password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          // localStorage.setItem("token", response.data.token);
          toast.success(response.data.message);
        } else {
          console.log(response.data.message);
          toast.error(response.data.message);
        }
      } else {
        // Login Api
        const response = await axios.post(backEndURL + "/api/user/login", {
          email: Email,
          password: Password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
        } else {
          console.log(response.data);
          toast.error(response.data.message);
        }
      }
      // console.log(Name, Email, Password);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);
  return (
    <>
      <Navbar />
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col items-center w-[90%] pb-30 sm:max-w-96 m-auto gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="prata-regular text-3xl">{currentState}</p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>
        {currentState === "Login" ? (
          ""
        ) : (
          <input
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => SetName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-800"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => SetEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-800"
        />
        <input
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => SetPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-800"
        />
        <div className="w-full flex justify-between text-sm mt-[-8px]">
          <p className="cursor-pointer">Forgot Password?</p>
          {currentState === "Login" ? (
            <p
              className="cursor-pointer"
              onClick={() => SetCurrentState("Sign Up")}
            >
              Create Account
            </p>
          ) : (
            <p
              className="cursor-pointer"
              onClick={() => SetCurrentState("Login")}
            >
              Login Here
            </p>
          )}
        </div>
        <button className="bg-black text-white font-light px-8 py-2 mt-4">
          {currentState === "Sign Up" ? "Sign Up" : "Sign In"}
        </button>
      </form>
      <Footer />
    </>
  );
};

export default Login;
