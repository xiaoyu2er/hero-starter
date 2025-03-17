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
