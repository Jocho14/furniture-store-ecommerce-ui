import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ShoppingCartPage from "./ShoppingCartPage";

import useMobile from "@/hooks/useMobile";
import useDebounce from "@/hooks/useDebounce";
import { useCart } from "@/context/CartContext";

import { ShoppingCartProductProps } from "@/interfaces/Product";
import { IProductPreview } from "@/interfaces/Product";

import {
  getShoppingCartProductsPrice,
  getProductPreviews,
  getQuantities,
} from "@/api/client/shoppingCart";

export type Quantities = Record<number, number>;
export type Availability = Record<number, boolean>;

const ShoppingCartPageContainer: React.FC = () => {
  const { cart, updateCart, getProductIds } = useCart();
  const productIds = getProductIds();

  const [quantities, setQuantities] = useState<Quantities>(
    cart.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );
  const [availability, setAvailability] = useState<Availability>({});
  const debouncedQuantities = useDebounce<Quantities>(quantities, 500);

  //const queryClient = useQueryClient();

  const { data: productPreviewsData, isLoading: productPreviewsDataLoading } =
    useQuery<ShoppingCartProductProps[]>({
      queryKey: ["productPreviews", productIds],
      queryFn: () => getProductPreviews(productIds),
      enabled: !!debouncedQuantities,
      staleTime: 1000 * 60 * 5,
    });

  console.log("PRODUCT PREVIEWS DATA: ", productPreviewsData);

  // const { data: productsData, isLoading: productsLoading } = useQuery<
  //   ShoppingCartProductProps[]
  // >({
  //   queryKey: ["products", productIds],
  //   queryFn: () => getShoppingCartProducts(productIds),
  //   staleTime: 1000 * 60 * 5,
  // });

  const { data: quantitiesData, isLoading: quantitiesLoading } = useQuery<
    any[]
  >({
    queryKey: ["quantities", debouncedQuantities],
    queryFn: () => getQuantities(productIds),
    enabled: !!debouncedQuantities,
    staleTime: 1000 * 60 * 1,
  });

  console.log("QUANTITIES DATA: ", quantitiesData);

  const { data: priceData } = useQuery<number>({
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
          (item: { productId: number; quantity: number }) =>
            item.productId === id
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
        (quantitiesData?.find((item) => item.productId === id)?.quantity ||
          0) >= quantity,
    }));
    //queryClient.invalidateQueries(["quantities", debouncedQuantities]);
  };

  const isMobile = useMobile();

  return (
    <ShoppingCartPage
      isMobile={isMobile}
      productsData={productPreviewsData || []}
      quantities={quantities}
      availability={availability}
      cartPrice={priceData || 0}
      productsLoading={productPreviewsDataLoading}
      quantitiesLoading={quantitiesLoading}
      onQuantityChange={handleQuantityChange}
    />
  );
};

export default ShoppingCartPageContainer;
