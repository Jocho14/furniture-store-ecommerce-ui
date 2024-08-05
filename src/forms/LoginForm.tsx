import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

const loginFormSchema = z.object({
  email: z.string().email({ message: "Niepoprawny format adresu e-mail" }),
  password: z
    .string()
    .min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
});

export const LoginForm: React.FC = () => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof loginFormSchema>) {
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
        <Button type="submit">Zaloguj</Button>
      </form>
    </Form>
  );
};
