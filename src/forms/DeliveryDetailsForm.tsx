import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import { DeliveryTruck, User } from "iconoir-react";

import { deliveryDetailsFormSchema } from "@/forms/schemas/deliveryDetailsSchema";
import { deliveryDetailsFormFields } from "@/forms/fields/deliveryDetailsFormFields";

import { useMutation } from "@tanstack/react-query";
import { createGuestOrder } from "@/api/guest/orders";

import { useCart } from "@/context/client/CartContext";
import { useNavigate } from "react-router-dom";

import {
  CreateGuestOrderDto,
  GuestDto,
  ShippingAddressDto,
  OrderProductDto,
} from "@/interfaces/order";

const createOrderPayload = (
  values: z.infer<typeof deliveryDetailsFormSchema>,
  orderProductDtos: OrderProductDto[]
): CreateGuestOrderDto => {
  const guestDto: GuestDto = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    phoneNumber: values.phoneNumber,
  };

  const shippingAddressDto: ShippingAddressDto = {
    streetAddress: values.streetAddress,
    houseNumber: values.houseNumber,
    postalCode: values.postalCode,
    city: values.city,
  };

  return {
    guestDto,
    shippingAddressDto,
    orderProductDtos,
  };
};

const defaultValues = deliveryDetailsFormFields.reduce((acc, field) => {
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

export const DeliveryDetailsForm = () => {
  const form = useForm<z.infer<typeof deliveryDetailsFormSchema>>({
    resolver: zodResolver(deliveryDetailsFormSchema),
    defaultValues: defaultValues,
  });

  const { cart } = useCart();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () =>
      createGuestOrder(createOrderPayload(form.getValues(), cart)),
    onSuccess: (orderId: number) => {
      console.log("Product added successfully:", orderId);
      navigate(`/order/checkout/${orderId}`);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });

  const handleSubmit = () => {
    event?.preventDefault();
    mutation.mutate();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {deliveryDetailsFormFields.map((field) => {
          return (
            <div key={field.name}>
              {field.name === "firstName" && (
                <h1 className="flex gap-x-2 mb-3">
                  Customer Details <User />
                </h1>
              )}

              {field.name === "streetAddress" && (
                <h1 className="flex gap-x-2 mb-3">
                  Shipping Details <DeliveryTruck />
                </h1>
              )}

              <FormFieldComponent
                control={form.control}
                name={field.name}
                type={field.type}
                label={field.label}
                onDashInsertion={
                  field.name === "postalCode" ? handleDashInsertion : undefined
                }
              />
            </div>
          );
        })}

        <Button type="submit">Create Order</Button>
      </form>
    </Form>
  );
};
