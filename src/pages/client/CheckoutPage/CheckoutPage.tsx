import React from "react";
import styles from "./styles.module.scss";

interface Props {}

import { useCart } from "@/context/client/CartContext";
import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

const CheckoutPage: React.FC<Props> = () => {
  const { cart } = useCart();

  return <CheckoutForm cartItems={cart} />;
};

export default CheckoutPage;
