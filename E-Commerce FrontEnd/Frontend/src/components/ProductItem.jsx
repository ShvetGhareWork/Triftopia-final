import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency, AddtoCart, isInCart } = useContext(ShopContext);

  return (
    <div className="text-gray-700 cursor-pointer">
      <Link to={`/product/${id}`} className="block overflow-hidden">
        <img
          className="hover:scale-110 rounded-2xl transition ease-in w-72 h-72"
          src={image}
          alt="Product"
        />
        <p className="pt-3 pb-1 text-xl font-semibold">{name}</p>
        <p className="text-lg font-medium">
          {currency}
          {price}
        </p>
      </Link>
      <div className="flex items-end">
        {/* 🛒 Show Add or Added Button Based on Cart Status */}
        {isInCart(id) ? (
          <button className="bg-black hover:bg-gray-700 transition-all duration-200 text-white px-4 py-2 mt-2 cursor-not-allowed">
            Added to Cart
          </button>
        ) : (
          <button
            onClick={() => AddtoCart(id)}
            className="bg-black hover:bg-gray-700 transition-all duration-200 text-white px-4 py-2 mt-2 "
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
