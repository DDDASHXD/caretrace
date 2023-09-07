import emailjs from "emailjs-com";
const serviceId = "service_ctlughx";
const userId = "user_X07eRIrDpaIHC6q5zpRvS";

export const sendConfirmationEmail = (email, token) => {
  const templateId = "template_w1gfjo6";
  emailjs.send(
    serviceId,
    templateId,
    {
      email,
      confirmationToken: `http://localhost:3000/confirm/${token}`,
    },
    userId
  );
};

export const sendPasswordResetEmail = (email, username, token) => {
  const templateId = "template_dijzggp";
  emailjs.send(
    serviceId,
    templateId,
    {
      email,
      username,
      link: `http://localhost:3000/reset/${token}`,
    },
    userId
  );
};
