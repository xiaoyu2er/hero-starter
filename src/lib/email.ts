import { Resend } from "resend";
import ResetPasswordTemplate from "~/emails/rest-password";
import VerifyEmailTemplate from "~/emails/verify-email";
import { v4 as uuid } from 'uuid';

export async function sendVerifyEmail(
  user: { name: string; email: string },
  url: string
) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error("RESEND_API_KEY or EMAIL_FROM is not set");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "",
    to: [user.email],
    subject: "Verify your email address",
    react: VerifyEmailTemplate({
      email: user.email,
      url,
      appName: import.meta.env.VITE_APP_NAME ?? "",
    }),
    headers: {
      // https://github.com/resend/resend-examples/tree/main/with-prevent-thread-on-gmail
      // send Resend emails with prevent thread on Gmail
      'X-Entity-Ref-ID': uuid(),
    },
  });

  if (error) {
    throw error;
  }
  return data;
}

export async function sendResetPasswordEmail(
  user: { name: string; email: string },
  url: string
) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error("RESEND_API_KEY or EMAIL_FROM is not set");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "",
    to: [user.email],
    subject: "Reset your password",
    react: ResetPasswordTemplate({
      email: user.email,
      url,
      appName: import.meta.env.VITE_APP_NAME ?? "",
    }),
    headers: {
      'X-Entity-Ref-ID': uuid(),
    },
  });

  if (error) {
    throw error;
  }
  return data;
}
