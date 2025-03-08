import React, { useState } from "react";
import Upload from "/upload.png";
import axios from "axios";
import { backEndurl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [Image, SetImage] = useState(null);
  const [preview, setPreview] = useState(Upload); // Default preview image
  const [Name, setName] = useState("");
  const [Description, SetDescription] = useState("");
  const [Price, SetPrice] = useState("");
  const [Emi, SetEmi] = useState("");
  const [Category, SetCategory] = useState("");
  const [SubCategory, SetSubCategory] = useState("");
  const [Rarity, SetRarity] = useState("");
  const [Bestseller, SetBestseller] = useState(false);
  const [Trusted, SetTrusted] = useState(false);
  const Value = "";
  const Reason = "";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      SetImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview of uploaded image
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", Name);
      formData.append("description", Description);
      formData.append("price", Price);
      formData.append("emi", Emi);
      formData.append("category", Category);
      formData.append("subCategory", SubCategory);
      formData.append("rarityLevel", Rarity);
      formData.append("bestseller", Bestseller);
      formData.append("trusted", Trusted);
      formData.append("value", Value);
      formData.append("reason", Reason);

      if (Image) {
        formData.append("image", Image);
      }

      const response = await axios.post(
        `${backEndurl}/api/product/add-product`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        SetDescription("");
        SetPrice("");
        SetImage(null);
        SetEmi("");
        SetCategory("");
        SetSubCategory("");
        SetBestseller(false);
        SetTrusted(false);
        SetRarity("");
      } else {
        toast.success(response.data.message);
      }
      // console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={onSubmitHandler}
    >
      <div className="mt-10">
        <p className="text-2xl text-black">Product Details:</p>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          value={Name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          value={Description}
          onChange={(e) => SetDescription(e.target.value)}
          placeholder="Write Content here"
          required
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            value={Category}
            onChange={(e) => SetCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Antique">Antique</option>
            <option value="Limited-Edition">Limited-Edition</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product SubCategory</p>
          <select
            value={SubCategory}
            onChange={(e) => SetSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="" disabled>
              Select subCategory
            </option>
            <option value="Collectables">Collectables</option>
            <option value="Exclusive Items">Exclusive Items</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Rarity Level</p>
          <select
            value={Rarity}
            onChange={(e) => SetRarity(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="" disabled>
              Select RarityLevel
            </option>
            <option value="Common">Common</option>
            <option value="Rare">Rare</option>
            <option value="Ultra-Rare">Ultra-Rare</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            value={Price}
            onChange={(e) => SetPrice(e.target.value)}
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            required
            placeholder="25"
          />
        </div>

        <div>
          <p className="mb-2">Product EMI (24)</p>
          <input
            value={Emi}
            onChange={(e) => SetEmi(e.target.value)}
            type="number"
            className="w-full px-3 py-2 sm:w-[120px]"
            required
            placeholder="30"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          checked={Bestseller}
          onChange={() => SetBestseller((prev) => !prev)}
          type="checkbox"
          id="bestseller"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Best-Seller
        </label>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          checked={Trusted}
          onChange={() => SetTrusted((prev) => !prev)}
          type="checkbox"
          id="trusted"
        />
        <label className="cursor-pointer" htmlFor="trusted">
          Add to Triftopia-Trusted
        </label>
      </div>

      {/* File Upload Section */}
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image">
            <img
              className="w-15 h-15 cursor-pointer object-cover"
              src={preview}
              alt="Preview"
            />
            <input
              type="file"
              id="image"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
