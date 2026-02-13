exports.contactUsEmail = (
  email,
  firstname,
  lastname,
  message,
  phoneNo,
  countrycode
) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>We’ve Received Your Message | Vidyawati</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
      font-family: Arial, Helvetica, sans-serif;
      color: #192F59;
      line-height: 1.6;
    }

    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    }

    .header {
      background: linear-gradient(135deg, #192F59, #2D437F);
      padding: 28px;
      text-align: center;
      color: #ffffff;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }

    .header p {
      margin-top: 8px;
      font-size: 14px;
      opacity: 0.9;
    }

    .content {
      padding: 30px;
    }

    .content h2 {
      font-size: 20px;
      margin-bottom: 12px;
      font-weight: 700;
    }

    .content p {
      font-size: 15px;
      color: #4A5568;
      margin-bottom: 18px;
    }

    .details {
      background: #FFF8F2;
      border-left: 4px solid #F9872C;
      padding: 18px;
      border-radius: 8px;
      margin: 24px 0;
      font-size: 14px;
    }

    .details p {
      margin: 6px 0;
      color: #2D3748;
    }

    .details strong {
      color: #192F59;
    }

    .response {
      background: #F7FAFC;
      padding: 16px;
      border-radius: 8px;
      text-align: center;
      font-size: 14px;
      color: #2D3748;
      margin-top: 24px;
    }

    .response span {
      color: #F9872C;
      font-weight: 600;
    }

    .footer {
      background: #1A202C;
      color: #CBD5E0;
      text-align: center;
      padding: 22px;
      font-size: 13px;
    }

    .footer a {
      color: #F9872C;
      text-decoration: none;
      font-weight: 600;
    }

    @media (max-width: 600px) {
      .content {
        padding: 22px;
      }
    }
  </style>
</head>

<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>Message Received</h1>
      <p>Thank you for contacting Vidyawati</p>
    </div>

    <!-- Content -->
    <div class="content">
      <h2>Hello ${firstname} ${lastname},</h2>

      <p>
        We’ve successfully received your message. Our team will review it and
        get back to you as soon as possible.
      </p>

      <div class="details">
        <p><strong>Name:</strong> ${firstname} ${lastname}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${countrycode} ${phoneNo}</p>
        <p><strong>Message:</strong> ${message}</p>
      </div>

      <div class="response">
        ⏱️ Expected response time: <span>within 24 hours</span><br />
        (Monday – Friday, 9:00 AM – 6:00 PM IST)
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      Need help sooner? Contact us at
      <a href="mailto:teamvidyawati@gmail.com">teamvidyawati@gmail.com</a><br /><br />
      © ${new Date().getFullYear()} Vidyawati. All rights reserved.
    </div>
  </div>
</body>
</html>`;
};
