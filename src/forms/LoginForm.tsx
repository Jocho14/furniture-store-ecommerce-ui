import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { loginFormSchema } from "@/forms/schemas/loginSchema";
import { loginFormFields } from "@/forms/fields/loginFormFields";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "@/api/client/account";
import { loginEmployee } from "@/api/employee/account";

import Loader from "@/components/Loader/Loader";

import { useToast } from "@/components/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
  role: "client" | "employee";
}

const defaultValues = loginFormFields.reduce((acc, field) => {
  acc[field.name] = "";
  return acc;
}, {} as Record<string, string>);

export const LoginForm: React.FC<LoginFormProps> = ({ role }) => {
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: defaultValues,
  });
  const { toast } = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: role === "client" ? loginUser : loginEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authStatus"] });
      toast({
        variant: "constructive",
        title: "Logged in!",
        description: "You are now logged in.",
      });
      role === "client" ? navigate("/") : navigate("/employee");
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
      form.resetField("password");
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    loginMutation.mutate(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {loginFormFields.map((field) => (
          <FormFieldComponent
            key={field.name}
            control={form.control}
            name={field.name}
            type={field.type}
            label={field.label}
          />
        ))}
        <Button type="submit">
          {loginMutation.isPending ? <Loader /> : "Log in"}
        </Button>
      </form>
    </Form>
  );
};
