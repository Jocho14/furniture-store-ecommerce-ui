import { z } from "zod";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

const minAge = 18;

const calculateAge = (birthDate: Date) => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

export const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Niepoprawny format adresu e-mail" }),
    password: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
    firstName: z
      .string()
      .min(2, { message: "Imię musi mieć co najmniej 2 znaki" }),
    lastName: z
      .string()
      .min(2, { message: "Nazwisko musi mieć co najmniej 2 znaki" }),
    phoneNumber: z.string().regex(phoneNumberRegex, {
      message: "Niepoprawny format numeru telefonu",
    }),
    dateOfBirth: z.preprocess(
      (value) => (typeof value === "string" ? new Date(value) : value),
      z.date().refine(
        (date) => {
          const age = calculateAge(date);
          return age >= minAge;
        },
        {
          message: `Musisz mieć conajmniej ${minAge} lat`,
        }
      )
    ),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie pasują do siebie",
    path: ["confirmPassword"],
  });
