interface AccountCreateDto {
  email: string;
  password: string;
}

export interface ClientCreateDto {
  account: AccountCreateDto;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dateOfBirth: Date;
}

export interface EmployeeCreateDto extends ClientCreateDto {
  secret: string;
}
