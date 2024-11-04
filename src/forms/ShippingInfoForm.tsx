import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { shippingInfoFormSchema } from "@/forms/schemas/shippingInfoSchema";
import { shippingInfoFormFields } from "@/forms/fields/shippingInfoFormFields";

const defaultValues = shippingInfoFormFields.reduce((acc, field) => {
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

export const ShippingInfoForm: React.FC = () => {
  const form = useForm<z.infer<typeof shippingInfoFormSchema>>({
    resolver: zodResolver(shippingInfoFormSchema),
    defaultValues: defaultValues,
  });

  function onSubmit(values: z.infer<typeof shippingInfoFormSchema>) {}

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {shippingInfoFormFields.map((field) =>
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

        <div className="flex items-center space-x-2 pt-10"></div>
      </form>
    </Form>
  );
};
