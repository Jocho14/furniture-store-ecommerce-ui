import React from "react";

import { Toaster } from "@/components/ui/sonner";

// import styles from "./styles.module.scss";

interface CartActionToastProps {
  //actionType: "add" | "remove";
}

const CartActionToast: React.FC<CartActionToastProps> = () => {
  return <Toaster position="top-right" closeButton={true} />;
};

export default CartActionToast;
