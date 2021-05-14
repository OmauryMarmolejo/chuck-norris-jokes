"use strict";
const fetch = require("node-fetch");

const nodemailer = require("nodemailer");

console.log(process.env.MAIL_HOST);
const { MAIL_HOST, MAIL_PORT, MAIL_USER, MAIL_PASS } = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

module.exports.sendEmail = async (event) => {
  const response = await fetch("https://api.chucknorris.io/jokes/random");
  const joke = await response.json();

  const html = `
  <h1>The Joke</h1>
  <p>${joke.value}</p>
  `;

  let info = await transport.sendMail({
    from: '"Chuck Norris" <noreply@chuck.com',
    to: "7190ec2af2-6d7064@inbox.mailtrap.io",
    subject: "Daily Joke",
    html,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: joke.value,
        input: event,
      },
      null,
      2
    ),
  };
};
