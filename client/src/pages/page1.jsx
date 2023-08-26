import React, { useState } from "react";
import GridPage from "./gridpage.jsx";
import SideBar from "../components/sidebar";
import TopBar from "../components/topbar";
import SearchBar from "../components/searchbar.jsx";
import "../pages/page1.scss";
import NavBar from "../components/navBar.jsx";
import DataGrid from "../components/dataGrid.jsx";

export default function Page1() {
  const [topBarSwitch, setTopBarSwitch] = useState(null);

  const updateSwitchState = (value) => {
    setTopBarSwitch(value);
  };
  return (
    <div className="page1">
      <div className="colLayout">
        <TopBar switchState={updateSwitchState} />
        <NavBar />
        <DataGrid switchState={topBarSwitch} />
      </div>
    </div>
  );
}
