import UserRole from "@/enums/UserRole";

export interface AccountLoginDto {
  email: string;
  password: string;
}

export interface AccountBasicInfoDto {
  accountId: number;
  firstName: string;
  role: UserRole;
}
