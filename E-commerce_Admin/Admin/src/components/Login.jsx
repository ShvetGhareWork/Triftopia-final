import React, { useState } from "react";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fallback URL in case backEndurl is undefined
  const API_BASE_URL = backEndurl || "http://localhost:7777";

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token); // Store token
        toast.success("Login successful!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@gmail.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="yourPassword"
              required
            />
          </div>
          <button
            className="bg-black text-white mt-2 w-full py-2 px-4 rounded-lg"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
