import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import SideBar from "./components/sidebar.jsx";
import TopBar from "./components/topbar";
import Homepage from "./pages/homepage.jsx";
import Page2 from "../src/pages/page2";
import MapPage from "./components/mapPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
