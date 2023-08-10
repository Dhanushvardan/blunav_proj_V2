import React from "react";
import GridPage from "./gridpage.jsx";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import SearchBar from "../components/searchbar.jsx";
import "../pages/page1.scss";
import NavBar from "../components/navBar.jsx";

export default function Page1() {
  return (
    <div className="page1">
      <div className="colLayout">
        <TopBar />
        <NavBar />
        <GridPage />
      </div>
    </div>
  );
}
