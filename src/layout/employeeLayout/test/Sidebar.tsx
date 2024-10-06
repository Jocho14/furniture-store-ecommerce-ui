import React from "react";
import "./styles.scss";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2 className="logo">Conceals.</h2>
      <nav className="sidebar__nav">
        <ul>
          <li>Overview</li>
          <li>Management</li>
          <ul>
            <li>Member</li>
            <li>Product List</li>
          </ul>
          <li>Partner List</li>
          <li>Analytics</li>
          <li>Accounting</li>
          <li>Reports</li>
          <li>Settings</li>
          <li>Notifications</li>
        </ul>
      </nav>
      <div className="sidebar__footer">
        <button className="logout">Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
