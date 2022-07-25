const sgMail = require('@sendgrid/mail');
const sendgridAPIKey = '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';  //APIKEY not valid
sgMail.setApiKey(sendgridAPIKey);

const welcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'test@example.com', // Use the email address or domain you verified above
        subject: 'Sending with Twilio SendGrid is Fun',
        text: `Hi ${name}, Congratulations on your completion of mastering Node.js`,
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    
    //ES6
    sgMail
      .send(msg)
      .then((result) => {console.log(result + ": Email sent successfully")}, error => {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
    });
}

const sendCancelationEmail = (email, name) => {
    const msg = {
        to: email,
        from: 'test@example.com', // Use the email address or domain you verified above
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}. I hope to see you back soon!`,
        html: '<strong>Goodbye ${name}. I hope to see you back soon!</strong>',
    };
    
    //ES6
    sgMail
      .send(msg)
      .then((result) => {console.log(result + ": Email sent successfully")}, error => {
        console.error(error);
    
        if (error.response) {
          console.error(error.response.body)
        }
    });
}

module.exports = {
    welcomeEmail,
    sendCancelationEmail
}