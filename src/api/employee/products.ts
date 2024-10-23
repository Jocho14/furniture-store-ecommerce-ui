import { BACKEND_URL } from "@/config/config";
import axios from "axios";
import { objectToFormData } from "@/utils/objectToFormData";
import { ProductData } from "@/pages/employee/ProductListPage/TData";
import { DetailedProductDto } from "@/pages/employee/ProductManagePage/ProductManagePage";

export const getAllProductsForProductList = async (): Promise<
  ProductData[]
> => {
  const response = await axios.get(
    `${BACKEND_URL}/products/all-with-thumbnails`
  );
  return response.data;
};

export const addProduct = async (
  detailedProductDto: DetailedProductDto
): Promise<string> => {
  const formData = objectToFormData(detailedProductDto);
  const response = await axios.post(`${BACKEND_URL}/products/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
