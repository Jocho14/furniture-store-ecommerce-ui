import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email({ message: "Niepoprawny format adresu e-mail" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});
