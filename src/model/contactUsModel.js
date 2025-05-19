import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
    type: String,
    required: true,
  },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const contactUsModel = mongoose.model("ContactUs", contactUsSchema);
export default contactUsModel;