import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema({
    imageFileName: {
        type: String,
        required: true,
    },
    eventType: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    });

    const galleryModel = mongoose.model("Gallery", gallerySchema);

    export default galleryModel;