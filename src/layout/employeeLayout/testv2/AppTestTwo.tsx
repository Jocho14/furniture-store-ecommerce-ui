import React from "react";
import { Outlet } from "react-router-dom";
import "./App.scss";

const AppTestTwo = () => {
  return (
    <div className="layout">
      <aside className="sidebar">Sidebar</aside>
      <header className="header">Header</header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default AppTestTwo;
