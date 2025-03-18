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

// App config
const App = express();
const port = process.env.PORT || 7777;
connectDB();
connectCloudinary();
// const { userId } = req.body;

// Middlewares
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://triftopia-frontend.vercel.app",
  "https://triftopia-admin.vercel.app",
];

App.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// API endpoints
App.use("/api/user", userRouter);
App.use("/api/product", productRouter);
App.use("/api/cart", CartRouter);
App.use("/api/order", OrderRouter);

// Verify if working
App.get("/", (req, res) => {
  res.send("API WORKING");
});

App.get("/protected", AuthUser, (req, res) => {
  console.log("User ID in Route Handler:", req.userId);
  res.json({ success: true, userId: req.userId });
});

// Start the server
App.listen(port, () => {
  console.log("Server started on PORT: ${port}");
});
