// Import required packages
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import AuthUser from "./middleware/Auth.js";

// Initialize app
const App = express();
const port = process.env.PORT || 7777;

// Connect to databases
connectDB();
connectCloudinary();

// Middleware
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// CORS Configuration
App.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://triftopia-admin.vercel.app", // Frontend URL
      "https://triftopia-c.vercel.app", // Backend URL (if applicable)
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Preflight Request Handling for CORS
App.options("*", cors());

// API Routes
App.use("/api/user", userRouter);
App.use("/api/product", productRouter);
App.use("/api/cart", CartRouter);
App.use("/api/order", OrderRouter);

// Test Routes
App.get("/", (req, res) => {
  res.send("API WORKING");
});

App.get("/protected", AuthUser, (req, res) => {
  console.log("User ID in Route Handler:", req.userId);
  res.json({ success: true, userId: req.userId });
});

// Start Server
App.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
