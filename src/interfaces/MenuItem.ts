import { ReactNode } from "react";

export interface MenuItem {
  icon: ReactNode;
  name: string;
  link: string;
}

export interface ICollapsibleMenuItem extends MenuItem {
  subItems: MenuItem[];
}
