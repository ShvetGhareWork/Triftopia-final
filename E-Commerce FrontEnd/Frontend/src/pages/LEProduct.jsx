import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import Star from "/star.png";
import Navbar from "../components/Navbar";
import RelatedProducts from "../components/RelatedProducts";

const LEProduct = () => {
  const { products, currency, AddtoCart } = useContext(ShopContext);
  const { productId } = useParams();
  const [ProductData, setProductData] = useState(null);
  const [Image, SetImage] = useState("");

  // Fetch product data
  const fetchdata = () => {
    if (!products || products.length === 0) {
      console.log("No products found in context.");
      return;
    }

    const data = products.find((item) => item._id == productId);

    if (!data) {
      console.error(`Product with ID ${productId} not found.`);
      return;
    }

    setProductData(data);
    SetImage(data.image || ""); // Prevents undefined errors
  };

  // Run fetchdata only when products are available
  useEffect(() => {
    if (products.length > 0) {
      fetchdata();
    }
  }, [products, productId]);

  return ProductData ? (
    <>
      <Navbar />
      <div className="container px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Product Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              <button className="w-20 h-20 border rounded-lg overflow-hidden">
                <img src={Image} alt="Product Thumbnail" />
              </button>
            </div>
            {/* Main Image */}
            <div
              className="flex-1 sticky top-0 z-10 hover:scale-110 hover:translate-x-10- transition duration-500"
              style={{ top: "10px" }}
            >
              <img src={Image} className="rounded-lg" alt="Product" />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 pl-10">
            <h1 className="font-medium text-3xl mt-2 ">{ProductData.name}</h1>
            <div className="flex items-center gap-1 mt-2">
              <img src={Star} alt="Star" className="w-3.5" />
              <img src={Star} alt="Star" className="w-3.5" />
              <img src={Star} alt="Star" className="w-3.5" />
              <img src={Star} alt="Star" className="w-3.5" />
              <img src={Star} alt="Star" className="w-3.5" />
              <p className="text-gray-600 pl-2">(122)</p>
            </div>
            <p className="text-3xl font-semibold">
              {currency} {ProductData.price}
            </p>
            {ProductData.Emi && (
              <p className="text-xl">
                EMI: {currency} {ProductData.Emi} Valid up to 24 months!
              </p>
            )}
            <button
              onClick={() => AddtoCart(ProductData._id)}
              className="bg-black w-40 text-white px-8 py-3 text-sm active:bg-gray-700"
            >
              ADD TO CART
            </button>
            <hr />
            <div className="text-sm text-gray-500 flex flex-col gap-1">
              <p>✅ 100% Original Product.</p>
              <p>✅ Cash on Delivery is Available.</p>
              <p>✅ Easy exchange and return policy within 7 days.</p>
            </div>
          </div>
        </div>

        {/* Description & Reviews Section */}
        <div className="mt-20 mx-24">
          <div className="flex">
            <b className="border px-5 py-3 text-lg">DESCRIPTION</b>
            <b className="border px-5 py-3 text-lg">REVIEWS (122)</b>
          </div>
          <div className="flex flex-col gap-4 border px-6 py-6 text-lg text-gray-500">
            <p>{ProductData.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="w-full">
        <RelatedProducts
          category={ProductData.category}
          subcategory={ProductData.subcategory}
          condition={ProductData.condition}
          rarity_level={ProductData.rarity_level}
        />
      </div>
    </>
  ) : (
    <div className="text-center py-10 text-gray-500">
      Loading product details...
    </div>
  );
};

export default LEProduct;
