const otpTemplate = (otp) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Vidyawati OTP Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #F8FAFC;
      font-family: Arial, Helvetica, sans-serif;
      color: #192F59;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(25, 47, 89, 0.1);
    }

    .header {
      background: #192F59;
      padding: 30px;
      text-align: center;
      color: #ffffff;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 700;
    }

    .content {
      padding: 30px;
      text-align: center;
    }

    .content p {
      font-size: 15px;
      line-height: 1.6;
      color: #4A5568;
      margin-bottom: 25px;
    }

    .otp-box {
      background: #FFF7ED;
      border: 1px solid #F9872C;
      border-radius: 10px;
      padding: 20px;
      margin: 20px 0;
    }

    .otp {
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 6px;
      color: #F9872C;
    }

    .expiry {
      margin-top: 10px;
      font-size: 14px;
      color: #718096;
    }

    .warning {
      margin-top: 25px;
      font-size: 14px;
      color: #C53030;
    }

    .footer {
      background: #F1F5F9;
      padding: 20px;
      text-align: center;
      font-size: 13px;
      color: #64748B;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Vidyawati Verification</h1>
    </div>

    <div class="content">
      <p>
        Use the One-Time Password (OTP) below to verify your account.
        This code is valid for <strong>5 minutes</strong>.
      </p>

      <div class="otp-box">
        <div class="otp">${otp}</div>
        <div class="expiry">Expires in 5 minutes</div>
      </div>

      <p class="warning">
        Do not share this OTP with anyone. Vidyawati will never ask for your OTP.
      </p>
    </div>

    <div class="footer">
      © ${new Date().getFullYear()} Vidyawati. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};

module.exports = otpTemplate;
