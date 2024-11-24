import { BACKEND_URL } from "@/config/config";
import axios from "axios";

import { ClientCreateDto } from "@/interfaces/client";
import { AccountLoginDto } from "@/interfaces/account";

export const registerEmployee = async (clientCreateDto: ClientCreateDto) => {
  const response = await axios.post(
    `${BACKEND_URL}/users/create-employee`,
    clientCreateDto
  );
  return response.data;
};

export const loginEmployee = async (accountLoginDto: AccountLoginDto) => {
  const response = await axios.post(
    `${BACKEND_URL}/auth/login`,
    accountLoginDto,
    { withCredentials: true }
  );

  return response.data;
};

export const employeeBasicInfo = async () => {
  const response = await axios.get(`${BACKEND_URL}/users/employee-basic-info`, {
    withCredentials: true,
  });

  return response.data;
};
