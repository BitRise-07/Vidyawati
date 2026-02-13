const nodemailer = require("nodemailer");

const mailSender = async (mail, title, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: `"Vidyawati" <${process.env.MAIL_USER}>`,
      to: mail,
      subject: title,
      html: body,   
    });

    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.log("Mail error:", error.message);
  }
};

module.exports = mailSender;
