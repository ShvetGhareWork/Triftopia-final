import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar.jsx";
import Add from "./pages/Add.jsx";
import List from "./pages/List.jsx";
import Orders from "./pages/Orders.jsx";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Ensure .env contains: VITE_BACKEND_URL=https://localhost:7777
export const backEndurl = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="w-full flex">
            <Sidebar />
            <div className="w-[70%] max-h-auto ml-[max(5vw, 25px)] text-gray-600 text-base">
              <Routes>
                <Route path="/add-product" element={<Add token={token} />} />
                <Route path="/list-product" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
