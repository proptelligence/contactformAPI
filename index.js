const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add this line for CORS

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
  try {
    // Your email sending logic here
    const { firstName, lastName, email, message } = req.body;

    // Set up nodemailer transporter with your email credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'workingajay7@gmail.com',
          pass: 'jhkq lndj hpyi kmns', // Use the App Password generated from Google Account
        },
      });
      

    // Email configuration
    const mailOptions = {
      from: 'workingajay7@gmail.com',
      to: 'info@protelligence.net',
      subject: 'New Contact Form Submission',
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Email sent successfully!', info.response);
        res.status(200).send('Email sent successfully!');
      }
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Internal Server Error');
  }
});

const PORT = 3007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
