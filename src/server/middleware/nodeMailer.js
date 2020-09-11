var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishrs123@gmail.com',
    pass: '9718751534'
  }
});

const sendMail = ( recipientEmail, mailSubject, mailBody ) => {

var mailOptions = {
  from: 'vishrs123@gmail.com',
  to: recipientEmail,
  subject: mailSubject,
  text: mailBody
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

}

module.exports = {sendMail};