import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import ShoppingCartPage from "./ShoppingCartPage";

import useMobile from "@/hooks/useMobile";
import useDebounce from "@/hooks/useDebounce";
import { useCart } from "@/context/CartContext";

import { ShoppingCartProductProps } from "@/components/ShoppingCartProduct/ShoppingCartProduct";

import {
  getShoppingCartProducts,
  getShoppingCartProductsQuantities,
  getShoppingCartProductsPrice,
} from "@/api/shoppingCart";

export type Quantities = Record<number, number>;
export type Availability = Record<number, boolean>;

const ShoppingCartPageContainer: React.FC = () => {
  const { cart, updateCart, getProductIds } = useCart();
  const [quantities, setQuantities] = useState<Quantities>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );
  const [availability, setAvailability] = useState<Availability>({});
  const debouncedQuantities = useDebounce<Quantities>(quantities, 500);

  const productIds = getProductIds();
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<ShoppingCartProductProps[]>({
    queryKey: ["products", productIds],
    queryFn: () => getShoppingCartProducts(productIds),
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: quantitiesData,
    isLoading: quantitiesLoading,
    error: quantitiesError,
  } = useQuery<any[]>({
    queryKey: ["quantities", debouncedQuantities],
    queryFn: () => getShoppingCartProductsQuantities(productIds),
    enabled: !!debouncedQuantities,
    staleTime: 1000 * 60 * 1,
  });

  const {
    data: priceData,
    isLoading: priceLoading,
    error: priceError,
  } = useQuery<number>({
    queryKey: ["price", debouncedQuantities],
    queryFn: () => getShoppingCartProductsPrice(debouncedQuantities),
    enabled: !!debouncedQuantities,
    staleTime: 1000 * 60 * 1,
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
    setAvailability((prev) => ({
      ...prev,
      [id]:
        (quantitiesData?.find((item) => item.id === id)?.quantity || 0) >=
        quantity,
    }));
    queryClient.invalidateQueries(["quantities", debouncedQuantities]);
  };

  const isMobile = useMobile();

  return (
    <ShoppingCartPage
      isMobile={isMobile}
      productsData={productsData || []}
      quantities={quantities}
      availability={availability}
      cartPrice={priceData || 0}
      productsLoading={productsLoading}
      quantitiesLoading={quantitiesLoading}
      onQuantityChange={handleQuantityChange}
    />
  );
};

export default ShoppingCartPageContainer;
