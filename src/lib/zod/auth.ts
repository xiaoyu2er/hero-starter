import { z } from "zod";
import { zEmail, zPassword } from "./common";

export const zLoginSchema = z.object({
  email: zEmail,
  password: zPassword,
  rememberMe: z.boolean(),
});

export const zSignUpSchema = z.object({
  email: zEmail,
  password: zPassword,
  name: z.string().min(1),
  acceptTerms: z.boolean().refine((val) => val, {
    message: "You must accept the terms and conditions",
  }),
});

export const zForgotPasswordSchema = z.object({
  email: zEmail,
});

export const zResetPasswordSearchSchema = z.object({
  token: z.string().optional(),
  error: z.string().optional(),
});

export const zResetPasswordSchema = z.object({
  newPassword: zPassword,
  token: z.string().min(1, "Token is required"),
});
