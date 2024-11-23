import {
  ViewGrid,
  Percentage,
  BrightStar,
  Phone,
  DesignPencil,
} from "iconoir-react";
import { MenuItem } from "@/interfaces/MenuItem";

const title = "LOGO";
const primaryGroup: MenuItem[] = [
  { icon: <ViewGrid />, name: "All products", link: "/product" },
  { icon: <Percentage />, name: "Offers", link: "/offers" },
  { icon: <BrightStar />, name: "Inspirations", link: "/inspirations" },
  { icon: <DesignPencil />, name: "Designing", link: "/designing" },
];

const secondaryGroup: MenuItem[] = [];

const footerGroup: MenuItem[] = [
  { icon: <Phone />, name: "Contact", link: "/contact" },
];

export { title, primaryGroup, secondaryGroup, footerGroup };
