import { z } from "zod";

export const shippingInfoFormSchema = z.object({
  street: z.string(),
  houseNumber: z.string(),
  localNumber: z.string().optional(),
  postalCode: z
    .string()
    .length(6, { message: "Kod pocztowy musi mieć 5 znaków" }),
  city: z.string(),
});
