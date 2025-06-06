import express from "express";
import { subscribe , getAllSubscribers, sendNewsletterEmail, verifyNewsletterOtp } from "../controller/newsletterController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import Adminonly from "../middleware/AdminOnly.js";

const newsletterRoute = express.Router();

newsletterRoute.post("/verify-otp", verifyNewsletterOtp);
newsletterRoute.post("/subscribe", subscribe);
newsletterRoute.get("/admin/subscribers",isAuthenticated , Adminonly , getAllSubscribers);
newsletterRoute.post("/send-email" ,isAuthenticated , Adminonly, sendNewsletterEmail);

export default newsletterRoute;
