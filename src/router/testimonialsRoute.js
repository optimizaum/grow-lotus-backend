import express from 'express';
import { empTestimonials } from '../controller/empTestimonialsController.js';
import { clientTestimonials } from '../controller/clientTestimonialsController.js';
import { upload } from '../utils/setupMulter.js';

const testimonialsRoute = express.Router();


testimonialsRoute.post("/client", upload.single('file') , clientTestimonials)

testimonialsRoute.post("/employe", upload.single('file') , empTestimonials)





export default testimonialsRoute;