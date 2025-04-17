import { createTransport } from "nodemailer";
import { resetPasswordEmailTemplate, sendOrderMailTemplate } from "./emailTemplate.js";

export const sendForgotPasswordMail = (options) => {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.to,
      subject: "Reset Password",
      html:  resetPasswordEmailTemplate(options.firstName, options.resetUrl),
      category: "Reset Password",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  };

  export const sendOrderMail = (options) => {
    const transporter = createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: options.to,
      subject: "Send Order Mail",
      html:  resetPasswordEmailTemplate(options.firstName, options.resetUrl),
      category: "Send Order Mail",
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Order Mail sent: " + info.response);
      }
    });
  };