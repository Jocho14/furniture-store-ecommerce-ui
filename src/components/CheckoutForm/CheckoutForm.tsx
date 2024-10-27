import React, { useCallback, useState, useEffect } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { STRIPE_PUBLIC_KEY } from "@/config/config";
import axios from "axios";
import { CartItem } from "@/context/CartContext";
import { PAYMENT_SERVER_URL } from "@/config/config";

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
