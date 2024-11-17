import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import styles from "./styles.module.scss";
import { Toaster } from "@/components/ui/toaster";

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div>
      <Header />
      <main className={styles["main"]}>
        <Toaster />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
