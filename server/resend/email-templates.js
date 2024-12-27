//............................Verification Email Template ....................................

export const emailVerificationTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Email Verification</title>
  </head>
  <body style="background: linear-gradient(to right, #2c2c2c, #000000); margin: 0; padding: 0; font-family: Arial, sans-serif; color: #f4f4f4;">
    <!-- Outer Container -->
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="background-color: #2c2c2c; padding: 20px 0;"
    >
      <tr>
        <td align="center">
          <!-- Main Content -->
          <table
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);"
          >
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px; border-bottom: 1px solid #444444;">
                <h1 style="font-size: 24px; color: #ffffff; margin: 0;">Verify Your Email</h1>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 20px 0;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0; color: #f4f4f4;">
                  Thank you for creating an account with us. To verify your email address and activate your account, please use the verification code below.
                </p>
                <p style="font-size: 14px; line-height: 1.5; margin-top: 20px; margin-bottom: 0; text-align: center; color: #dddddd;">
                  Your verification code is:
                </p>
                <!-- Verification Code -->
                <p
                  style="
                    font-size: 28px;
                    font-weight: bold;
                    color: #ff5722;
                    text-align: center;
                    margin: 15px 0;
                  "
                >
                  {verificationToken}
                </p>
                <p style="font-size: 14px; line-height: 1.5; margin: 0; text-align: center; color: #dddddd;">
                  This code is valid for <strong>15 minutes</strong>. If you did not request this, please ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding-top: 20px;
                  border-top: 1px solid #444444;
                  font-size: 12px;
                  color: #999999;
                "
              >
                <p style="margin: 0; color: #dddddd;">This is an automated email. Please do not reply.</p>
                <p style="margin: 5px 0; color: #dddddd;">
                  If you have questions, contact our support team at
                  <a href="mailto:support@example.com" style="color: #0073e6; text-decoration: none;">support@example.com</a>.
                </p>
                <p style="margin: 5px 0; color: #dddddd;">&copy; 2024 Your Company Name. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

`;









//..............................Welcome Email Template...............................


export const welcomeEmailTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome Email</title>
  </head>
  <body style="background: linear-gradient(to right, #333333, #000000); margin: 0; padding: 0; font-family: Arial, sans-serif; color: #f4f4f4;">
    <!-- Outer Container -->
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      border="0"
      style="background-color: #333333; padding: 20px 0;"
    >
      <tr>
        <td align="center">
          <!-- Main Content -->
          <table
            width="600"
            cellspacing="0"
            cellpadding="0"
            border="0"
            style="background-color: #1a1a1a; padding: 30px; border-radius: 8px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);"
          >
            <!-- Header -->
            <tr>
              <td align="center" style="padding-bottom: 20px; border-bottom: 1px solid #444444;">
                <h1 style="font-size: 24px; color: #ffffff; margin: 0;">Welcome to Our Platform!</h1>
              </td>
            </tr>

            <!-- Body Content -->
            <tr>
              <td style="padding: 20px 0;">
                <p style="font-size: 16px; line-height: 1.5; margin: 0; color: #f4f4f4;">
                  Hi <strong>{username}</strong>,
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 15px 0; color: #dddddd;">
                  We're thrilled to have you here! 🎉 You’ve successfully joined our platform, and we’re excited to help you get started.
                </p>
                <p style="font-size: 16px; line-height: 1.5; margin: 0; color: #dddddd;">
                  Here’s what you can do next:
                </p>

                <!-- Steps Section -->
                <ul style="font-size: 14px; line-height: 1.8; margin: 20px 0; padding-left: 20px; color: #f4f4f4;">
                  <li>Complete your profile to personalize your experience.</li>
                  <li>Explore our features and tools to get started.</li>
                  <li>Check out our <a href="{guideLink}" style="color: #0073e6; text-decoration: none;">Getting Started Guide</a>.</li>
                </ul>

                <p style="font-size: 16px; line-height: 1.5; margin: 0; color: #dddddd;">
                  If you have any questions, feel free to reach out to us. We’re here to help!
                </p>
              </td>
            </tr>

            <!-- Call to Action Button -->
            <tr>
              <td align="center" style="padding: 20px 0;">
                <a
                  href="{dashboardLink}"
                  style="
                    background-color: #0073e6;
                    color: #ffffff;
                    text-decoration: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    font-size: 16px;
                    font-weight: bold;
                  "
                >
                  Go to Dashboard
                </a>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                align="center"
                style="
                  padding-top: 20px;
                  border-top: 1px solid #444444;
                  font-size: 12px;
                  color: #999999;
                "
              >
                <p style="margin: 0; color: #dddddd;">This is an automated email. Please do not reply.</p>
                <p style="margin: 5px 0; color: #dddddd;">
                  If you have any questions, contact us at
                  <a href="mailto:support@example.com" style="color: #0073e6; text-decoration: none;">support@example.com</a>.
                </p>
                <p style="margin: 5px 0; color: #dddddd;">&copy; 2024 Your Company Name. All rights reserved.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`;







//.............................................Forgot password email template...............................


export const forgotPasswordEmailTemplate = `<!DOCTYPE html>
<html>
<head>
    <title>Password Reset</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: linear-gradient(to right, #333333, #000000); line-height: 1.6;">
    <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#333333">
        <tr>
            <td align="center" style="padding: 20px;">
                <table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#1a1a1a" style="border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);">
                    
                    <!-- Header -->
                    <tr>
                        <td bgcolor="#222222" align="center" style="padding: 20px;">
                            <h2 style="color: #ffffff; font-size: 22px; margin: 0;">Reset Your Password</h2>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding: 20px; color: #dddddd; font-size: 16px;">
                            <p style="margin: 0 0 15px;">Hi <strong>{{username}}</strong>,</p>
                            <p style="margin: 0 0 15px;">Click the link below to reset your password:</p>

                            <!-- Reset Link -->
                            <p style="text-align: center; margin: 20px 0;">
                                <a href="{{resetLink}}" style="color: #ffffff; background-color: #ff5722; text-decoration: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; display: inline-block;">Reset Password</a>
                            </p>

                            <p style="margin: 0;">If you did not request this, please ignore this email.</p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td align="center" style="padding: 10px; font-size: 12px; color: #777777; background-color: #222222;">
                            This link will expire in 15 minutes.
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>


`;





//..............................Password Reset successful email template.............................

export const passwordResetEmailTemplate = `<!DOCTYPE html>
<html>
<head>
    <title>Password Reset Successful</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="background: linear-gradient(135deg, #1f1f1f, #3b3b3b); color: #ffffff; padding: 40px 20px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">Password Reset Successful</h1>
        <p style="margin: 20px 0; font-size: 16px; line-height: 1.5; color: #d1d1d1;">
            Your password has been reset successfully. You can now log in to your account with your new password.
        </p>
        <div style="margin: 30px 0;">
            <a href="#" style="display: inline-block; text-decoration: none; color: #ffffff; background-color: #4caf50; padding: 12px 25px; border-radius: 5px; font-weight: bold; font-size: 16px;">
                Login to Your Account
            </a>
        </div>
        <p style="font-size: 12px; color: #a8a8a8; margin-top: 30px;">
            If you did not initiate this request, please contact our support team immediately.
        </p>
    </div>
</body>
</html>
`;