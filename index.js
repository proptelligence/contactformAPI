const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/contact/send-email', (req, res) => {
  try {
    const { name, mobileNumber, email, message } = req.body; // Ensure field names match

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'proptechdevelopment@gmail.com',
        pass: 'fugc jdcs zpui kbjt', // Ensure this is your App Password
      },
    });

    const mailOptions = {
      from: 'proptechdevelopment@gmail.com',
      to: 'info@protelligence.net',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nMobile Number: ${mobileNumber}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).send('Internal Server Error');
      }
      console.log('Email sent successfully!', info.response);
      res.status(200).send('Email sent successfully!');
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
