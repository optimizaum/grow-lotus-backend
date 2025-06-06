// import mongoose from "mongoose";

// const subscriberSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     lowercase: true,
//     trim: true,
//   },
//   subscribedAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// const Subscriber = mongoose.model("Subscriber", subscriberSchema);

// export default Subscriber;
import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
  otp: { type: String }, // hashed OTP
  otpExpiresAt: { type: Date },
  subscribedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Subscriber", subscriberSchema);
