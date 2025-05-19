import express from 'express';
import { enquiry } from '../controller/connectWithUsController.js';
import { addContactUsInfo, getContactUsInfo } from '../controller/addContactUsInfoController.js';
import Adminonly from '../middleware/AdminOnly.js';

const connectWithUsRoute = express.Router();

connectWithUsRoute.post('/enquiry' , enquiry);

// Contact us route
connectWithUsRoute.post("/contact-us", Adminonly , addContactUsInfo);
connectWithUsRoute.get("/contact-us", getContactUsInfo);


export default connectWithUsRoute;