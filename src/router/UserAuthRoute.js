import express from 'express';
import { login, registerUser } from '../controller/userAuthController.js';

const userAuthRouter = express.Router();


userAuthRouter.post("/register", registerUser);
userAuthRouter.post("/login" , login);
// userAuthRouter.post("/logout");
// userAuthRouter.post("/verifyOtp");
// userAuthRouter.post("/verifyLoginOTP");


export default userAuthRouter;