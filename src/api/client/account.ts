import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { ClientCreateDto } from "@/interfaces/client";
import { AccountLoginDto } from "@/interfaces/account";

export const registerUser = async (clientCreateDto: ClientCreateDto) => {
  const response = await axios.post(
    `${BACKEND_URL}/users/create-client`,
    clientCreateDto
  );
  return response.data;
};

export const loginUser = async (accountLoginDto: AccountLoginDto) => {
  const response = await axios.post(
    `${BACKEND_URL}/auth/login`,
    accountLoginDto,
    { withCredentials: true }
  );

  return response.data;
};

export const authStatus = async () => {
  const response = await axios.get(`${BACKEND_URL}/auth/status`, {
    withCredentials: true,
  });
  console.log("RESP DATAL", response.data);
  return response.data;
};

export const accountBasicInfo = async () => {
  const response = await axios.get(`${BACKEND_URL}/users/account-basic-info`, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
};
