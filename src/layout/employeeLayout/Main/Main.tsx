import React from "react";
import { ScrollArea } from "@/components/ui/scrollArea";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";

import styles from "./styles.module.scss";
import useMobile from "@/hooks/useMobile";
import classNames from "classnames";

interface Props {}

const Main: React.FC<Props> = () => {
  const isMobile = useMobile();
  return (
    <div className={styles["main__wrapper"]}>
      {!isMobile && <Sidebar />}
      <main className={styles["main"]}>
        <div className={styles["header"]}>
          <Header />
        </div>

        <div className={styles["outlet__container"]}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Main;
