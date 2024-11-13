import { z } from "zod";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

export const customerInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must contain atleast 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must contain atleast 2 characters" }),
  phoneNumber: z.string().regex(phoneNumberRegex, {
    message: "Incorrect format for phone number",
  }),
});
