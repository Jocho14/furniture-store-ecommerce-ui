import { BACKEND_URL } from "@/config/config";
import axios from "axios";

export const getProducts = async () => {
  const response = await axios.get(`${BACKEND_URL}/products?id=1,2,3,4,5,6`); // TODO: Change this to fetch all products
  return response.data;
};

export const getProductDetails = async (id: number) => {
  const response = await axios.get(`${BACKEND_URL}/products/${id}`);
  return response.data;
};
