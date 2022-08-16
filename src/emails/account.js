const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const welcomeEmail = (email, name) => {
  const msg = {
    to: email,
    from: "roland2rule@gmail.com", // Use the email address or domain you verified
    subject: "Sending with Twilio SendGrid is Fun",
    text: `Hi Roland, Congratulations on your completion of mastering Node.js`,
    html: `<strong>Hey Roland, it's easy to do anywhere, even with Node.js</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
    })
    .catch((error) => console.error(error));
};

const sendCancelationEmail = (email, name) => {
  const msg = {
    to: email,
    from: "roland2rule@gmail.com",
    subject: "Sorry to see you go",
    text: `Goodbye ${name}. I hope to see you back soon!`,
    html: `<strong>Goodbye ${name}. I hope to see you back soon!</strong>`,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("Cancellation email sent!");
    })
    .catch((error) => console.error(error));
};

module.exports = {
  welcomeEmail,
  sendCancelationEmail,
};
