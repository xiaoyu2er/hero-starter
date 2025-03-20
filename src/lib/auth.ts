import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI } from 'better-auth/plugins';
import { oneTap } from 'better-auth/plugins';
import { sendResetPasswordEmail, sendVerifyEmail } from './email';

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: import.meta.env.VITE_APP_NAME,
  advanced: {
    cookiePrefix: import.meta.env.VITE_APP_NAME?.toLowerCase().replace(
      / /g,
      '-'
    ),
  },
  // https://www.better-auth.com/docs/reference/options#account
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github', 'email-password'],
      allowDifferentEmails: true,
    },
  },
  emailAndPassword: {
    enabled: true,
    disableSignUp: false,
    requireEmailVerification: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
    autoSignIn: true,
    sendResetPassword: async ({ user, url }) => {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log('~sendResetPassword', user, url);
      await sendResetPasswordEmail(user, url);
    },
    resetPasswordTokenExpiresIn: 3600, // 1 hour
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      // biome-ignore lint/suspicious/noConsoleLog: <explanation>
      // biome-ignore lint/suspicious/noConsole: <explanation>
      console.log('~sendVerifyEmail', user.email, url);
      await sendVerifyEmail(user, url);
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [openAPI(), oneTap()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.VITE_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // https://www.better-auth.com/docs/concepts/rate-limit
  rateLimit: {
    storage: 'database',
  },
});
