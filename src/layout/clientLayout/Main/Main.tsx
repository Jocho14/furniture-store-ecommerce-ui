import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { Toaster } from "@/components/ui/toaster";

import styles from "./styles.module.scss";

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
