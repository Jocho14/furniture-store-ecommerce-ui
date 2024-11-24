import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { OrderData } from "@/pages/employee/OrderListPage/TData";

export const getAllOrdersForOrderList = async (): Promise<OrderData[]> => {
  const response = await axios.get(`${BACKEND_URL}/orders/employee-previews`, {
    withCredentials: true,
  });
  return response.data;
};

export const getManagedOrderDetails = async (id: number) => {
  const response = await axios.get(`${BACKEND_URL}/orders/${id}/manage`, {
    withCredentials: true,
  });

  return response.data;
};
