// courseEnrollmentEmail.js

exports.courseEnrollmentEmail = (courseName, userName) => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8" />
    <title>Course Enrollment Confirmation</title>
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
      .btn {
        display: inline-block;
        background-color: #4cafef;
        color: white;
        padding: 10px 15px;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 15px;
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
      <h2>Hi ${userName},</h2>
      <p>Congratulations! 🎉 You have successfully enrolled in <strong>${courseName}</strong>.</p>
      <p>We’re excited to have you on board. You can start your learning journey right away.</p>
      <a href="https://your-website.com/courses/${encodeURIComponent(courseName)}" class="btn">
        Go to Course
      </a>
      <p class="footer">If you didn’t enroll in this course, please contact our support team.</p>
    </div>
  </body>
  </html>
  `;
};
