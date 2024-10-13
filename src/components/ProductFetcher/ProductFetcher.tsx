import React from "react";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "@/api/client/products";

import { HomePageProduct } from "@/interfaces/Product";

interface ProductFetcherProps {
  render: (productsData: HomePageProduct[] | undefined) => React.ReactNode;
}

const ProductFetcher: React.FC<ProductFetcherProps> = ({ render }) => {
  const { data: productsData } = useQuery<any[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(),
    staleTime: 1000 * 60 * 5,
  });

  return render(productsData);
};

export default ProductFetcher;
