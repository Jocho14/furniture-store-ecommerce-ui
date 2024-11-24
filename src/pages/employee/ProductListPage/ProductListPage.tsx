import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllProductsForProductList } from "@/api/employee/products";

import { DataTable } from "@/components/ui/dataTable/data-table";

import { columns } from "./columns";
import { ProductData } from "./TData";

import { useHeader } from "@/context/employee/HeaderContext";

const ProductListPage = () => {
  const { setMode, setProductCount } = useHeader();
  const { data: productsData } = useQuery<ProductData[]>({
    queryKey: ["employeeProductList"],
    queryFn: () => getAllProductsForProductList(),
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    setMode("list");
    setProductCount(productsData?.length || 0);
  }, [setMode, productsData]);

  return (
    <div>
      <DataTable data={productsData || []} columns={columns} />
    </div>
  );
};

export default ProductListPage;
