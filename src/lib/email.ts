import { Resend } from 'resend';
import { v4 as uuid } from 'uuid';
import ResetPasswordTemplate from '~/emails/rest-password';
import VerifyEmailTemplate from '~/emails/verify-email';

export async function sendVerifyEmail(
  user: { name: string; email: string },
  url: string
) {
  if (!process.env.RESEND_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error('RESEND_API_KEY or EMAIL_FROM is not set');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? '',
    to: [user.email],
    subject: 'Verify your email address',
    react: VerifyEmailTemplate({
      email: user.email,
      url,
      appName: import.meta.env.VITE_APP_NAME ?? '',
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
    throw new Error('RESEND_API_KEY or EMAIL_FROM is not set');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? '',
    to: [user.email],
    subject: 'Reset your password',
    react: ResetPasswordTemplate({
      email: user.email,
      url,
      appName: import.meta.env.VITE_APP_NAME ?? '',
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

export function getMailLink(email: string): string {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) {
    return '';
  }
  // Map common email domains to their webmail URLs
  switch (domain) {
    case 'gmail.com':
    case 'googlemail.com':
      return 'https://mail.google.com/mail/';
    case 'outlook.com':
    case 'hotmail.com':
    case 'live.com':
    case 'msn.com':
      return 'https://outlook.live.com/mail/inbox';
    case 'yahoo.com':
    case 'ymail.com':
      return 'https://mail.yahoo.com/';
    case 'icloud.com':
    case 'me.com':
    case 'mac.com':
      return 'https://www.icloud.com/mail/';
    case 'aol.com':
      return 'https://mail.aol.com/';
    case 'protonmail.com':
    case 'pm.me':
      return 'https://mail.proton.me/inbox';
    case 'zoho.com':
      return 'https://mail.zoho.com/';
    case 'yandex.com':
      return 'https://mail.yandex.com/';
    case 'qq.com':
      return 'https://mail.qq.com/';
    case '163.com':
    case '126.com':
      return 'https://mail.163.com/';
    default:
      return '';
  }
}
