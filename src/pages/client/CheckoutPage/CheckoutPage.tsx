import { useParams } from "react-router-dom";

import CheckoutForm from "@/components/CheckoutForm/CheckoutForm";

import { useCart } from "@/context/client/CartContext";

const CheckoutPage = () => {
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
