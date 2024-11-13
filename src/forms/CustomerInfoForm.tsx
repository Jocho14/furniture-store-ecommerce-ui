import { useRef } from "react";
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

const defaultValues = customerInfoFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

export const CustomerInfoForm: React.FC = () => {
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const form = useForm<z.infer<typeof customerInfoSchema>>({
    resolver: zodResolver(customerInfoSchema),
    defaultValues: defaultValues,
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: any) => {
      console.log("User registered:", data);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const onSubmit = (values: z.infer<typeof customerInfoSchema>) => {
    // const clientCreateDto: ClientCreateDto = {
    //   account: {
    //     email: values.email,
    //     password: values.password,
    //   },
    //   firstName: values.firstName,
    //   lastName: values.lastName,
    //   phoneNumber: values.phoneNumber,
    //   dateOfBirth: values.dateOfBirth,
    // };
    // mutation.mutate(clientCreateDto);
  };

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
};
