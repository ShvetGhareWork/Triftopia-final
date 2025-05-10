import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";

export default function Order() {
  const { backEndURL, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);

  const LoadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }

      const response = await axios.post(
        backEndURL + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let AllOrderItems = [];
        response.data.userOrders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["paymentMethod"] = order.payment_method ?? "undefined";
            item["date"] = order.date;
            AllOrderItems.push(item);
          });
        });
        setOrders(AllOrderItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    LoadOrderData();
  }, [token]);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const statuses = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  return (
    <>
      <Navbar />
      <motion.div
        className="min-h-screen flex items-center justify-center bg-gray-100 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full max-w-4xl p-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-center mb-4 mt-4">
            Your Orders
          </h1>
          {orders.length === 0 ? (
            <motion.div
              className="text-center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg mb-4">No orders yet.</p>
              <Link to="/shop" className="text-blue-500 hover:underline">
                Go to Shop
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
              }}
            >
              {orders.map((order, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
                    <img
                      src={order.image}
                      alt={order.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        {order.name}
                      </h2>
                      <p className="text-gray-600">
                        Date: {formatDate(order.date)}
                      </p>
                      <p className="text-gray-600">
                        Total: ₹{order.price * order.quantity}
                      </p>
                      <p className="text-gray-600">
                        Payment Method: {order.paymentMethod}
                      </p>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium mb-2">Status:</h3>
                        <div className="flex flex-wrap justify-center md:justify-start space-x-2">
                          {statuses.map((status, i) => (
                            <span
                              key={i}
                              className={`px-2 py-1 mb-2 md:mb-0 rounded-full text-sm font-medium ${
                                order.status === status
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-600"
                              } ${
                                statuses.indexOf(order.status) > i
                                  ? "line-through"
                                  : ""
                              }`}
                            >
                              {status}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
}
