interface EmailTemplateOptions {
  name?: string;
  year?: number;
  resetLink?: string;
  postTitle?: string;
  postLink?: string;
}

export const getRegistrationTemplate = (
  options: EmailTemplateOptions
): string => {
  const { name, year } = options;
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Welcome to Our Blog</title>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .content {
            text-align: center;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to Our Blog</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for registering at our blog. We are excited to have you on board.</p>
            <p>Stay tuned for our latest blog posts and updates!</p>
            <p>If you have any questions, feel free to reach out to us.</p>
          </div>
          <div class="footer">
            <p>&copy; ${year} Our Blog. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const getPasswordResetTemplate = (
  options: EmailTemplateOptions
): string => {
  const { name, year, resetLink } = options;
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Password Reset Request</title>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .content {
            text-align: center;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
          }
          .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to reset your password:</p>
            <p><a href="${resetLink}" class="button">Reset Password</a></p>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; ${year} Our Blog. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};

export const getNewBlogPostTemplate = (
  options: EmailTemplateOptions
): string => {
  const { name, year, postTitle, postLink } = options;
  return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>New Blog Post</title>
        <style>
          .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .content {
            text-align: center;
            margin-bottom: 20px;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #777;
          }
          .button {
            background-color: #007bff;
            color: white;
            padding: 10px 20px;
            text-align: center;
            text-decoration: none;
            border-radius: 5px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Blog Post Alert!</h1>
          </div>
          <div class="content">
            <p>Hi ${name},</p>
            <p>We have just published a new blog post titled "${postTitle}".</p>
            <p>Click the button below to read it:</p>
            <p><a href="${postLink}" class="button">Read Blog Post</a></p>
            <p>Stay tuned for more updates and posts.</p>
          </div>
          <div class="footer">
            <p>&copy; ${year} Our Blog. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;
};
