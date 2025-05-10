import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndurl } from "../App.jsx";
import { toast } from "react-toastify";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const FetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backEndurl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    FetchAllOrders();
  }, [token]);

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  const salesData = orders.map((order) => ({
    date: new Date(order.date).toLocaleDateString(),
    amount: order.amount,
  }));

  return (
    <div className="p-6">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Order Analytics</h3>

      {/* Graphs Container */}
      <div className="flex space-x-6">
        {/* Orders by Status Graph */}
        <div className="w-1/2">
          <h4 className="text-xl font-semibold mb-4">Orders by Status</h4>
          <BarChart
            xAxis={[{ data: Object.keys(statusCounts), scaleType: "band" }]}
            series={[
              {
                data: Object.values(statusCounts),
                label: "Orders",
                color: "#1f77b4",
              },
            ]}
            height={300}
          />
        </div>

        {/* Sales Over Time Graph */}
        <div className="w-1/2">
          <h4 className="text-xl font-semibold mb-4">Sales Over Time</h4>
          <LineChart
            xAxis={[
              { data: salesData.map((item) => item.date), scaleType: "band" },
            ]}
            series={[
              {
                data: salesData.map((item) => item.amount),
                label: "Sales",
                color: "#ff7f0e",
              },
            ]}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
