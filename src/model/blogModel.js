import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    },
    description: {
        type: String,
    },
    imageFileName: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const blogModel = mongoose.model("Blog", blogSchema);
export default blogModel;