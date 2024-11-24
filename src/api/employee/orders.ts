import axios from "axios";

import { BACKEND_URL } from "@/config/config";

import { OrderData } from "@/pages/employee/OrderListPage/TData";

export const getAllOrdersForOrderList = async (): Promise<OrderData[]> => {
  const response = await axios.get(`${BACKEND_URL}/orders/employee-previews`, {
    withCredentials: true,
  });
  return response.data;
};

export const getManagedOrderDetails = async (id: number) => {
  console.log("id: ", id);
  const response = await axios.get(`${BACKEND_URL}/orders/${id}/manage`, {
    withCredentials: true,
  });
  console.log("resp data: ", response.data);
  return response.data;
};
