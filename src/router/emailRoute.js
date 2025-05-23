// import express from 'express';
// import { PrivateFundingEmailController } from '../controller/emailController.js'; 

// const emailRoute = express.Router();

// emailRoute.post('/apply-frenchise', PrivateFundingEmailController);

// export default emailRoute;


import express from 'express';
import {
    applyFrenchiseController,
  privateFundingController,
  enquiryController,
  financeAdviceController,
  contactUsController
} from '../controller/emailController.js';

const emailRoute = express.Router();

emailRoute.post('/apply-frenchise', applyFrenchiseController);
emailRoute.post('/private-funding', privateFundingController);
emailRoute.post('/enquiry', enquiryController);
emailRoute.post('/finance-advice', financeAdviceController);
emailRoute.post('/contact-us', contactUsController);

export default emailRoute;
