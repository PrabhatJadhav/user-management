const nodemailer = require("nodemailer");
require("dotenv").config();

async function sentEmail(receiverEmail) {
  if (!receiverEmail) {
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_SENDER_ACCOUNT,
      pass: process.env.EMAIL_SENDER_ACCOUNT_PASSWORD,
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: {
      name: "Prabhat Test Mails",
      address: process.env.EMAIL_SENDER_ACCOUNT,
    }, // sender address
    to: receiverEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<b>Hello world?</b> OTP ==> ${Math.floor(
      100000 + Math.random() * 900000
    )}`, // html body
  });

  console.log("Message sent: %s", info?.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

module.exports = { sentEmail };
