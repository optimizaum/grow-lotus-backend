import crypto from "crypto";
import Subscriber from "../model/newsLetterModel.js";
import { sendEmail } from "../utils/mailer.js";


export const verifyNewsletterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP required" });
    }

    const subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (!subscriber) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    if (subscriber.isVerified) {
      return res.status(400).json({ success: false, message: "Already verified" });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");

    if (
      subscriber.otp !== hashedOtp ||
      !subscriber.otpExpiresAt ||
      subscriber.otpExpiresAt < new Date()
    ) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    subscriber.isVerified = true;
    subscriber.otp = undefined;
    subscriber.otpExpiresAt = undefined;
    subscriber.subscribedAt = new Date();
    await subscriber.save();

    return res.status(200).json({ success: true, message: "Email verified and subscribed" });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

    let subscriber = await Subscriber.findOne({ email: email.toLowerCase() });

    if (subscriber && subscriber.isVerified) {
      return res.status(409).json({ success: false, message: "Email already subscribed" });
    }

    if (subscriber) {
      subscriber.otp = hashedOtp;
      subscriber.otpExpiresAt = otpExpiresAt;
      await subscriber.save();
    } else {
      subscriber = await Subscriber.create({
        email: email.toLowerCase(),
        otp: hashedOtp,
        otpExpiresAt,
      });
    }

    sendEmail({
      to: email,
      subject: "Your Newsletter OTP",
      html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in 10 minutes.</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent to email. Please verify.",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



export const getAllSubscribers = async (req, res) => {
  try {
    // const subscribers = await Subscriber.find({}, { email: 1, subscribedAt: 1, _id: 0 }).sort({ subscribedAt: -1 });
    const subscribers = await Subscriber.find({ isVerified: true }, { email: 1, _id: 0 });
    return res.status(200).json({
      success: true,
      subscribers,
    });
  } catch (error) {
    console.error("Get all subscribers error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const sendNewsletterEmail = async (req, res) => {
  try {
    const { subject, message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ success: false, message: "Subject and message are required" });
    }

    // const subscribers = await Subscriber.find({}, { email: 1, _id: 0 });
    const subscribers = await Subscriber.find({ isVerified: true }, { email: 1, _id: 0 });
    // console.log("my subscribers====> " , subscribers);
    
    const emailList = subscribers.map(sub => sub.email);

    if (emailList.length === 0) {
      return res.status(404).json({ success: false, message: "No subscribers found" });
    }

    const result = await sendEmail({
      to: emailList,
      subject,
      html: `<p>${message}</p>`,
    });

    if (result.success) {
      return res.status(200).json({ success: true, message: "Emails sent to all subscribers" });
    } else {
      return res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    console.error("sendNewsletterEmail error:", error);
    res.status(500).json({ success: false, message: "Server error while sending emails" });
  }
};