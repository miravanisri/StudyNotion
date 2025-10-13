const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  try {
    console.log("came here", email, title, body);


    console.log("=== EMAIL DEBUG ===");
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_USER:", process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);
    console.log("Attempting to connect...");
    
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
       port: 465,
secure: true, // because 465 uses SSL
      
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },


connectionTimeout: 10000,
      socketTimeout: 10000,
      tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
      }

     
    })

    let info = await transporter.sendMail({
      from: `"Studynotion | CodeHelp" <${process.env.MAIL_USER}>`, // sender address
      to: `${email}`, // list of receivers
      subject: `${title}`, // Subject line
      html: `${body}`, // html body
    })
    console.log("✅ Email sent:", info.messageId);

    return info
  } catch (error) {
    console.error("❌ Email failed:", error);
    throw error;
  }
}

module.exports = mailSender
