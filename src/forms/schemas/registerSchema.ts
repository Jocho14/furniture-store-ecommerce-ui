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
    secret: z.string().optional(),
    email: z.string().email({ message: "Incorrect format for e-mail address" }),
    password: z
      .string()
      .min(8, { message: "Password must contain atleast 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must contain atleast 8 characters" }),
    firstName: z
      .string()
      .min(2, { message: "First name must contain atleast 2 characters" }),
    lastName: z
      .string()
      .min(2, { message: "Last name must contain atleast 2 characters" }),
    phoneNumber: z.string().regex(phoneNumberRegex, {
      message: "Incorrect format for phone number",
    }),
    dateOfBirth: z.preprocess(
      (value) => (typeof value === "string" ? new Date(value) : value),
      z.date().refine(
        (date) => {
          const age = calculateAge(date);
          return age >= minAge;
        },
        {
          message: `You have to be atleast ${minAge} years old`,
        }
      )
    ),
    termsAccepted: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
