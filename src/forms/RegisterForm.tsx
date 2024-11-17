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

import { registerFormSchema } from "@/forms/schemas/registerSchema";
import { registerFormFields } from "@/forms/fields/registerFormFields";

import { useToast } from "@/components/hooks/use-toast";

import Loader from "@/components/Loader/Loader";

const defaultValues = registerFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

export const RegisterForm: React.FC = () => {
  const labelRef = useRef<HTMLLabelElement | null>(null);
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: defaultValues,
  });
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast({
        variant: "constructive",
        title: "Account created!",
        description: "You can now log in.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
    if (!values.termsAccepted) {
      if (labelRef.current) {
        labelRef.current.classList.add("text-red-500");
        labelRef.current.classList.remove("text-black");
      }
      return;
    } else {
      if (labelRef.current) {
        labelRef.current.classList.add("text-black");
        labelRef.current.classList.remove("text-red-500");
      }
    }

    const clientCreateDto: ClientCreateDto = {
      account: {
        email: values.email,
        password: values.password,
      },
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      dateOfBirth: values.dateOfBirth,
    };

    mutation.mutate(clientCreateDto);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {registerFormFields.map((field) => (
          <FormFieldComponent
            key={field.name}
            control={form.control}
            name={field.name}
            type={field.type}
            label={field.label}
          />
        ))}

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
            I have read and understood the Terms and Conditions and Privacy
            Policy.
          </label>
        </div>
        <Button type="submit">
          {mutation.isPending ? <Loader /> : "Create account"}
        </Button>
      </form>
    </Form>
  );
};
