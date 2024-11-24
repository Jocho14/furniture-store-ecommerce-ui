import { PAYMENT_SERVER_URL } from "@/config/config";
import { STRIPE_PUBLIC_KEY } from "@/config/config";

import React from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

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
  const fetchClientSecret = async (): Promise<string> => {
    const response = await axios.post(
      `${PAYMENT_SERVER_URL}/checkout/create-checkout-session/${orderId}`,
      { cartItems, customer_email: customerEmail }
    );
    return response.data.clientSecret;
  };

  const options: any = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
