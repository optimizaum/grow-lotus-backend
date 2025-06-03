import express from "express";
import { subscribe , getAllSubscribers, sendNewsletterEmail } from "../controller/newsletterController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import Adminonly from "../middleware/AdminOnly.js";

const newsletterRoute = express.Router();

// POST /api/v1/newsletter/subscribe
newsletterRoute.post("/subscribe", subscribe);
newsletterRoute.get("/admin/subscribers",isAuthenticated , Adminonly , getAllSubscribers);
newsletterRoute.post("/send-email" , sendNewsletterEmail);

export default newsletterRoute;
