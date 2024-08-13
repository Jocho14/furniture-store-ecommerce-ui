import React from "react";
import styles from "./styles.module.scss";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Link } from "react-router-dom";
import ProfileHeader from "@/components/ProfileHeader/ProfileHeader";
import ActionIcon from "../ActionIcon/ActionIcon";
import { Cart, Heart, LogOut } from "iconoir-react";

interface DropdownMenuProps {
  trigger?: React.ReactNode;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ trigger }) => {
  return (
    <Sheet>
      <SheetTrigger>{trigger ? trigger : "open"}</SheetTrigger>
      <SheetContent className={styles["dropdown-menu"]}>
        <ul className={styles["dropdown-menu__user-tools"]}>
          {" "}
          <li className={styles["dropdown-menu__profile-header"]}>
            <Link to="/profile">
              <ProfileHeader name="John" surname="Doe" />
            </Link>
          </li>
          <li className={styles["dropdown-menu__user-tools__item"]}>
            <ActionIcon icon={<Cart />} />
            Zamówienia
          </li>
          <li className={styles["dropdown-menu__user-tools__item"]}>
            <ActionIcon icon={<Heart />} />
            Ulubione
          </li>
          <li className={styles["dropdown-menu__user-tools__item"]}>
            <ActionIcon icon={<LogOut />} />
            Wyloguj się
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default DropdownMenu;
