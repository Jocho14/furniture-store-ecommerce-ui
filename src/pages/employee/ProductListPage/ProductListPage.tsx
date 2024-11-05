import { useEffect } from "react";

import { DataTable } from "@/components/ui/dataTable/data-table";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./columns";
import { ProductData } from "./TData";

import { getAllProductsForProductList } from "@/api/employee/products";
import { useHeader } from "@/context/employee/HeaderContext";

const ProductListPage = () => {
  const { setMode } = useHeader();
  const { data: productsData, isLoading: productsLoading } = useQuery<
    ProductData[]
  >({
    queryKey: ["products"],
    queryFn: () => getAllProductsForProductList(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setMode("list");
  }, [setMode]);

  return (
    <div>
      <DataTable data={productsData || []} columns={columns} />
    </div>
  );
};

export default ProductListPage;
