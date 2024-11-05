import { TBaseData } from "@/types/table/TBaseData";

export type ProductData = TBaseData & {
  name: string;
  price: number;
  thumbnail: string;
  alt: string;
  quantity: number;
};
