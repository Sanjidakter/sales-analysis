app.post("/api/send-mail", async (req, res) => {
  const { to, subject, message } = req.body;

  // Check if the email address is valid
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(to)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD, // Replace with your email password
    },
  });

  try {
    await transporter.sendMail({
      from: "process.env.EMAIL",
      to,
      subject,
      text: message,
    });
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send email" });
  }
});
