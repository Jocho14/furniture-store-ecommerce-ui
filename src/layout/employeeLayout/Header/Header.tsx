import React, { useState } from "react";
import classNames from "classnames";

import Grid from "@/components/Grid/Grid";
import BaseNav from "../nav/BaseNav/BaseNav";
import ManageNav from "../nav/ManageNav/ManageNav";

import styles from "./styles.module.scss";

interface Props {}

enum NavState {
  Base = "base",
  Manage = "manage",
}

const Header: React.FC<Props> = () => {
  const [navState, setNavState] = useState<NavState>(NavState.Base);

  return (
    <header className={styles["header"]}>
      <div className={styles["nav__container"]}>
        <BaseNav />
      </div>
    </header>
  );
};

export default Header;
