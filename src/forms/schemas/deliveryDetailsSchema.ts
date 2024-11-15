import { z } from "zod";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

export const deliveryDetailsFormSchema = z.object({
  email: z.string().email({ message: "Incorrect format for e-mail address" }),
  firstName: z
    .string()
    .min(2, { message: "First name must contain atleast 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must contain atleast 2 characters" }),
  phoneNumber: z.string().regex(phoneNumberRegex, {
    message: "Incorrect format for phone number",
  }),
  streetAddress: z.string(),
  houseNumber: z.string(),
  localNumber: z.string().optional(),
  postalCode: z
    .string()
    .length(6, { message: "Postal code must contain exactly 5 characters" }),
  city: z.string(),
});
