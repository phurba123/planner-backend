const nodemailer = require("nodemailer");

let sendEmailToUser = (sendEmailObj) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        auth: {
            user: 'kundhish@gmail.com',
            pass: 'randyorton'
        }
    });

    // setup email data 
    let mailOptions = {
        from: '"Meeting-Planner" <kundhis@gmail.com>', // sender address
        to: sendEmailObj.email, // list of receivers
        subject: sendEmailObj.subject, // Subject line
        html: sendEmailOptions.html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log('Message successfully sent.', info);
        }

    });

}

module.exports = {
    sendEmailToUser
}
