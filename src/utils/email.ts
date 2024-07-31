import transporter from "../config/nodemailer";

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email: %s", error);
  }
};

//TODO: Make an html template for registration
//TODO: Make an html template for password reset
//TODO: Make an html template for new blog posts
