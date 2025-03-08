import { useCallback } from "react";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title.jsx";
import { motion } from "framer-motion";
import ProductItem from "../components/ProductItem.jsx";

const AntiqueCollection = () => {
  const { products, Search, ShowSearch } = useContext(ShopContext);
  const [ShowFilter, SetShowFilter] = useState(false);
  const [Allproducts, SetAllproducts] = useState([]);
  const [Category, SetCategory] = useState([]);
  const [SubCategory, SetSubCategory] = useState([]);
  const [sort_type, setsort_type] = useState("Relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    SetCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    SetSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const Limited_products = products.filter(
    (item) => item.category === "Antique"
  );

  useEffect(() => {
    SetAllproducts(Limited_products);
  }, [products]);

  const ApplyFilter = useCallback(() => {
    let filteredProducts = Limited_products.slice();

    if (Search) {
      filteredProducts = filteredProducts.filter((item) =>
        item.name.toLowerCase().includes(Search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        Category.includes(item.rarityLevel)
      );
    }

    if (SubCategory.length > 0) {
      filteredProducts = filteredProducts.filter((item) =>
        SubCategory.some((sub) => item[sub] === true)
      );
    }

    switch (sort_type) {
      case "Low-High":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "High-Low":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    SetAllproducts(filteredProducts);
  }, [Category, SubCategory, sort_type, Search, products]);

  useEffect(() => {
    ApplyFilter();
  }, [ApplyFilter, ShowSearch, Search]);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col sm:flex-row gap-6 pt-10 px-4 sm:px-10">
        <div className="sm:w-1/4">
          <button
            onClick={() => SetShowFilter(!ShowFilter)}
            className="sm:hidden bg-gray-200 p-2 rounded-md w-full mb-4"
          >
            Toggle Filters
          </button>
          <div
            className={`${
              ShowFilter ? "block" : "hidden"
            } sm:block border p-4 rounded-md`}
          >
            <p className="text-lg font-semibold mb-3">CATEGORIES</p>
            <div className="space-y-2">
              {["Common", "Rare", "Ultra-Rare"].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={toggleCategory}
                  />{" "}
                  {cat}
                </label>
              ))}
            </div>
            <p className="text-lg font-semibold mt-4 mb-3">TYPE</p>
            <div className="space-y-2">
              {["bestseller", "trusted"].map((sub) => (
                <label key={sub} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={sub}
                    onChange={toggleSubCategory}
                  />{" "}
                  {sub.replace(/_/g, " ")}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="sm:w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              onChange={(e) => setsort_type(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="Relevant">Sort by: Relevance</option>
              <option value="Low-High">Sort by: Low to High</option>
              <option value="High-Low">Sort by: High to Low</option>
            </select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Allproducts.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              >
                <ProductItem
                  id={item._id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiqueCollection;
