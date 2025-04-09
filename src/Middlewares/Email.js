import Verification_Email_Template from "../libs/Email.Templates.js";
import transporter from "./NodeMailer.js";

const sendEmailVerification = async (
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
      html: Verification_Email_Template.replace(
        "{verificationCode}",
        verificationCode
      ), // html body
    });

    console.log("Message sent: %s", response.messageId);
  } catch (error) {
    console.log(error);
  }
};

export default sendEmailVerification;
