import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Incorrect format for e-mail address" }),
  password: z
    .string()
    .min(8, { message: "Password must contain atleast 8 characters" }),
});
