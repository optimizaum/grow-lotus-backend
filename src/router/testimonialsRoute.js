import express from 'express';
import { deleteEmpTestimonials, empTestimonials } from '../controller/empTestimonialsController.js';
import { clientTestimonials, deleteClientTestimonials, editClientTestimonials, getAllClientTestimonials, getClientTestimonialsById } from '../controller/clientTestimonialsController.js';
import { upload } from '../utils/setupMulter.js';

const testimonialsRoute = express.Router();

// Route for client testimonials
testimonialsRoute.post("/client", clientTestimonials);
testimonialsRoute.get("/client" , getAllClientTestimonials );
testimonialsRoute.get("/client/:id" , getClientTestimonialsById );
testimonialsRoute.patch("/client/:id" , editClientTestimonials );
testimonialsRoute.delete("/client/:id" , deleteClientTestimonials );



// Route for employee testimonials
testimonialsRoute.post("/employee", upload.single('file') , empTestimonials);
// testimonialsRoute.get("/employee" );
// testimonialsRoute.get("/employee/:id" );
// testimonialsRoute.patch("/employee/:id" );
testimonialsRoute.delete("/employee/:id" , deleteEmpTestimonials);




export default testimonialsRoute;