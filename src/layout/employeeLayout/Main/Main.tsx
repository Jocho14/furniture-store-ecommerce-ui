import React from "react";

import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
//import Footer from "../Footer/Footer";

import styles from "./styles.module.scss";
import useMobile from "@/hooks/useMobile";
import SearchProvider from "@/context/employee/SearchContext";
import { Toaster } from "@/components/ui/toaster";
import { HeaderProvider } from "@/context/employee/HeaderContext";

interface Props {}

const Main: React.FC<Props> = () => {
  const isMobile = useMobile();
  return (
    <HeaderProvider>
      <div className={styles["main__wrapper"]}>
        <Toaster />
        {!isMobile && <Sidebar />}
        <main className={styles["main"]}>
          <SearchProvider>
            <div className={styles["header"]}>
              <Header />
            </div>
            <div className={styles["outlet__container"]}>
              <Outlet />
            </div>
          </SearchProvider>
        </main>
      </div>
    </HeaderProvider>
  );
};

export default Main;
