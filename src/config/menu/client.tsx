import {
  ViewGrid,
  Percentage,
  BrightStar,
  Phone,
  DesignPencil,
} from "iconoir-react";
import { MenuItem } from "@/types/MenuItem";

const title = "LOGO";
const primaryGroup: MenuItem[] = [
  { icon: <ViewGrid />, name: "Wszystkie produkty", link: "/all-products" },
  { icon: <Percentage />, name: "Oferty i promocje", link: "/offers" },
  { icon: <BrightStar />, name: "Inspiracje", link: "/inspirations" },
  { icon: <DesignPencil />, name: "Projektowanie", link: "/designing" },
];

const secondaryGroup: MenuItem[] = [];

const footerGroup: MenuItem[] = [
  { icon: <Phone />, name: "Kontakt", link: "/contact" },
];

export { title, primaryGroup, secondaryGroup, footerGroup };
