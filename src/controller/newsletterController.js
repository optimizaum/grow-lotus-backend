// import Subscriber from "../model/subscriberModel.js";
import Subscriber from "../model/newsLetterModel.js";
import { sendEmail } from "../utils/mailer.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // Basic email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ success: false, message: "Email already subscribed" });
    }

    // Create new subscriber
    const subscriber = await Subscriber.create({ email: email.toLowerCase() });

    return res.status(201).json({ success: true, message: "Subscribed successfully", subscriber });
  } catch (error) {
    console.error("Subscribe error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find({}, { email: 1, subscribedAt: 1, _id: 0 }).sort({ subscribedAt: -1 });
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

    const subscribers = await Subscriber.find({}, { email: 1, _id: 0 });
    console.log("my subscribers====> " , subscribers);
    
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
