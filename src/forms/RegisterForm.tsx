import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

const phoneNumberRegex = /^\+?[1-9]\d{1,14}$/;

const registerFormSchema = z
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
      .length(6, { message: "Kod pocztowy musi mieć 6 znaków" }),
    city: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie pasują do siebie",
    path: ["confirmPassword"],
  });

export const RegisterForm: React.FC = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      surname: "",
      phoneNumber: "",
      street: "",
      houseNumber: "",
      localNumber: "",
      postalCode: "",
      city: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        <FormFieldComponent
          control={form.control}
          name="name"
          type="text"
          label="Imię"
        />
        <FormFieldComponent
          control={form.control}
          name="surname"
          type="text"
          label="Nazwisko"
        />
        <FormFieldComponent
          control={form.control}
          name="email"
          type="email"
          label="E-mail"
        />
        <FormFieldComponent
          control={form.control}
          name="password"
          type="password"
          label="Hasło"
        />
        <FormFieldComponent
          control={form.control}
          name="repeatPassword"
          type="password"
          label="Potwórz hasło"
        />
        <FormFieldComponent
          control={form.control}
          name="phoneNumber"
          type="number"
          label="Telefon komórkowy"
        />
        <FormFieldComponent
          control={form.control}
          name="street"
          type="text"
          label="Ulica"
        />
        <FormFieldComponent
          control={form.control}
          name="houseNumber"
          type="text"
          label="Nr domu"
        />
        <FormFieldComponent
          control={form.control}
          name="localNumber"
          type="text"
          label="Nr lokalu"
        />
        <InputOTP maxLength={5}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
          </InputOTPGroup>
        </InputOTP>

        <FormFieldComponent
          control={form.control}
          name="city"
          type="text"
          label="Miasto"
        />
        <div className="flex items-center space-x-2 pt-10">
          <Checkbox id="terms" />
          <Label
            control={form.control}
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Przeczytałem(-am) i zrozumiałem(-am) Regulamin oraz Politykę
            prywatności.
          </Label>
        </div>
        <Button type="submit">Utwórz konto</Button>
      </form>
    </Form>
  );
};
