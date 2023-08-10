import React from "react";
import "./navBar.scss";
import { Link } from "react-router-dom";
import { colors } from "@mui/material";

export default function NavBar() {
  return (
    <div className="wholeNavBar">
      <div className="navBar">
        <Link
          to="/"
          className="link"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="navIcons">DashBoard</div>
        </Link>
        <Link
          to="/page1"
          className="link"
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="navIcons">Datagrid</div>
        </Link>

        <div className="navIcons">Alerts</div>
        <div className="navIcons">Rules</div>
        <div className="navIcons">Replay</div>
        <div className="navIcons">NOTAM</div>
        <div className="navIcons">METAR</div>
        <div className="navIcons">Calender</div>
        <div className="navIcons">Reports</div>
      </div>
    </div>
  );
}
