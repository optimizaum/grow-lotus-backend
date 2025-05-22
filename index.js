import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import cookieParser from 'cookie-parser'; 
import userAuthRouter from './src/router/UserAuthRoute.js';
import connectDB from './src/config/dbConnection.js';
import connectWithUsRoute from './src/router/connectWithUsRoute.js';
import errorHandler from './src/middleware/errorHandler.js';
import mediaContentRoute from './src/router/mediaContentRoutes.js';
import userModel from './src/model/userModel.js';
import testimonialsRoute from './src/router/testimonialsRoute.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//Initialize dotenv
dotenv.config();

// const corsOptions = {
//   origin: ["*", "https://backend.growlotusfintech.com"], 
//   methods: "GET, POST, PUT, DELETE", // Allow these methods
//   credentials: true, // Allow cookies to be sent with requests
// };

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/uploads", express.static("./src/upload"));
app.use(cookieParser());
// Error-handling middleware (should come last)
app.use(errorHandler);

// Routes
app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/connect", connectWithUsRoute);
app.use("/api/v1/media", mediaContentRoute);
app.use("/api/v1/testimonials", testimonialsRoute);

// Admin registration route
app.get('/registerAdmin', async (req, res) => {
  try {
    const email = "admin@growlotusfintech.com";

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered"
      });
    }

    const user = await userModel.create({
      name: "growlotus",
      email: email,
      password: "GrowLotus#567" 
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      email: user.email,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
});


//Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Grow Lotus Fintech API');
});















connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});