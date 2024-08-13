import { z } from "zod";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Niepoprawny format adresu e-mail" }),
    password: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    name: z.string().min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
    surname: z
      .string()
      .min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki" }),
    phoneNumber: z.string().regex(phoneNumberRegex, {
      message: "Niepoprawny format numeru telefonu",
    }),
    street: z.string(),
    houseNumber: z.string(),
    localNumber: z.string().optional(),
    postalCode: z
      .string()
      .length(6, { message: "Kod pocztowy musi mieć 5 znaków" }),
    city: z.string(),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie pasują do siebie",
    path: ["confirmPassword"],
  });
