import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
//import Footer from "../Footer/Footer";

import { Toaster } from "@/components/ui/toaster";

import SearchProvider from "@/context/employee/SearchContext";
import { HeaderProvider } from "@/context/employee/HeaderContext";

import useMobile from "@/hooks/useMobile";

import styles from "./styles.module.scss";

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
