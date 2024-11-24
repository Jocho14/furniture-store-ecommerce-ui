import React from "react";
import classNames from "classnames";

import CustomInput from "@/components/CustomInput/CustomInput";

import { useSearch } from "@/context/employee/SearchContext";
import { useHeader } from "@/context/employee/HeaderContext";

import { Search } from "iconoir-react";
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
          <span>{productCount}</span> • <span>orders</span>
        </div>
      </div>
    </nav>
  );
};

export default BaseNav;
