import nodemailer from "nodemailer";

// all passed variables must be strings
export const configureTransportObject = (service, email, password) => {
  const transport = nodemailer.createTransport({
    service: service,
    auth: {
      user: email,
      pass: password,
    },
  });

  return transport;
};

//all passed variables must be string
export const CreateMailOption = (
  senderEmail,
  receiversEmail,
  subject,
  message
) => {
  const mailOptions = {
    from: senderEmail,
    to: receiversEmail,
    subject: subject,
    text: message,
  };

  return mailOptions;
};
