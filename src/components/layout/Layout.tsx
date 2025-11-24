import React from "react";
import "../../css/style.css";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="row">
      <div className="col-2 app-layout">
        {(import.meta.env.SAFE_MODE == 1 ? false : true) && <Sidebar />}
      </div>
      <div className="col-10 main-content-wrapper">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
