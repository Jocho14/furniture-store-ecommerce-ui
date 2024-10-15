import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { ProductData } from "@/pages/employee/ProductListPage/TData";

export const getAllProductsForProductList = async (): Promise<
  ProductData[]
> => {
  const response = await axios.get(
    `${BACKEND_URL}/products/all-with-thumbnails`
  );
  return response.data;
};
