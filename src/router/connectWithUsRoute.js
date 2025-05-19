import express from 'express';
import { enquiry } from '../controller/connectWithUsController.js';

const connectWithUsRoute = express.Router();

connectWithUsRoute.post('/enquiry' , enquiry);


export default connectWithUsRoute;