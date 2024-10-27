import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { registerFormSchema } from "@/forms/schemas/registerSchema";
import { registerFormFields } from "@/forms/fields/registerFormFields";

const defaultValues = registerFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

const handleDashInsertion = (value: string) => {
  value = value.replace(/[^0-9-]/g, "");

  if (value.length === 3 && value[2] !== "-") {
    return value.slice(0, 2) + "-" + value.slice(2);
  }

  if (value.length === 2 && value[1] === "-") {
    return value.slice(0, 1);
  }

  return value;
};

export const RegisterForm: React.FC = () => {
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof registerFormSchema>) {
    if (!values.termsAccepted) {
      if (labelRef.current) {
        labelRef.current.classList.add("text-red-500");
        labelRef.current.classList.remove("text-black");
      }
    } else {
      if (labelRef.current) {
        labelRef.current.classList.add("text-black");
        labelRef.current.classList.remove("text-red-500");
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {registerFormFields.map((field) =>
          field.name === "postalCode" ? (
            <FormFieldComponent
              key={field.name}
              control={form.control}
              name={field.name}
              type={field.type}
              label={field.label}
              onDashInsertion={handleDashInsertion}
            />
          ) : (
            <FormFieldComponent
              control={form.control}
              name={field.name}
              type={field.type}
              label={field.label}
            />
          )
        )}

        <div className="flex items-center space-x-2 pt-10">
          <Controller
            name="termsAccepted"
            control={form.control}
            render={({ field }) => (
              <Checkbox
                id="terms"
                onClick={() => field.onChange(!field.value)}
                checked={field.value}
                onChange={(e) =>
                  field.onChange((e.target as HTMLInputElement).checked)
                }
              />
            )}
          />
          <label
            ref={labelRef}
            htmlFor="terms"
            className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
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
