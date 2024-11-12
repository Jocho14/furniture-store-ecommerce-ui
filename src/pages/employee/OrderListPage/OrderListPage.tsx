import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllOrdersForOrderList } from "@/api/employee/orders";
import { useHeader } from "@/context/employee/HeaderContext";

import { columns } from "./columns";
import { OrderData } from "./TData";
import { DataTable } from "@/components/ui/dataTable/data-table";

const OrderListPage = () => {
  const { setMode, setProductCount } = useHeader();
  const { data: productsData, isLoading: productsLoading } = useQuery<
    OrderData[]
  >({
    queryKey: ["orders"],
    queryFn: () => getAllOrdersForOrderList(),
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

export default OrderListPage;
