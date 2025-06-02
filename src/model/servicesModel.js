import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true,
    },
     subServiceName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageFileName: {
        type: String,
    },
    bulletPoints:{
        type: [String],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const serviceModel = mongoose.model("Service", serviceSchema);
export default serviceModel;