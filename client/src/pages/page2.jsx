import React from "react";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import "../pages/page2.scss";

export default function Page2() {
  return (
    <div className="page2">
      <div className="rowLayout">
        <SideBar />
        <div className="colLayout">
          <TopBar />
          page 2 under construction
        </div>
      </div>
    </div>
  );
}
