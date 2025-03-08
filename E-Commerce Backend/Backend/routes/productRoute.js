import express from "express";
import {
  addProduct,
  removeProduct,
  listProduct,
  singleProductInfo,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js"; // Ensure you're importing it properly
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add-product",
  adminAuth,
  upload.single("image"), // Upload a single image
  addProduct
);
productRouter.delete("/remove-product", adminAuth, removeProduct);
productRouter.get("/list-product", listProduct); //add admin authentication but token to be passed to the frontend
productRouter.get("/product-info", singleProductInfo);

export default productRouter;
