// utils/mailer.js
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => { 

  try {
    // const defaultRecipient = "prashantchauhanj@gmail.com";
    const defaultRecipient = "sanyogita@growlotusfintech.com";

    const recipientList = !to
      ? defaultRecipient
      : Array.isArray(to)
        ? to.join(",")
        : to;

    const info = await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: recipientList,
      subject,
      html,
    });

    console.log('Email sent:', info.response);
    return { success: true, message: info.response };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
};
