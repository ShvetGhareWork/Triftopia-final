import express from "express";
import {
  AddtoCart,
  getUserCart,
  UpdatetoCart,
  removeFromCart, // ✅ Import the new controller
} from "../controllers/CartController.js";
import AuthUser from "../middleware/Auth.js";

const CartRouter = express.Router();

CartRouter.post("/add", AuthUser, AddtoCart);
CartRouter.post("/update", AuthUser, UpdatetoCart);
CartRouter.post("/getcart", AuthUser, getUserCart);
CartRouter.delete("/remove", AuthUser, removeFromCart); // ✅ Add new delete route

export default CartRouter;
