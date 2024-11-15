import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { CreateGuestOrderDto } from "@/interfaces/order";

export const createGuestOrder = async (
  createGuestOrderDto: CreateGuestOrderDto
) => {
  const response = await axios.post(
    `${BACKEND_URL}/orders/create-guest-order`,
    createGuestOrderDto
  );
  return response.data;
};
