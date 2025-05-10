import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

export default function Piechart({ token }) {
  const [categoryData, setCategoryData] = useState([]);

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#1A535C",
    "#FFB400",
    "#6A0572",
    "#007BFF",
  ];

  const fetchProducts = async () => {
    if (!token) {
      toast.error("Authorization token is missing!");
      return;
    }

    try {
      const response = await axios.get(
        `${backEndurl}/api/product/list-product`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        const products = response.data.products;

        const categoryCounts = products.reduce((acc, product) => {
          const category = product.category || "Uncategorized";
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});

        const pieData = Object.entries(categoryCounts).map(
          ([category, count], index) => ({
            id: index,
            value: count,
            label: `${category} (${count})`,
            color: colors[index % colors.length],
          })
        );

        setCategoryData(pieData);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Product Categories</h2>
      {categoryData.length > 0 ? (
        <PieChart
          series={[
            {
              data: categoryData,
              highlightScope: { fade: "global", highlight: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              animation: {
                easing: "easeOutCubic",
                duration: 1000,
              },
            },
          ]}
          height={300}
          slotProps={{
            legend: {
              direction: "column",
              position: { vertical: "middle", horizontal: "right" },
            },
          }}
        />
      ) : (
        <p className="text-center text-gray-500">No product data available</p>
      )}
    </div>
  );
}
