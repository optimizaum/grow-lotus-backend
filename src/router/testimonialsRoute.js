import express from 'express';
import { createEmpTestimonials, deleteEmpTestimonials, editEmpTestimonials, getAllEmpTestimonials, getEmpTestimonialsById } from '../controller/empTestimonialsController.js';
import { clientTestimonials, deleteClientTestimonials, editClientTestimonials, getAllClientTestimonials, getClientTestimonialsById } from '../controller/clientTestimonialsController.js';
import { upload } from '../utils/setupMulter.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';
import Adminonly from '../middleware/AdminOnly.js';

const testimonialsRoute = express.Router();

// Route for client testimonials
testimonialsRoute.post("/client",isAuthenticated , Adminonly , clientTestimonials);
testimonialsRoute.get("/client" , getAllClientTestimonials );
testimonialsRoute.get("/client/:id" , getClientTestimonialsById );
testimonialsRoute.patch("/client/:id" ,isAuthenticated , Adminonly , editClientTestimonials );
testimonialsRoute.delete("/client/:id" ,isAuthenticated , Adminonly , deleteClientTestimonials );



// Route for employee testimonials
testimonialsRoute.post("/employee",isAuthenticated , Adminonly , upload.single('file') , createEmpTestimonials);
testimonialsRoute.get("/employee" , getAllEmpTestimonials );
testimonialsRoute.get("/employee/:id" , getEmpTestimonialsById );
testimonialsRoute.patch("/employee/:id" ,isAuthenticated , Adminonly , upload.single('file') , editEmpTestimonials);
testimonialsRoute.delete("/employee/:id" ,isAuthenticated , Adminonly , deleteEmpTestimonials);




export default testimonialsRoute;