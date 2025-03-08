import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CartTotal from "../components/CartTotal";
import Stripe from "/stripe.png";
import Razorpay from "/razorpay.png";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backEndURL,
    token,
    SetCartItems,
    CartItems,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);

  // const [CartItems, setCartItemsLocal] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // execute razorpay
  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response);
        try {
          const { data } = await axios.post(
            backEndURL + "/api/order/verifyrazorpay",
            response,
            { headers: { token } }
          );
          console.log(data);
          if (data.sucess) {
            console.log("Payment successful. Redirecting to orders page...");
            SetCartItems({});
            console.log("Cart cleared:", CartItems); // Check if the cart is empty
            navigate("/orders");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const HandleSubmit = async (event) => {
    event.preventDefault();
    // console.log("CartItems:", CartItems);
    // console.log("Products:", products);

    try {
      let orderItems = [];

      for (const itemId in CartItems) {
        const cartItem = CartItems[itemId];

        // Safely extract quantity
        const quantity = cartItem?.quantity ?? 0;

        if (quantity > 0) {
          const itemInfo = products.find((product) => {
            return product._id?.toString() === itemId.toString();
          });

          if (itemInfo) {
            const clonedItem = structuredClone(itemInfo);
            clonedItem.quantity = quantity;
            orderItems.push(clonedItem);
          } else {
            console.warn(`Item with ID ${itemId} not found in products.`);
          }
        } else {
          console.warn(`Invalid quantity for item ${itemId}:`, cartItem);
        }
      }

      // console.log("Final Order Items:", orderItems);

      let OrderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
        payment_method: method,
      };

      // console.log(OrderData);

      switch (method) {
        case "cod": {
          const response = await axios.post(
            backEndURL + "/api/order/place",
            OrderData,
            { headers: { token } }
          );
          // console.log(response.data);

          if (response.data.success) {
            SetCartItems({});
            navigate("/orders");
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case "razorpay": {
          const responseRazorpay = await axios.post(
            backEndURL + "/api/order/razorpay",
            OrderData,
            { headers: { token } }
          );
          if (responseRazorpay.data.success) {
            initPay(responseRazorpay.data.order);
          }

          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.error("Error in HandleSubmit:", error.message);
    }
  };

  return (
    <>
      <Navbar />
      <form
        onSubmit={HandleSubmit}
        className="flex flex-col sm:flex-row justify-between gap-6 p-4 sm:p-10 min-h-[80vh] border-t"
      >
        <div className="flex flex-col gap-4 sm:w-1/2 w-full">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              className="border border-gray-300 rounded py-2 px-3 w-full sm:w-1/2"
              type="text"
            />
            <input
              required
              onChange={onChangeHandler}
              name="lastName"
              value={formData.lastName}
              placeholder="Last Name"
              className="border border-gray-300 rounded py-2 px-3 w-full sm:w-1/2"
              type="text"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="email"
            value={formData.email}
            placeholder="Email Address"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="email"
          />
          <input
            required
            onChange={onChangeHandler}
            name="street"
            value={formData.street}
            placeholder="Street"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
          />
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              required
              onChange={onChangeHandler}
              name="city"
              value={formData.city}
              placeholder="City"
              className="border border-gray-300 rounded py-2 px-3 w-full sm:w-1/2"
              type="text"
            />
            <input
              required
              onChange={onChangeHandler}
              name="state"
              value={formData.state}
              placeholder="State"
              className="border border-gray-300 rounded py-2 px-3 w-full sm:w-1/2"
              type="text"
            />
          </div>
          <input
            required
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            placeholder="Zipcode"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            placeholder="Country"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="text"
          />
          <input
            required
            onChange={onChangeHandler}
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            className="border border-gray-300 rounded py-2 px-3 w-full"
            type="number"
          />
        </div>

        <div className="sm:w-1/2 w-full mt-6 sm:mt-0">
          <CartTotal />
          <div className="mt-7">
            <Title text1={"PAYMENT"} text2={"METHOD"} />
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <div
                onClick={() => setMethod("stripe")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition-all duration-200 ${
                  method === "stripe"
                    ? "bg-gray-200 ring-2 ring-black border-black"
                    : "hover:bg-gray-100"
                }`}
              >
                <img src={Stripe} className="h-5 mx-4" alt="Stripe" />
              </div>

              <div
                onClick={() => setMethod("razorpay")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition-all duration-200 ${
                  method === "razorpay"
                    ? "bg-gray-200 ring-2 ring-black border-black"
                    : "hover:bg-gray-100"
                }`}
              >
                <img src={Razorpay} className="h-5 mx-4" alt="Razorpay" />
              </div>

              <div
                onClick={() => setMethod("cod")}
                className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded transition-all duration-200 ${
                  method === "cod"
                    ? "bg-gray-200 ring-2 ring-black border-black"
                    : "hover:bg-gray-100"
                }`}
              >
                <span className="h-5 mx-4 mb-2 text-lg">Cash on Delivery</span>
              </div>
            </div>

            <button
              type="submit"
              className="bg-black text-white px-8 py-3 w-full sm:w-auto mt-8"
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default PlaceOrder;
