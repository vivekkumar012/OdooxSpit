import express from "express";
import userRouter from "./routes/userRouter.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors({ 
  origin: "http://localhost:5173",
  credentials: true 
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - MUST come BEFORE the root route
app.use("/api/v1/user", userRouter);

// Root route - MUST come AFTER API routes
// Changed from app.use to app.get to only catch GET requests
app.get("/", (req, res) => {
    res.send("Hello vivek from backend");
});

const port = 3001;

// Connect to DB first, then start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on http://localhost:${port}`);
      console.log(`✅ MongoDB Connected`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  });

// Optional: 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});