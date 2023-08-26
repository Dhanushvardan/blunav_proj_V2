import React, { useEffect, useRef, useState } from "react";
import "./dataGrid.scss";
import data from "../fids.json";
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable/base";
import { Button, DatePicker, Input, TimePicker } from "antd";
import { registerAllModules } from "handsontable/registry";

registerAllModules();

export default function DataGrid({ switchState }) {
  const hotRef = useRef();
  const [searchIn, setSearchIn] = useState();
  console.log(switchState);
  const [resetList, setResetList] = useState([]);
  const [fdate, setFDate] = useState(null);
  const [tdate, setTDate] = useState(null);
  const [ftime, setFTime] = useState(null);
  const [ttime, setTTime] = useState(null);
  const [Data, setData] = useState(null);

  const triggerExport = () => {
    const hot = hotRef.current.hotInstance;
    const exportPlugin = hot.getPlugin("exportFile");
    exportPlugin.downloadFile("csv", {
      bom: false,
      columnDelimiter: ",",
      columnHeaders: true,
      exportHiddenColumns: true,
      exportHiddenRows: true,
      fileExtension: "csv",
      filename: "AMCOMS_DATAGRID_[DD]-[MM]-[YYYY]",
      mimeType: "text/csv",
      rowDelimiter: "\r\n",
      rowHeaders: true,
    });
  };
  var list = [];

  list.push([
    "TimeStamp",
    "Date",
    "UniqueFlightID",
    "AirlineIATACODE",
    "AirlineICAOcode",
    "AirlineName",
    "ScheduleDepartureDate",
    "ScheduleDepartureTime",
    "AiportName",
    "AirportCity",
    "FlightNature",
    "FlightQualifier",
    "FlightStatus",
    "InternationalStatus",

    "AircraftRegistration",
    "AircraftIATACode",
    "AircraftICAOCode",
    "AircraftName",
  ]);
  data.forEach((item) => {
    let s1 = item.timestamp.$date.substring(0, 10).split("-");

    let f1 = s1[2] + "-" + s1[1] + "-" + s1[0];
    let temp = item.timestamp.$date.substring(11, 19);
    let t = temp.split(":").map(Number);
    const date = new Date();
    date.setHours(t[0]);
    date.setMinutes(t[1]);
    date.setSeconds(t[2]);

    let utcTimeString = date.toISOString().substring(11, 19);

    let timeStamp = item.timestamp.$date.substring(11, 19);

    if (switchState) {
      timeStamp = utcTimeString;
    }

    list.push([
      timeStamp,
      item.timestamp.$date.substring(0, 10),
      item.FlightID.AIPUniqueID,
      item.FlightID.Airline.IATA,
      item.FlightID.Airline.ICAO,
      item.FlightID.Airline.Name,
      item.FlightID.STO.Date,
      item.FlightID.STO.Time,
      item.FlightID.Airport.Name,
      item.FlightID.Airport.City,
      item.FlightID.FlightNature,
      item.ServiceType,
      item.OperationalStatus.Description["#text"],
      item.InternationalStatus,

      item.PrimaryAircraft.Registration,
      item.PrimaryAircraft.Type.IATA,
      item.PrimaryAircraft.Type.ICAO,
      item.PrimaryAircraft.Type.Description,
    ]);
  });

  useEffect(() => {
    setData(list);
    setResetList(list);
  }, []);

  const triggerSearch = () => {
    const hot = hotRef.current.hotInstance;
    const search = hot.getPlugin("search");
    const queryResult = search.query(searchIn);
    hot.render();
  };

  const triggerDateFilter = () => {
    console.log(fdate);
    console.log(tdate);
    let fromDate = fdate ? new Date(fdate) : null;
    let toDate = tdate ? new Date(tdate) : null;

    // Get the Handsontable instance
    const hot = hotRef.current.hotInstance;

    // Apply the range filter to the 'Date' column
    hot.getPlugin("filters").addCondition(1, "between", [fdate, tdate]);
    hot.getPlugin("filters").filter();
  };

  const triggerTimeFilter = () => {
    console.log(ftime);
    console.log(ttime);

    // Get the Handsontable instance
    const hot = hotRef.current.hotInstance;

    // Apply the range filter to the 'Date' column
    hot.getPlugin("filters").addCondition(0, "between", [ftime, ttime]);
    hot.getPlugin("filters").filter();
  };

  const triggerUndo = () => {
    const hot = hotRef.current.hotInstance;
    hot.undoRedo.undo();
  };

  const triggerReset = () => {
    const hot = hotRef.current.hotInstance;

    hot.getPlugin("search").query("");
    hot.render();
  };

  const triggerWholeReset = () => {
    console.log(resetList);
    setData(resetList);
    const hot = hotRef.current.hotInstance;
    // hot.getPlugin("filters").clearConditions();
    // setSearchIn(null);
    // hot.getPlugin("search").query("");
    hot.loadData(resetList);
    hot.render();
  };

  return (
    <div className="wholeDataGrid">
      <div className="dataGridBar">
        <Button className="exportBut" onClick={triggerExport}>
          Export
        </Button>
        <Input
          type="text"
          placeholder="search"
          className="searchField"
          onChange={(e) => {
            setSearchIn(e.target.value);
          }}
        />
        <Button onClick={triggerSearch} className="searchBut">
          Search
        </Button>
        <Button className="reset" onClick={triggerReset}>
          Search Reset
        </Button>
        <DatePicker
          className="fdate"
          placeholder="from Date"
          onChange={(value, dateString) => {
            setFDate(dateString);
          }}
        />
        <DatePicker
          className="tdate"
          placeholder="To Date"
          onChange={(value, dateString) => {
            setTDate(dateString);
          }}
        />
        <Button className="dateFilter" onClick={triggerDateFilter}>
          Filter
        </Button>
        <TimePicker
          className="ftime"
          placeholder="From time"
          onChange={(time, timeString) => {
            setFTime(timeString);
          }}
        />
        <TimePicker
          className="ttime"
          placeholder="To time"
          onChange={(time, timeString) => {
            setTTime(timeString);
          }}
        />
        <Button className="timeFilter" onClick={triggerTimeFilter}>
          Filter
        </Button>
        <Button className="undo" onClick={triggerUndo}>
          Undo
        </Button>
        <Button className="reset" onClick={triggerWholeReset}>
          Reset
        </Button>
      </div>
      <div className="hotTable">
        <HotTable
          data={Data}
          width="100%"
          height="100%"
          ref={hotRef}
          manualColumnMove={true}
          rowHeaders={true}
          colHeaders={{
            header: {
              className: "tableCustom", // Apply the custom header class
            },
          }}
          manualColumnResize={true}
          filters={true}
          columnSorting={true}
          className="tableCustom"
          // enable the column menu
          dropdownMenu={true}
          search={true}
          undo={true}
          autoColumnSize={true}
          afterGetColHeader={(col, TH) => (TH.className = "custom-header")}
          afterGetRowHeader={(row, TH) => (TH.className = "custom-header")}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
      </div>
    </div>
  );
}
