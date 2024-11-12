import axios from "axios";

import { BACKEND_URL } from "@/config/config";

import { urlToFile } from "@/utils/urlToFile";
import { objectToFormData } from "@/utils/objectToFormData";

import { ProductData } from "@/pages/employee/ProductListPage/TData";
import { DetailProductEmployeeDto } from "@/pages/employee/ProductManagePage/ProductManagePage";

export const getAllProductsForProductList = async (): Promise<
  ProductData[]
> => {
  const response = await axios.get(
    `${BACKEND_URL}/products/all-with-thumbnails`
  );
  return response.data;
};

export const addProduct = async (
  detailedProductDto: DetailProductEmployeeDto
): Promise<string> => {
  const formData = objectToFormData(detailedProductDto);
  const response = await axios.post(`${BACKEND_URL}/products/add`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const updateProduct = async (
  productId: number,
  detailedProductDto: DetailProductEmployeeDto
) => {
  const formData = objectToFormData(detailedProductDto);
  const response = await axios.put(
    `${BACKEND_URL}/products/${productId}/update`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};

export const deleteProduct = async (productId: number) => {
  const response = await axios.put(
    `${BACKEND_URL}/products/${productId}/deactivate`
  );

  return response.data;
};

export const getProductDetails = async (
  productId: number
): Promise<DetailProductEmployeeDto> => {
  const response = await axios.get(
    `${BACKEND_URL}/products/${productId}/details/employee`
  );

  const images = await Promise.all(
    response.data.images.map((imageUrl: string, index: number) =>
      urlToFile(imageUrl, `image_${index + 1}`, "image/webp")
    )
  );

  const productDetails: DetailProductEmployeeDto = {
    ...response.data,
    images,
  };

  return productDetails;
};
