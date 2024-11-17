import { BACKEND_URL } from "@/config/config";
import axios from "axios";

export const getSearchResults = async (query: string) => {
  const response = await axios.get(`${BACKEND_URL}/products/search`, {
    params: { query },
  });
  return response.data;
};

export const getAllProductsForProductList = async () => {
  const response = await axios.get(`${BACKEND_URL}/products/list`);
  return response.data;
};
