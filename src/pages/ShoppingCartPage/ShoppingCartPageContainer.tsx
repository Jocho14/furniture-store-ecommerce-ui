import ShoppingCartPage from "./ShoppingCartPage";

import React, { useEffect, useState } from "react";

import useFetch from "@/hooks/useFetch";
import useMobile from "@/hooks/useMobile";
import useDebounce from "@/hooks/useDebounce";

import { useCart } from "@/context/CartContext";

import { BACKEND_URL } from "@/config/config";
import { buildMultipleIdUrl } from "@/utils/url";
import { ShoppingCartProductProps } from "@/components/ShoppingCartProduct/ShoppingCartProduct";

export type Quantities = Record<number, number>;
export type Availability = Record<number, boolean>;

const ShoppingCartPageContainer: React.FC = () => {
  const { cart, updateCart, getProductIds } = useCart();
  const [quantities, setQuantities] = useState<Quantities>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );
  const [availability, setAvailability] = useState<Availability>({});
  const debouncedQuantities = useDebounce<Quantities>(quantities, 500);

  const productsDataUrl = buildMultipleIdUrl(
    BACKEND_URL,
    "products",
    getProductIds()
  );

  const quantitiesDataUrl = buildMultipleIdUrl(
    BACKEND_URL,
    "quantities",
    getProductIds()
  );

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
  } = useFetch<ShoppingCartProductProps[]>({
    url: productsDataUrl,
  });

  const {
    data: quantitiesData,
    loading: quantitiesLoading,
    error: quantitiesError,
  } = useFetch<any[]>({
    url: quantitiesDataUrl,
    captureList: [debouncedQuantities],
  });

  useEffect(() => {
    if (quantitiesData) {
      const newAvailability = Object.keys(quantities).reduce((acc, key) => {
        const id = Number(key);
        const quantityData = quantitiesData.find(
          (item: { id: number; quantity: number }) => item.id === id
        );
        acc[id] = quantityData
          ? quantityData.quantity >= quantities[id]
          : false;
        return acc;
      }, {} as Availability);
      setAvailability(newAvailability);
    }
  }, [quantities, quantitiesData]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setQuantities((prev) => ({ ...prev, [id]: quantity }));
    updateCart(id, quantity);
  };

  const isMobile = useMobile();

  return (
    <ShoppingCartPage
      isMobile={isMobile}
      productsData={productsData || []}
      quantities={quantities}
      availability={availability}
      productsLoading={productsLoading}
      quantitiesLoading={quantitiesLoading}
      onQuantityChange={handleQuantityChange}
    />
  );
};

export default ShoppingCartPageContainer;
