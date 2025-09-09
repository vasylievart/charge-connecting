const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log("GMAIL_PASS:", process.env.GMAIL_PASS ? '✔️ exists' : '❌ missing');

app.post('/send', async (req,res) => {
  const {name, email, message} = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: 'New Contact From Message',
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.status(200).json({success: true, message: 'Email sent successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, message: 'Failed to send email'});
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
})