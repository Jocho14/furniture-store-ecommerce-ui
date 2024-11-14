import { useRef, useImperativeHandle, forwardRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";

import { ClientCreateDto } from "@/interfaces/client";
import { registerUser } from "@/api/client/account";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { customerInfoSchema } from "@/forms/schemas/customerInfoSchema";
import { customerInfoFormFields } from "@/forms/fields/customerInfoFormFields";

export interface CustomerInfoFormHandles {
  submit: () => void;
}

const defaultValues = customerInfoFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

export const CustomerInfoForm = forwardRef<CustomerInfoFormHandles>(
  (_, ref) => {
    const form = useForm<z.infer<typeof customerInfoSchema>>({
      resolver: zodResolver(customerInfoSchema),
      defaultValues: customerInfoFormFields.reduce((acc, field) => {
        acc[field.name] = "";
        return acc;
      }, {} as Record<string, string>),
    });

    const onSubmit = (values: z.infer<typeof customerInfoSchema>) => {
      console.log("Submitted values:", values);
    };

    useImperativeHandle(ref, () => ({
      submit: () => form.handleSubmit(onSubmit)(),
    }));

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 px-5 pb-5 flex flex-col justify-center"
        >
          {customerInfoFormFields.map((field) => (
            <FormFieldComponent
              key={field.name}
              control={form.control}
              name={field.name}
              type={field.type}
              label={field.label}
            />
          ))}
        </form>
      </Form>
    );
  }
);
