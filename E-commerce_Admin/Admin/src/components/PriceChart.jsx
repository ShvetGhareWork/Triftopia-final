import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

export default function PriceChart({ token }) {
  const [priceData, setPriceData] = useState([]);

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

        // Group products into price ranges
        const priceRanges = {
          "Below $2000": 0,
          "$2000 - $3999": 0,
          "$4000 - $5999": 0,
          "$6000 - $7999": 0,
          "$8000 - $9999": 0,
          "$10000 - $11999": 0,
          "$12000 - $13999": 0,
          "Above $15000": 0,
        };

        products.forEach((product) => {
          const price = product.price || 0;
          if (price < 2000) priceRanges["Below $2000"]++;
          else if (price < 4000) priceRanges["$2000 - $3999"]++;
          else if (price < 6000) priceRanges["$4000 - $5999"]++;
          else if (price < 8000) priceRanges["$6000 - $7999"]++;
          else if (price < 10000) priceRanges["$8000 - $9999"]++;
          else if (price < 12000) priceRanges["$10000 - $11999"]++;
          else if (price < 14000) priceRanges["$12000 - $13999"]++;
          else priceRanges["Above $15000"]++;
        });

        // Set price data for the chart
        const formattedData = Object.entries(priceRanges)
          .filter(([_, count]) => count > 0) // Remove empty ranges
          .map(([range, count]) => ({
            range,
            count,
          }));

        setPriceData(formattedData);
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
    <Box sx={{ width: "100%", maxWidth: 1100, margin: "auto" }}>
      <LineChart
        xAxis={[
          {
            data: priceData.map((item) => item.range),
            scaleType: "band",
            label: "Price Range",
          },
        ]}
        series={[
          {
            data: priceData.map((item) => item.count),
            label: "Number of Products",
          },
        ]}
        height={400}
        margin={{ top: 20, right: 20, bottom: 40, left: 50 }}
      />
    </Box>
  );
}
