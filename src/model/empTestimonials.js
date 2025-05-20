import mongoose from "mongoose";

const empTestimonialsSchema = new mongoose.Schema({
  imageFileName:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  designation:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  });


const empTestimonialsModel = mongoose.model("EmpTestimonials", empTestimonialsSchema);
export default empTestimonialsModel;