const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Handle form POST and send email
app.post('/send-email', async (req, res) => {
  const { name, email, age, medical, height, occupation, course } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'rohith200408@gmail.com', // your gmail
        pass: 'qdng svhu reye xata'     // your app password (not Gmail password!)
      }
    });

    const mailOptions = {
      from: 'rohith200408@gmail.com',
      to: email,
      subject: 'Fitness Course Confirmation',
      text: `Hey ${name}, your enrollment for ${course} is confirmed! Stay fit! 💪`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).send("Failed to send email");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
