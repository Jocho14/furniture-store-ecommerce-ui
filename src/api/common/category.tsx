import { BACKEND_URL } from "@/config/config";
import axios from "axios";

export const getCategories = async () => {
  const response = await axios.get(`${BACKEND_URL}/categories/names`);
  return response.data;
};
