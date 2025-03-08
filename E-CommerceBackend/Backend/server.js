import express from "express";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import AuthUser from "./middleware/Auth.js";

const App = express();
const port = process.env.PORT || 7777;

connectDB();
connectCloudinary();

App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// 🌐 Manually Add CORS Headers
App.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://triftopia-admin.vercel.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// API Routes
App.use("/api/user", userRouter);
App.use("/api/product", productRouter);
App.use("/api/cart", CartRouter);
App.use("/api/order", OrderRouter);

// Test Route
App.get("/", (req, res) => {
  res.send("API WORKING");
});

// Protected Route
App.get("/protected", AuthUser, (req, res) => {
  console.log("User ID in Route Handler:", req.userId);
  res.json({ success: true, userId: req.userId });
});

// Start Server
App.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
