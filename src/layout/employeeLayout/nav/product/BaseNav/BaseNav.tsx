import React from "react";

import classNames from "classnames";

import { useSearch } from "@/context/employee/SearchContext";
import { Search, Plus } from "iconoir-react";
import CustomInput from "@/components/CustomInput/CustomInput";
import ActionIcon from "@/components/ActionIcon/ActionIcon";
import { useHeader } from "@/context/employee/HeaderContext";

import styles from "./styles.module.scss";

const BaseNav = () => {
  const { searchTerm, setSearchTerm } = useSearch();
  const { productCount } = useHeader();

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
          placeholder="Search"
          value={searchTerm}
          onChange={handleInputChange}
        />
        <div className={classNames(styles["items-count"])}>
          <span>{productCount}</span> • <span>products</span>
        </div>
      </div>
      <div className={styles["add-icon__container"]}>
        <ActionIcon
          className={styles["add-icon"]}
          linkTo="/employee/product/add"
          icon={<Plus />}
          label="Add Product"
          border="border-medium"
        />
      </div>
    </nav>
  );
};

export default BaseNav;
