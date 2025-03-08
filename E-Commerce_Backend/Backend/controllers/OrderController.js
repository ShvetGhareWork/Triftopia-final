import orderModel from "../models/OrderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";

// global variable
const currency = "inr";
const deliveryCharge = 10;

// gateway initialization
const RazorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Placing orders using COD method
const PlaceOrder = async (req, res) => {
  try {
    const { userId, amount, items, address } = req.body;

    if (!userId || !amount || !items.length || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    const OrderData = {
      userId,
      items,
      amount,
      address,
      payment_method: "COD",
      payment: false,
      date: new Date(),
    };

    const newOrder = await orderModel.create(OrderData);

    // Clear user's cart in the database
    await userModel.findByIdAndUpdate(userId, { cartdata: {} });

    res.json({ success: true, message: "Order Placed", order: newOrder });
  } catch (error) {
    console.error("Error in PlaceOrder:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using Razorpay method (To be implemented)
const PlaceOrderRazorpay = async (req, res) => {
  // Implementation for Razorpay orders

  try {
    const { userId, items, amount, address } = req.body;

    const OrderData = {
      userId,
      items,
      address,
      amount,
      payment_method: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(OrderData);
    await newOrder.save();

    const options = {
      amount: amount * 100,
      currency: currency.toUpperCase(),
      receipt: newOrder._id.toString(), //convert to string
    };

    await RazorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error });
      }
      res.json({ success: true, order });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verfiy Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id } = req.body;
    const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);
    // console.log(orderInfo);
    if (orderInfo.status === "paid") {
      await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ sucess: true, message: "Payment SuccessFull" });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ sucess: false, message: error.message });
  }
};

// Fetching all orders for admin panel
const AllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Fetching all orders for a specific user
const UserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const userOrders = await orderModel.find({ userId });
    res.json({ success: true, userOrders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Updating order status from admin panel
const UpdateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!orderId || !status) {
      return res
        .status(400)
        .json({ success: false, message: "Missing orderId or status" });
    }

    await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  PlaceOrder,
  PlaceOrderRazorpay,
  AllOrders,
  UserOrders,
  UpdateStatus,
  verifyRazorpay,
};
