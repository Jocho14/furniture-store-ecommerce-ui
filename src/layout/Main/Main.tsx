import React from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Grid from "@/components/Grid/Grid";

import "./styles.module.scss";

interface Props {}

const Main: React.FC<Props> = () => {
  return (
    <div className="main">
      <Header />
      <main>
        <Grid>
          <Outlet />
        </Grid>
      </main>
      <Footer />
    </div>
  );
};

export default Main;
