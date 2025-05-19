import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import cookieParser from 'cookie-parser'; 
import userAuthRouter from './src/router/UserAuthRoute.js';
import connectDB from './src/config/dbConnection.js';
import connectWithUsRoute from './src/router/connectWithUsRoute.js';
import errorHandler from './src/middleware/errorHandler.js';
import mediaContentRoute from './src/router/mediaContentRoutes.js';
const app = express();

//Initialize dotenv
dotenv.config();

const corsOptions = {
  origin: "*", // Your frontend URLs
  methods: "GET, POST, PUT, DELETE", // Allow these methods
  credentials: true, // Allow cookies to be sent with requests
};

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
// Error-handling middleware (should come last)
app.use(errorHandler);

// Routes
app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/connect", connectWithUsRoute);
app.use("/api/v1/media", mediaContentRoute);

//Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Grow Lotus Fintech API');
});















connectDB();
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});