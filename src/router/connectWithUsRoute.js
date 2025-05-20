import express from 'express';
import { enquiry } from '../controller/connectWithUsController.js';
import { addContactUsInfo, getContactUsInfo } from '../controller/addContactUsInfoController.js';
import Adminonly from '../middleware/AdminOnly.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import { createFAQ, deleteFAQ, editFAQ, getAllFAQs, getFAQById } from '../controller/FAQController.js';
import { upload } from '../utils/setupMulter.js';
import { createFranchise, deleteFranchise, editFranchise, getAllFranchises, getFranchiseById } from '../controller/franchiseController.js';

const connectWithUsRoute = express.Router();

connectWithUsRoute.post('/enquiry' , enquiry);

// Contact us route
connectWithUsRoute.post("/contact-us",isAuthenticated , Adminonly , addContactUsInfo);
connectWithUsRoute.get("/contact-us", getContactUsInfo);

// FAQ route
connectWithUsRoute.post("/faq", isAuthenticated , Adminonly , createFAQ);
connectWithUsRoute.get("/faq", getAllFAQs)
connectWithUsRoute.get("/faq/:id", getFAQById);
connectWithUsRoute.patch("/faq/:id",editFAQ);
connectWithUsRoute.delete("/faq/:id", deleteFAQ);


// Franchises Route
connectWithUsRoute.post("/franchises",isAuthenticated , Adminonly , upload.single("file"), createFranchise );
connectWithUsRoute.get("/franchises",  getAllFranchises);
connectWithUsRoute.get("/franchises/:id", getFranchiseById);
connectWithUsRoute.patch("/franchises/:id", isAuthenticated , Adminonly ,  upload.single("file"), editFranchise);
connectWithUsRoute.delete("/franchises/:id", isAuthenticated , Adminonly , deleteFranchise);

export default connectWithUsRoute;