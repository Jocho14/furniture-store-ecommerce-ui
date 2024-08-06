import React from "react";
import styles from "./styles.module.scss";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  control: any;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
}

const FormFieldComponent: React.FC<Props> = ({
  control,
  name,
  placeholder,
  type,
  label,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder ? placeholder : label}
              {...field}
              type={type}
              className="rounded-md"
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
