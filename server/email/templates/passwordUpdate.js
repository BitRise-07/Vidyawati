// passwordUpdate.js

exports.passwordUpdate = (userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Password Updated</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: auto;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
      }
      h2 {
        color: #333333;
      }
      p {
        color: #555555;
        line-height: 1.5;
      }
      .footer {
        margin-top: 20px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hello ${userName},</h2>
      <p>Your account password has been successfully updated.</p>
      <p>If you did not make this change, please reset your password immediately and contact our support team.</p>
      <p class="footer">Stay safe,<br>Your Website Team</p>
    </div>
  </body>
  </html>
  `;
};
