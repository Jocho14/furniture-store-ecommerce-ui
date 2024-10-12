import React from "react";
import Grid from "@/components/Grid/Grid";
import classNames from "classnames";
import styles from "./styles.module.scss";
import useMobile from "@/hooks/useMobile";
import CustomInput from "@/components/CustomInput/CustomInput";
import { Search } from "iconoir-react";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { Plus, Menu } from "iconoir-react";
import DropdownMenu from "@/components/DropdownMenu/DropdownMenu";
import { useSearch } from "@/context/SearchContext";

interface BaseNavProps {
  className?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const BaseNav: React.FC<BaseNavProps> = ({ className }) => {
  const { searchTerm, setSearchTerm } = useSearch();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <nav className={styles["base-nav"]}>
      <div className={styles["base-nav__left"]}>
        <CustomInput
          className="rounded-md"
          type="text"
          icon={<Search />}
          placeholder="Wyszukaj"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className={classNames(styles["items-count"])}>
          <span>{123} </span> • <span>produkty</span>
        </div>
      </div>
      <div className={styles["add-icon__container"]}>
        <ActionIcon
          className={classNames(styles["add-icon"])}
          icon={<Plus />}
          label="Nowy Produkt"
          border="border-medium"
        />
      </div>
    </nav>
  );
};

export default BaseNav;
