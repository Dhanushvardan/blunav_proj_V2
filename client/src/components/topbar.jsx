import React, { useState, useEffect } from "react";
import "../components/topbar.scss";
import Datetime from "react-datetime";
import Switch from "react-switch";

export default function Topbar({ switchState }) {
  var [date, setDate] = useState(new Date());

  var d = date.toLocaleDateString() + " " + date.toLocaleTimeString();

  const [checked, setChecked] = useState(false);
  const handleChange = (nextChecked) => {
    setChecked(nextChecked);
    switchState(nextChecked);
  };

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });
  return (
    <div className="topbar">
      <div className="titleBar">AMCOMS / Map view</div>
      <div className="timeBar">
        {checked ? (
          <div className="dateSpace">{date.toUTCString()}</div>
        ) : (
          <div className="dateSpace">{d}</div>
        )}
        <Switch
          onChange={handleChange}
          checked={checked}
          height={17}
          width={37}
          handleDiameter={8}
          className="rs"
        />
      </div>
    </div>
  );
}
