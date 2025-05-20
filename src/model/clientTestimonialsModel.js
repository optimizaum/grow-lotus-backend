import mongoose from "mongoose";

const clientTestimonialsSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  description:{
    type: String,
  },
  createdAt:{
    type: Date,
    default: Date.now,
  },
  });


const clientTestimonialsModel = mongoose.model("ClientTestimonials", clientTestimonialsSchema);
export default clientTestimonialsModel;