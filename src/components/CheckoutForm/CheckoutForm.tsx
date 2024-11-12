import React from "react";
import axios from "axios";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

import { PAYMENT_SERVER_URL } from "@/config/config";
import { STRIPE_PUBLIC_KEY } from "@/config/config";
import { CartItem } from "@/context/client/CartContext";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  cartItems: CartItem[];
}

const CheckoutForm: React.FC<CheckoutFormProps> = (cartItems) => {
  const fetchClientSecret = async (): Promise<string> => {
    const response = await axios.post(
      `${PAYMENT_SERVER_URL}/checkout/create-checkout-session`,
      cartItems
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
