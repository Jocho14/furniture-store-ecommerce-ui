import { BACKEND_URL } from "@/config/config";
import { Quantities } from "@/pages/ShoppingCartPage/ShoppingCartPageContainer";
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

export const getShoppingCartProductsPrice = async (
  idToQuantity: Quantities
): Promise<number> => {
  const productIds = Object.keys(idToQuantity).join(",");
  const response = await axios.get(`${BACKEND_URL}/prices?id=${productIds}`);
  const prices = response.data;

  let totalSum = 0;

  Object.entries(idToQuantity).forEach(([id, quantity]) => {
    const productPrice = prices.find(
      (product: any) => product.id === Number(id)
    )?.price;

    if (productPrice !== undefined) {
      totalSum += productPrice * quantity;
    }
  });

  return totalSum;
};
