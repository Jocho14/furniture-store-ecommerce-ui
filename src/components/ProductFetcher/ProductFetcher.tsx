import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/api/products";

interface ProductFetcherProps {
  render: Function;
}

const ProductFetcher: React.FC<ProductFetcherProps> = ({ render }) => {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 1000 * 60 * 5,
  });

  return render(productsData);
};

export default ProductFetcher;
