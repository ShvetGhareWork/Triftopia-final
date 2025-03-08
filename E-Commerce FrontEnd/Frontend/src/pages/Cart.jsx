import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Bin from "/bin.png";
import Navbar from "../components/Navbar";
import CartTotal from "../components/CartTotal";
import Footer from "../components/Footer.jsx";

const Cart = () => {
  const { currency, CartItems, removeFromCart, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartdata, setCartdata] = useState([]);

  useEffect(() => {
    const tempData = Object.entries(CartItems).map(([itemId, item]) => ({
      _id: itemId,
      quantity: item.quantity,
      name: item.name || "Unknown Product",
      image: item.image || "/default-image.png", // Provide a default image
      price: item.price || 0,
    }));

    setCartdata(tempData);
  }, [CartItems]);

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  return (
    <>
      <Navbar />
      <div className="pt-10">
        <div className="text-2xl mb-3 text-center">
          <Title text1={"YOUR"} text2={"CART"} />
        </div>
        <div>
          {cartdata.length === 0 ? (
            <div className="text-center"></div>
          ) : (
            cartdata.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b-0 text-gray-700 grid-cols-[4fr_0.5fr0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] gap-4 flex justify-between items-center"
              >
                <div className="flex items-start gap-6">
                  <img
                    src={item.image}
                    className="w-16 ml-4 sm:w-20"
                    alt={item.name}
                  />
                  <div>
                    <p className="text-xl sm:text-2xl font-bold">
                      <b>{item.name}</b>
                    </p>
                    <div className="flex items-center w-100 justify-between">
                      <p className="text-lg font-semibold sm:text-md">
                        Price: {currency}
                        {new Intl.NumberFormat().format(item.price)}
                        {"    "}
                      </p>
                      <p className="text-lg font-semibold sm:text-md">
                        Time: {formattedDate}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-lg pr-5 font-semibold sm:text-md">
                        Quantity:
                      </p>
                      <input
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || value === "0" || isNaN(value))
                            return;
                          updateQuantity(item._id, Number(value));
                        }}
                        type="number"
                        className="border-1 border-gray-400 w-52 h-10 max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 sm:py-2"
                        min={1}
                        defaultValue={item.quantity}
                      />
                    </div>
                  </div>
                </div>
                <img
                  src={Bin}
                  className="w-auto mr-4 cursor-pointer"
                  alt=""
                  onClick={() => removeFromCart(item._id)}
                />
              </div>
            ))
          )}
        </div>
        <hr />

        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal />
            <div className="w-full text-end ">
              <button
                onClick={() => navigate("/place-order")}
                className="bg-black mr-10 text-white text-sm my-8 px-8 py-3"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
