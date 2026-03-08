exports.paymentSuccessEmail = (name, amount, orderId, paymentId) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Confirmation - Vidyawati</title>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
            
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            
            body {
                background: linear-gradient(135deg, #FEF7F2 0%, #FFFAF5 100%);
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6;
                color: #192F59;
                padding: 20px;
            }
            
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background: white;
                border-radius: 28px;
                overflow: hidden;
                box-shadow: 0 25px 50px rgba(249, 135, 44, 0.1);
                border: 1px solid rgba(249, 135, 44, 0.15);
            }
            
            .header {
                background: linear-gradient(135deg, #192F59 0%, #2D437F 100%);
                padding: 40px 40px 30px;
                text-align: center;
                position: relative;
            }
            
            .logo-container {
                width: 90px;
                height: 90px;
                background: linear-gradient(135deg, #F9872C 0%, #FF9D45 100%);
                border-radius: 22px;
                margin: 0 auto 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 15px 35px rgba(249, 135, 44, 0.3);
            }
            
            .logo {
                width: 50px;
                height: auto;
                color: white;
                font-size: 40px;
                font-weight: bold;
            }
            
            .title {
                font-size: 36px;
                font-weight: 800;
                background: linear-gradient(135deg, #F9872C 0%, #FF9D45 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                margin-bottom: 8px;
            }
            
            .subtitle {
                color: rgba(255, 255, 255, 0.9);
                font-size: 16px;
                font-weight: 500;
            }
            
            .content {
                padding: 40px;
            }
            
            .greeting {
                font-size: 24px;
                font-weight: 700;
                color: #192F59;
                margin-bottom: 20px;
            }
            
            .payment-card {
                background: linear-gradient(135deg, #FFF8F2 0%, #FFFDFB 100%);
                border-radius: 20px;
                padding: 30px;
                border: 2px solid rgba(249, 135, 44, 0.2);
                margin: 25px 0;
            }
            
            .amount {
                font-size: 48px;
                font-weight: 800;
                background: linear-gradient(135deg, #F9872C 0%, #FF9D45 100%);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                text-align: center;
                margin: 10px 0;
            }
            
            .details {
                border-top: 2px dashed rgba(249, 135, 44, 0.2);
                margin-top: 25px;
                padding-top: 25px;
            }
            
            .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid rgba(249, 135, 44, 0.1);
            }
            
            .detail-label {
                color: #718096;
                font-size: 14px;
                font-weight: 500;
            }
            
            .detail-value {
                color: #192F59;
                font-size: 14px;
                font-weight: 600;
            }
            
            .success-icon {
                width: 60px;
                height: 60px;
                background: linear-gradient(135deg, #48BB78 0%, #38A169 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 25px;
                color: white;
                font-size: 30px;
            }
            
            .footer {
                background: linear-gradient(135deg, #1A202C 0%, #2D3748 100%);
                color: #CBD5E0;
                text-align: center;
                padding: 30px;
                font-size: 14px;
            }
            
            .support-email {
                color: #F9872C;
                text-decoration: none;
                font-weight: 600;
            }
            
            .support-email:hover {
                color: #FF9D45;
            }
            
            .note {
                color: #A0AEC0;
                font-size: 12px;
                margin-top: 20px;
            }
            
            @media only screen and (max-width: 600px) {
                .content {
                    padding: 30px 25px;
                }
                
                .header {
                    padding: 30px 25px 25px;
                }
                
                .title {
                    font-size: 28px;
                }
                
                .amount {
                    font-size: 36px;
                }
            }
        </style>
    </head>
    
    <body>
        <div class="email-container">
            <div class="header">
                <div class="logo-container">
                    <div class="logo">V</div>
                </div>
                <h1 class="title">Payment Successful!</h1>
                <p class="subtitle">Thank you for your purchase</p>
            </div>
            
            <div class="content">
                <div class="greeting">Dear ${name},</div>
                
                <p style="color: #4A5568; font-size: 16px; margin-bottom: 20px;">
                    Your payment has been successfully processed. You now have access to your purchased courses.
                </p>
                
                <div class="payment-card">
                    <div class="amount">₹${amount}</div>
                    
                    <div class="details">
                        <div class="detail-row">
                            <span class="detail-label">Payment ID</span>
                            <span class="detail-value">${paymentId}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Order ID</span>
                            <span class="detail-value">${orderId}</span>
                        </div>
                        <div class="detail-row">
                            <span class="detail-label">Date</span>
                            <span class="detail-value">${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                    </div>
                </div>
                
                <p style="color: #4A5568; font-size: 15px; margin-top: 25px;">
                    You can now access your courses from your dashboard. Start learning today!
                </p>
            </div>
            
            <div class="footer">
                <p>Need help? Contact us at <a href="mailto:support@vidyawati.com" class="support-email">teamvidyawati@gmail.com</a></p>
                <p class="note">© ${new Date().getFullYear()} Vidyawati. All rights reserved.</p>
            </div>
        </div>
    </body>
    
    </html>`;
};