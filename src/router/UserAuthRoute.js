import express from 'express';
import { login, logout, registerUser } from '../controller/userAuthController.js';

const userAuthRouter = express.Router();


userAuthRouter.post("/register", registerUser);
userAuthRouter.post("/login" , login);
userAuthRouter.post("/logout" , logout);


export default userAuthRouter;