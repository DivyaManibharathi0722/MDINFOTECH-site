const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "divyamanibharathi10@gmail.com",
        pass: "fyvs cfvp eyjw gega" // Gmail App Password
      },
    });

    const mailOptions = {
        from: "divyamanibharathi10@gmail.com", // MUST match your Gmail auth
        to: "divyamanibharathi10@gmail.com",
        replyTo: email, // the user's input email
        subject: `Contact Form: ${name}`,
        text: `You received a message from ${name} <${email}>:\n\n${message}`,
      };
      

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
