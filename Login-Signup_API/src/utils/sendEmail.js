const sgMail = require('@sendgrid/mail')
const jsonwebtoken = require("jsonwebtoken");

sgMail.setApiKey(process.env.SENDGRID_APIKEY);


// message.to
// message.subjecy
// message.content
const sendEmail = async (messageOptions = {}) => {
    //sending mail
    const msg = {
        from: "khadkaengina111@gmail.com",
        to: messageOptions.to,
        subject: messageOptions.subject,
        html: messageOptions.content
    }

    sgMail
        .send(msg)
        .then(() => {
            console.log("Email Sent")
            return {
                message: 'Email Sent'
            }
        })
        .catch((error) =>{
            return {
                error 
            }
        }) 
    
   
}


module.exports = sendEmail;