import React, { useEffect, useState } from "react";
import { ScatterChart } from "@mui/x-charts";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

const ScatterGraph = ({ token }) => {
  const [scatterData, setScatterData] = useState({
    Rare: [],
    Common: [],
    UltraRare: [],
  });

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
        const groupedData = {
          Rare: [],
          Common: [],
          UltraRare: [],
        };

        products.forEach((product, index) => {
          const rarity = product.rarityLevel || "Unknown";
          const price = product.price || 0;

          if (rarity === "Rare") {
            groupedData.Rare.push({ x: index, y: price, id: index });
          } else if (rarity === "Common") {
            groupedData.Common.push({ x: index, y: price, id: index });
          } else if (rarity === "Ultra-Rare") {
            groupedData.UltraRare.push({ x: index, y: price, id: index });
          }
        });

        setScatterData(groupedData);
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

  const colors = {
    Rare: "#FF6B6B",
    Common: "#4ECDC4",
    UltraRare: "#1A535C",
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Price vs Rarity Level</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-60">
        {Object.entries(scatterData).map(([rarity, data]) => (
          <div key={rarity}>
            <h3 className="text-lg font-semibold mb-2">{rarity}</h3>
            {data.length > 0 ? (
              <ScatterChart
                width={300}
                height={300}
                series={[
                  { label: `Price by ${rarity}`, data, color: colors[rarity] },
                ]}
              />
            ) : (
              <p className="text-center text-gray-500">No data available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScatterGraph;
