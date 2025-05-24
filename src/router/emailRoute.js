import express from 'express';
import {
    applyFrenchiseController,
  privateFundingController,
  enquiryController,
  financeAdviceController,
  contactUsController,
  BookAMeeting
} from '../controller/emailController.js';

const emailRoute = express.Router();

emailRoute.post('/apply-frenchise', applyFrenchiseController);
emailRoute.post('/private-funding', privateFundingController);
emailRoute.post('/enquiry', enquiryController);
emailRoute.post('/finance-advice', financeAdviceController);
emailRoute.post('/contact-us', contactUsController);
emailRoute.post('/book-a-meeting', BookAMeeting);

export default emailRoute;
