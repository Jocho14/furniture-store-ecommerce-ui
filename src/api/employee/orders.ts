import axios from "axios";

import { BACKEND_URL } from "@/config/config";

import { OrderData } from "@/pages/employee/OrderListPage/TData";

export const getAllOrdersForOrderList = async (): Promise<OrderData[]> => {
  const response = await axios.get(`${BACKEND_URL}/orders/employee-previews`);
  return response.data;
};
