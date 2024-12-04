const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

// Email sending endpoint
router.post('/send-mail', async (req, res) => {
  const { to, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text: message,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error sending email', error: err.message });
  }
});

module.exports = router;
