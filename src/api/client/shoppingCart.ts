import { BACKEND_URL } from "@/config/config";
import { Quantities } from "@/pages/client/ShoppingCartPage/ShoppingCartPageContainer";
import axios from "axios";

export const getShoppingCartProducts = async (ids: number[]) => {
  const idQuery = ids.join(",");
  const response = await axios.get(`${BACKEND_URL}/products?id=${idQuery}`);
  return response.data;
};

export const getShoppingCartProductsQuantities = async (ids: number[]) => {
  const idQuery = ids.join(",");
  const response = await axios.get(`${BACKEND_URL}/quantities?id=${idQuery}`);
  return response.data;
};

export const getQuantities = async (ids: number[]) => {
  const response = await axios.post(
    `${BACKEND_URL}/products-warehouses/quantities`,
    {
      ids: ids,
    }
  );
  return response.data;
};

export async function getProductPreviews(productIds: number[]) {
  const response = await axios.post(`${BACKEND_URL}/products/previews`, {
    ids: productIds,
  });
  return response.data;
}

export const getPrices = async (ids: number[]) => {
  const response = await axios.get(`${BACKEND_URL}/products/prices`, {
    params: {
      ids: ids,
    },
  });

  return response.data;
};

export const getShoppingCartProductsPrice = async (
  idToQuantity: Quantities
): Promise<number> => {
  const productIds = Object.entries(idToQuantity).map(([id, _]) => Number(id));

  const idToPrice = await getPrices(productIds);

  let totalSum = 0;

  Object.entries(idToQuantity).forEach(([id, quantity]) => {
    const productPrice = idToPrice.find(
      (product: any) => product.id === Number(id)
    )?.price;

    if (productPrice !== undefined) {
      totalSum += productPrice * quantity;
    }
  });

  return Number(parseFloat(totalSum.toString()).toFixed(2));
};
