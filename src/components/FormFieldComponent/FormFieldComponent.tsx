import React from "react";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  control: any;
  name: string;
  placeholder?: string;
  type?: string;
  label?: string;
  onDashInsertion?: (value: string) => string;
}

const FormFieldComponent: React.FC<Props> = ({
  control,
  name,
  placeholder,
  type,
  label,
  onDashInsertion,
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
              onChange={(e) =>
                field.onChange(
                  onDashInsertion
                    ? onDashInsertion(e.target.value)
                    : e.target.value
                )
              }
              className="rounded-md"
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FormFieldComponent;
