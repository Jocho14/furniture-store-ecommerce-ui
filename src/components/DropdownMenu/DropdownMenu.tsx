import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import styles from "./styles.module.scss";

interface DropdownMenuProps {
  trigger?: React.ReactNode;
  menu: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger, menu }) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger ? trigger : "open"}</SheetTrigger>
      <SheetContent className={(styles["dropdown-menu"], "overflow-y-auto")}>
        {menu}
      </SheetContent>
    </Sheet>
  );
};

export default DropdownMenu;
