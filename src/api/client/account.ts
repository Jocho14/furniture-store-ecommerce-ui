import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { ClientCreateDto } from "@/interfaces/client";

export const registerUser = async (clientCreateDto: ClientCreateDto) => {
  const response = await axios.post(
    `${BACKEND_URL}/users/create-client`,
    clientCreateDto
  );
  return response.data;
};
