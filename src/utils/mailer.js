// utils/mailer.js
import nodemailer from 'nodemailer';

const DEFAULT_EMAIL = process.env.RECIEVER_MAIL;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
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
    const recipient = to || DEFAULT_EMAIL;

    const info = await transporter.sendMail({
      from: `"My App" <${process.env.EMAIL_USER}>`,
      to: recipient,
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
