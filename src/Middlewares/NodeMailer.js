import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_TRANSPORTER_USER,
    pass: process.env.EMAIL_TRANSPORTER_PASS,
  },
});


export default transporter;
