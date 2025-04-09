import template from "../libs/Email.Templates.js";
import transporter from "./NodeMailer.js";

export const sendEmailVerification = async (
  email,
  verificationCode
) => {
  try {
    const response = await transporter.sendMail({
      from: `"Abu Bakkar" <${process.env.EMAIL_TRANSPORTER_USER}>`,
      // sender address
      to: email, // list of receivers
      subject: "Verify Your Email", // Subject line
      text: "Verify Your Email", // plain text body
      html: template.Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });

    console.log("Message sent: ", response.messageId);
  } catch (error) {
    console.log(
      "Error while sending verification mail",
      error
    );
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await transporter.sendMail({
      from: `"Abu Bakkar" <${process.env.EMAIL_TRANSPORTER_USER}>`,
      // sender address
      to: email, // list of receivers
      subject: "Verification Successfull", // Subject line
      text: "Welcome Message", // plain text body
      html: template.Welcome_Email_Template.replace(
        "{name}",
        name
      ), // html body
    });

    console.log("Message sent: ", response.messageId);
  } catch (error) {
    console.log("Error while sending welcome mail", error);
  }
};
