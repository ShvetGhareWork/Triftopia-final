import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndurl, currency } from "../App";
import { toast } from "react-toastify";

const ProductList = ({ token }) => {
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch all products
  const fetchProducts = async () => {
    if (!token) {
      toast.error("Authorization token is missing!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(
        `${backEndurl}/api/product/list-product`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a product
  const deleteProduct = async (id) => {
    if (!id) {
      toast.error("Invalid product ID");
      return;
    }

    try {
      const response = await axios.delete(
        `${backEndurl}/api/product/remove-product`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { id }, // Correct way to send data in DELETE request
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        fetchProducts(); // Refresh the list after deletion
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <p className="mb-2 mt-10 text-2xl text-black">All Products</p>

      {loading ? (
        <p className="text-center text-gray-500 mt-4">Loading...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-6 gap-4 items-center py-2 px-4 border bg-gray-100 text-sm font-bold">
            <span className="col-span-1 text-start">Image</span>
            <span className="col-span-2">Name</span>
            <span className="col-span-1">Category</span>
            <span className="col-span-1">Price ({currency})</span>
            <span className="col-span-1 text-center">Action</span>
          </div>

          {/* Product List */}
          {List.length > 0 ? (
            List.map((item) => (
              <div
                key={item._id}
                className="md:grid grid-cols-6 gap-4 items-center py-2 px-4 border bg-gray-50 text-sm"
              >
                <img
                  className="w-16 h-16 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/placeholder.png";
                  }}
                />
                <span className="col-span-2">{item.name}</span>
                <span className="col-span-1">{item.category}</span>
                <span className="col-span-1">{item.price}</span>
                <button
                  onClick={() => deleteProduct(item._id)}
                  className="col-span-1 text-center text-red-500 hover:text-red-700 transition-all ease-in-out duration-300 font-bold text-lg"
                  aria-label={`Delete ${item.name}`}
                >
                  ✖
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              No products available.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
