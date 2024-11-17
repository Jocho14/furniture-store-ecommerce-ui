import React from "react";

interface Props {}

import { useCart } from "@/context/client/CartContext";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";
import { useParams } from "react-router-dom";

const CheckoutPage: React.FC<Props> = () => {
  const { cart } = useCart();
  const { orderId } = useParams<{ orderId: string }>();

  return orderId ? (
    <CheckoutForm
      orderId={orderId}
      cartItems={cart}
      customerEmail={"example@email.com"}
    />
  ) : (
    <div>Order ID not found</div>
  );
};

export default CheckoutPage;
