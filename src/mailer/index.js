const nodemailer = require("nodemailer");
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();

const MailerRouter = new express.Router();

async function wrapedSendMail(mailOptions) {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      port: 465, // true for 465, false for other ports
      host: "smtp.gmail.com",
      auth: {
        user: process.env.THE_EMAIL,
        pass: process.env.THE_PASSWORD,
      },

      secure: true,
    });
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        throw new Error(error);
      } else {
        resolve(info);
      }
    });
  });
}
const sendEmail = (data, htmlTemplate, from, to, subject) => {
  const html = ejs.render(htmlTemplate, { data });
  const mailData = {
    from,
    to,
    subject,
    html,
  };
  const response = wrapedSendMail(mailData);
  return response;
};

const candidateResponseHtml = require("./candidate-response/index.js");
const registerHtml = require("./register-response/index.js");

MailerRouter.post("/accepted", (req, res) => {
  const data = req.body;
  if (data.email && data.name && data.title) {
    const htmlCandidate = ejs.render(candidateResponseHtml, { data });
    const candidateMailData = {
      from: process.env.THE_EMAIL,
      to: data.email,
      subject: "A company has accepted your application!",
      html: htmlCandidate,
    };

    const candidateResponse = wrapedSendMail(candidateMailData);

    Promise.all(
      candidateResponse.then((candidate) => {
        res.status(200).send({ candidateMessageId: candidate.messageId });
      })
    );
  } else {
    res.status(500).send();
  }
});

MailerRouter.post("/register", (req, res) => {
  const data = req.body;
  if (data.email && data.name && data.message) {
    const htmlRegister = ejs.render(registerHtml, { data });
    const registerMailData = {
      from: process.env.THE_EMAIL,
      to: data.email,
      subject: "Registration confirmed!",
      html: htmlRegister,
    };

    const registerResponse = wrapedSendMail(registerMailData);

    Promise.all(
      registerResponse.then((register) => {
        res.status(200).send({ registerMessageId: register.messageId });
      })
    );
  } else {
    res.status(500).send();
  }
});

module.exports = {
  sendEmail,
};

module.exports = MailerRouter;
