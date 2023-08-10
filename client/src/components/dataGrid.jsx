import React, { useRef } from "react";
import "./dataGrid.scss";
import data from "../fids.json";
import "handsontable/dist/handsontable.full.min.css";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable/base";
import { Button } from "antd";
import { registerAllModules } from "handsontable/registry";
registerAllModules();

export default function DataGrid() {
  const hotRef = useRef();

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
  const list = [];

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
    "ActualDepartureTime",
    "AircraftRegistration",
    "AircraftIATACode",
    "AircraftICAOCode",
    "AircraftName",
  ]);
  data.forEach((item) => {
    let s1 = item.timestamp.$date.substring(0, 10).split("-");

    let f1 = s1[2] + "-" + s1[1] + "-" + s1[0];
    list.push([
      item.timestamp.$date.substring(11, 19),
      f1,
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
      item.FlightEvents.ActualDeparture,
      item.PrimaryAircraft.Registration,
      item.PrimaryAircraft.Type.IATA,
      item.PrimaryAircraft.Type.ICAO,
      item.PrimaryAircraft.Type.Description,
    ]);
  });
  return (
    <div className="wholeDataGrid">
      <div className="dataGridBar">
        <Button className="exportBut" onClick={triggerExport}>
          Export
        </Button>
      </div>
      <div className="hotTable">
        <HotTable
          data={list}
          width="100%"
          height="100%"
          ref={hotRef}
          rowHeaders={true}
          colHeaders={true}
          licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        />
      </div>
    </div>
  );
}
