import { PAYMENT_SERVER_URL } from "@/config/config";
import { STRIPE_PUBLIC_KEY } from "@/config/config";

import React, {useState} from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import OrderError from "@/components/OrderError/OrderError";

import { CartItem } from "@/context/client/CartContext";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  cartItems: CartItem[];
  customerEmail: string;
  orderId: string;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  cartItems,
  customerEmail,
  orderId,
}) => {
  const [error, setError] = useState<string | null | unknown>(null);
  const fetchClientSecret = async (): Promise<string | undefined | unknown> => {
    try {
      const response = await axios.post(
        `${PAYMENT_SERVER_URL}/checkout/create-checkout-session/${orderId}`,
        { cartItems, customer_email: customerEmail }
      );
      return response.data.clientSecret;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "An error occurred while creating the checkout session.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred.");
      }
      return undefined;
    }
  };

  const options: any = { fetchClientSecret };

  return (
    <div id="checkout">
      {error ? (
        <div className="error-message"><OrderError /></div>
      ) : (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  );
};

export default CheckoutForm;
