import express from "express";
import {
  AllOrders,
  PlaceOrder,
  PlaceOrderRazorpay,
  UpdateStatus,
  UserOrders,
  verifyRazorpay,
} from "../controllers/OrderController.js";
import AdminAuth from "../middleware/adminAuth.js";
import AuthUser from "../middleware/Auth.js";

const OrderRouter = express.Router();

OrderRouter.post("/list", AdminAuth, AllOrders); // Admin: Fetch all orders
OrderRouter.post("/status", AdminAuth, UpdateStatus); // Admin: Update order status
OrderRouter.post("/place", AuthUser, PlaceOrder); // User: Place order (COD)
OrderRouter.post("/razorpay", AuthUser, PlaceOrderRazorpay); // User: Place order (Razorpay)
OrderRouter.post("/userorders", AuthUser, UserOrders); // User: Fetch own orders
OrderRouter.post("/verifyrazorpay", AuthUser, verifyRazorpay); // User: verify the payement

export default OrderRouter;
