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
    // -------------------

    const recipients = !to
      ? [defaultRecipient]
      : Array.isArray(to)
        ? to
        : [to];

    const results = [];

    for (const recipient of recipients) {
      try {
        const info = await transporter.sendMail({
          from: `"My App" <${process.env.EMAIL_USER}>`,
          to: recipient,
          subject,
          html,
        });
        console.log(`Email sent to ${recipient}:`, info.response);
        results.push({ email: recipient, success: true, message: info.response });
      } catch (error) {
        console.error(`Error sending to ${recipient}:`, error.message);
        results.push({ email: recipient, success: false, message: error.message });
      }
    }

    const failed = results.filter(r => !r.success);
    if (failed.length === 0) {
      return { success: true, message: "All emails sent successfully" };
    } else {
      return {
        success: false,
        message: `Some emails failed`,
        results,
      };
    }

    // -------------------
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, message: error.message };
  }
};
