import "./App.scss";
import React from "react";
import Page1 from "./pages/page1";
import Page2 from "./pages/page2";
import DataGrid from "./pages/dataGrid";
import HomePage from "../src/pages/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<DataGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
