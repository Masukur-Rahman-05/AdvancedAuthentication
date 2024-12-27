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
    } catch (error) {
        console.log("Error in sending verification email", error);
    }
}




//.........................Welcome Email........................................

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


