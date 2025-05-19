import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
  },
  serviceType:{
    type: String,
    trim: true,
    enum : ['Loan' , 'Private' , 'Corporate' , 'Unsecure']
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^\d{10}$/,
      "Please enter a valid phone number"
    ] 
  },
})

const Enquiry = mongoose.model("Enquiry", enquirySchema);
export default Enquiry;