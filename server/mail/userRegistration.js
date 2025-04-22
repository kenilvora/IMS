export const userRegistrationTemplate = (name, email, password) => {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8" />
            <title>Your Account Details</title>
            <style>
            body {
                font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                background-color: #f4f4f7;
                margin: 0;
                padding: 0;
                color: #333333;
            }
            .email-container {
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            .header {
                text-align: center;
                padding-bottom: 20px;
            }
            .header h1 {
                color: #4a90e2;
                margin: 0;
            }
            .content {
                line-height: 1.6;
                font-size: 16px;
            }
            .credentials {
                background-color: #f0f4f8;
                padding: 15px;
                border-radius: 6px;
                margin: 20px 0;
            }
            .credentials p {
                margin: 10px 0;
                font-weight: bold;
            }
            .footer {
                text-align: center;
                font-size: 12px;
                color: #777777;
                margin-top: 20px;
            }
            .btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: #4a90e2;
                color: #ffffff;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
            </style>
        </head>
        <body>
            <div class="email-container">
            <div class="header">
                <h1>Welcome to Intern Hub!</h1>
            </div>
            <div class="content">
                <p>Hi <strong>${name}</strong>,</p>
                <p>
                We're excited to have you on board. Here are your account details:
                </p>

                <div class="credentials">
                <p>Email: <span>${email}</span></p>
                <p>Password: <span>${password}</span></p>
                </div>

                <p>
                For your security, please log in and change your password as soon as
                possible.
                </p>

                <a href="http://localhost:5173/" class="btn" target="_blank" rel="noopener noreferrer">Log In Now</a>

                <p>
                If you have any questions or need help, feel free to reach out to us
                anytime.
                </p>
            </div>
            <div class="footer">
                &copy; 2025 Intern Hub. All rights reserved.
            </div>
            </div>
        </body>
        </html>

    
    `;
};
