import mongoose from 'mongoose';

const FranchiseSchema = new mongoose.Schema({
    imageFileName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    googleMapLink: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const FranchiseModel = mongoose.model('Franchise', FranchiseSchema);
export default FranchiseModel;