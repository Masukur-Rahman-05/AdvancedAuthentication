import { resend } from "./config.js";
import {
  emailVerificationTemplate,
  welcomeEmailTemplate,
  forgotPasswordEmailTemplate,
  passwordResetEmailTemplate,
} from "./email-templates.js";


export const sendVerificationEmail = async (email, verificationToken) => {

    try {
        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [email],
          subject: "Verify Your Email",
          html: emailVerificationTemplate.replace("{verificationToken}", verificationToken),
        });
      
      console.log('Email sent successfully');
    } catch (error) {
        console.log("Error in sending verification email", error);
    }
}




//.........................Welcome Email........................................

// export const sendVerificationEmail = async (email, verificationToken) => {
//   console.log("Starting email verification process..."); // Debug log

//   if (!email || !verificationToken) {
//     throw new Error("Email and verification token are required");
//   }

//   try {
//     if (!process.env.RESEND_API_KEY) {
//       throw new Error("RESEND_API_KEY is not configured");
//     }

//     console.log(`Attempting to send email to: ${email}`); // Debug log

//     const response = await resend.emails.send({
//       from: "Acme <onboarding@resend.dev>",
//       to: [email],
//       subject: "Verify Your Email",
//       html: emailVerificationTemplate.replace(
//         "{verificationToken}",
//         verificationToken
//       ),
//     });

//     if (response.error) {
//       throw new Error(`Resend API Error: ${response.error.message}`);
//     }

//     console.log("Email sent successfully:", response.data); // Debug log
//     return response.data;
//   } catch (error) {
//     console.error("Verification email error:", {
//       message: error.message,
//       stack: error.stack,
//       email: email,
//       // Don't log the actual token for security
//       tokenPresent: !!verificationToken,
//     });
//     throw error; // Re-throw the error so it's caught by the calling function
//   }
// };
export const sendWelcomeEmail = async (email, username) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Congratulation",
      html: welcomeEmailTemplate.replace(
        "{username}",
        username
      ),
    });
  } catch (error) {
    console.log("Error in sending Welcome email", error);
  }
};


//...........................Forgot Password .........................

export const PasswordResetEmail = async (email,resetLink, username) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Reset Your Password",
      html: forgotPasswordEmailTemplate
        .replace("{{username}}", username)
        .replace("{{resetLink}}", resetLink),
    });
  } catch (error) {
    console.log("Error in sending forgotPassword email", error);
  }
};




//.........................................Password Reset Successful..............................


export const PasswordResetSuccessfulEmail = async (email) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Successfully Reset Your Password",
      html: passwordResetEmailTemplate,
    });
  } catch (error) {
    console.log("Error in sending forgotPassword email", error);
  }
};


