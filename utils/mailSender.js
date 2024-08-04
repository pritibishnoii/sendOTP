const nodemailer = require("nodemailer");

require("dotenv").config();
const mailSender = async (email, title, body) => {
  try {
    //   create a transporter to send mail
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    // Send emails to users
    let info = transporter.sendMail({
      from: '"from priti 👻"', // sender address
      to: email, // list of receivers
      subject: title,
      html: body,
    });
    console.log("Email info: ", info);
    return info;
  } catch (err) {
    console.log("something went wront ");
    console.log(err);
  }
};

module.exports = mailSender;
