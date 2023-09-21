var nodemailer = require("nodemailer");
const get_data = require("./firebase");

const email_id = "puzzlelists@gmail.com";

async function send_mail(to, subject, otp) {
  const email_pass = await get_data("gmail_pass");
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email_id,
        pass: email_pass,
      },
    });
    let mailOptions;
    if (subject === "Password Reset") {
      mailOptions = {
        from: email_id,
        to: to,
        subject: subject,
        text: `We get it, Stuff happens, Here's your One Time Password to Sign In again!. Please keep it Private, and do not share with anyone.\n${otp}\nIf you did not request a password reset, please ignore this email. This password reset is only valid for the next 30 minutes.\nThanks,\nThe Anti Brutus Team\n This is an automated email, please do not reply to this email.`,
      };
    } else if (subject === "OTP Verification") {
      mailOptions = {
        from: email_id,
        to: to,
        subject: subject,
        text: `Here's your One Time Password. Please keep it Private, and do not share with anyone.\n${otp}\nIf you did not register for our website, please ignore this email. This password reset is only valid for the next 30 minutes.\nThanks,\nThe Anti Brutus Team\n This is an automated email, please do not reply to this email.`,
      };
    }

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = send_mail;
