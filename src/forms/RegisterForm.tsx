import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
// import { Checkbox } from "@/components/ui/checkbox";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { registerFormSchema } from "@/forms/schemas/registerSchema";
import { registerFormFields } from "@/forms/fields/registerFormFields";

const defaultValues = registerFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

export const RegisterForm: React.FC = () => {
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {registerFormFields.map((field) => (
          <FormFieldComponent
            control={form.control}
            name={field.name}
            type={field.type}
            label={field.label}
          />
        ))}

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

        <div className="flex items-center space-x-2 pt-10">
          {/* <Controller
            name="termsAccepted"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            )}
          /> */}
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Przeczytałem(-am) i zrozumiałem(-am) Regulamin oraz Politykę
            prywatności.
          </label>
        </div>
        <Button type="submit">Utwórz konto</Button>
      </form>
    </Form>
  );
};
