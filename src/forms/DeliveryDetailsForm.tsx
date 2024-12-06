import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldComponent from "@/components/FormFieldComponent/FormFieldComponent";

import {
  deliveryDetailsClientFormSchema,
  deliveryDetailsGuestFormSchema,
} from "@/forms/schemas/deliveryDetailsSchema";
import {
  deliveryDetailsClientFormFields,
  deliveryDetailsGuestFormFields,
} from "@/forms/fields/deliveryDetailsFormFields";

import { createClientOrder, createGuestOrder } from "@/api/guest/orders";

import { useCart } from "@/context/client/CartContext";
import { useAuth } from "@/context/common/AuthContext";

import { DeliveryTruck, User } from "iconoir-react";

import {
  CreateGuestOrderDto,
  GuestDto,
  ShippingAddressDto,
  OrderProductDto,
  CreateClientOrderDto,
} from "@/interfaces/order";

const createGuestOrderPayload = (
  values: z.infer<typeof deliveryDetailsGuestFormSchema>,
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

const createClientOrderPayload = (
  values: z.infer<typeof deliveryDetailsClientFormSchema>,
  orderProductDtos: OrderProductDto[]
): CreateClientOrderDto => {
  const shippingAddressDto: ShippingAddressDto = {
    streetAddress: values.streetAddress,
    houseNumber: values.houseNumber,
    postalCode: values.postalCode,
    city: values.city,
  };

  return {
    shippingAddressDto,
    orderProductDtos,
  };
};

const defaultValues = deliveryDetailsGuestFormFields.reduce((acc, field) => {
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
  const guestForm = useForm<z.infer<typeof deliveryDetailsGuestFormSchema>>({
    resolver: zodResolver(deliveryDetailsGuestFormSchema),
    defaultValues: defaultValues,
  });
  const clientForm = useForm<z.infer<typeof deliveryDetailsClientFormSchema>>({
    resolver: zodResolver(deliveryDetailsClientFormSchema),
    defaultValues: defaultValues,
  });

  const { cart } = useCart();
  const account = useAuth();
  const navigate = useNavigate();

  const formType = account?.account.accountId ? "client" : "guest";

  const guestMutation = useMutation({
    mutationFn: () =>
      createGuestOrder(createGuestOrderPayload(guestForm.getValues(), cart)),
    onSuccess: (orderId: number) => {
      navigate(`/order/checkout/${orderId}`);
    },
    onError: (error) => {
      console.error("Error creating order:", error);
    },
  });

  const clientMutation = useMutation({
    mutationFn: () =>
      createClientOrder(createClientOrderPayload(clientForm.getValues(), cart)),
    onSuccess: (orderId: number) => {
      navigate(`/order/checkout/${orderId}`);
    },
    onError: (error) => {
      console.error("Error creating order:", error);
    },
  });

  const handleSubmit = () => {
    event?.preventDefault();
    if (account?.account.accountId) {
      clientMutation.mutate();
      return;
    }
    guestMutation.mutate();
  };

  return (formType === "client" ? (
    <Form {...clientForm}>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {deliveryDetailsClientFormFields.map((field) => {
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
                control={clientForm.control}
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

        <Button aria-label="create-order" type="submit">Create Order</Button>
      </form>
    </Form>) :
    (<Form {...guestForm}>
      <form
        onSubmit={handleSubmit}
        className="space-y-8 px-5 pb-5 flex flex-col justify-center"
      >
        {deliveryDetailsGuestFormFields.map((field) => {
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
                control={guestForm.control}
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

        <Button aria-label="submit create order" type="submit">Create Order</Button>
      </form>
    </Form>)
  );
};
