import express from "express";
import cors from "cors";
import "dotenv/config"; // Ensures environment variables are loaded
import connectDB from "./config/mongodb.js"; // Database connection
import connectCloudinary from "./config/cloudinary.js"; // Cloudinary connection
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import CartRouter from "./routes/CartRoute.js";
import OrderRouter from "./routes/OrderRoute.js";
import AuthUser from "./middleware/Auth.js"; // Authentication middleware
import rateLimit from "express-rate-limit"; // For rate limiting requests

// App config
const App = express();
const port = process.env.PORT || 7777; // Use environment port or default to 7777

// Middlewares
App.use(express.json()); // Parses incoming JSON requests
App.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded requests

// Security Middlewares

// Rate Limiting to prevent brute-force attacks and DoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
App.use(apiLimiter); // Apply rate limiting to all requests

// CORS configuration
// Define allowed origins for your frontend applications
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://triftopia-frontend.vercel.app/",
  "https://triftopia-admin.vercel.app/", // Your Vercel frontend URL
  // If your backend on Render ever needs to make requests to itself,
  // or if you have another specific client deployed there, you might add it here.
  // However, for a typical client-server setup, the backend's own URL is not an "origin"
  // that needs to be allowed by its own CORS policy for client requests.
  // "https://triftopia-final.onrender.com", // Only if this is also a client origin
];

App.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or direct file access)
      if (!origin) return callback(null, true);
      // Check if the requesting origin is in the allowed list
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        // If not allowed, return an error
        console.warn(`CORS blocked request from origin: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
    credentials: true, // Allow cookies and authorization headers to be sent
  })
);

// API endpoints
// Mount your routers for different API resources
App.use("/api/user", userRouter);
App.use("/api/product", productRouter);
App.use("/api/cart", CartRouter);
App.use("/api/order", OrderRouter);

// Verify if working - A simple health check endpoint
App.get("/", (req, res) => {
  res.send("API WORKING");
});

// Protected route example using AuthUser middleware
App.get("/protected", AuthUser, (req, res) => {
  // req.userId is set by the AuthUser middleware after successful authentication
  console.log("User ID in Route Handler:", req.userId);
  res.json({ success: true, userId: req.userId });
});

// Centralized Error Handling Middleware (MUST be after all routes and other middleware)
App.use((err, req, res, next) => {
  console.error(err.stack); // Log the full error stack for debugging
  const statusCode = err.statusCode || 500; // Use custom status code if available, else 500
  const message = err.message || "Internal Server Error"; // Use custom message, else generic
  res.status(statusCode).json({ success: false, message: message });
});

// Function to start the server after essential services are connected
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    await connectCloudinary(); // Connect to Cloudinary
    App.listen(port, () => {
      // Use backticks for proper template literal interpolation
      console.log(`Server started on PORT: ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    // Exit the process with an error code if essential services fail to connect
    process.exit(1);
  }
};

// Call the function to start the server
startServer();

// Optional: Graceful shutdown (for production environments)
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  // In a real app, you'd close database connections, etc. here
  // For Express, you might need to manually close the server instance if you held a reference
  // Or, if using a library like `http-terminator`, use its close method.
  // For now, we'll just log and exit.
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
