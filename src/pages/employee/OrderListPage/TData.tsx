import { TBaseData } from "@/types/table/TBaseData";

export type OrderData = TBaseData & {
  status: string;
  email: string;
  amount: number;
  date: Date;
};
