import React from "react";
import "./hompage.scss";
import TopBar from "../components/topbar";
import SideBar from "../components/sidebar";
import MapPart from "../components/mapPage";
import NavBar from "../components/navBar";

export default function homepage() {
  return (
    <div className="homepage">
      <div className="colLayout">
        <TopBar />
        <NavBar />
        <MapPart />
      </div>
    </div>
  );
}
