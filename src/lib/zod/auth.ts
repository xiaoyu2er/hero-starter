import { z } from "zod";
import { zEmail, zPassword } from "./common";

export const zLoginSchema = z.object({
  email: zEmail,
  password: zPassword,
});
