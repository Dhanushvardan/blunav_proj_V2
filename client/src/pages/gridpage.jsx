import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import data from "../fids.json";
import React from "react";
import "ag-grid-react";
import { AgGridReact } from "ag-grid-react";
import "./gridpage.scss";

import "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

// import "ag-grid-enterprise";
// import "@ag-grid-enterprise/core";

// import { LicenseManager } from "@ag-grid-enterprise/core";

// LicenseManager.setLicenseKey("5266e2b19455d0b5c7c8c52bf6367755");

export default function Homepage() {
  const [row, setRow] = useState([]);
  const [gApi, setgApi] = useState(null);
  const gridRef = useRef();
  // const ts = data.map((data) => {
  //   setRow((prevRows) => [...prevRows, data.timestamp.$date]);
  // });

  useEffect(() => {
    const list = [];

    data.forEach((item) => {
      let s1 = item.timestamp.$date.substring(0, 10).split("-");

      let f1 = s1[2] + "-" + s1[1] + "-" + s1[0];

      const e = new Date(item.timestamp.$date.substring(0, 10));

      const filterValue = e.toISOString().split("T")[0];

      console.log(filterValue);

      list.push({
        Time: item.timestamp.$date.substring(11, 19),
        date: f1,
        UniqueFlightID: item.FlightID.AIPUniqueID,
        AirlineIATAcode: item.FlightID.Airline.IATA,
        AirlineICAOcode: item.FlightID.Airline.ICAO,
        AirlineName: item.FlightID.Airline.Name,
        FlightIdentifier: item.FlightID.FlightNumber,
        ScheduleDepartureDate: item.FlightID.STO.Date,
        ScheduleDepartureTime: item.FlightID.STO.Time,
        AirportIATACode: item.FlightID.Airport.IATA,
        AirportICAOCode: item.FlightID.Airport.ICAO,
        AirportName: item.FlightID.Airport.Name,
        AirportCity: item.FlightID.Airport.City,
        AirportCountry: item.FlightID.Airport.Country,
        FlightNature: item.FlightID.FlightNature,
        FlightQualifier: item.ServiceType,
        FlightStatus: item.OperationalStatus.Description["#text"],
        InternationalStatus: item.InternationalStatus,
        ActualDepartureTime: item.FlightEvents.ActualDeparture,
        MostConfidentDepartureTime:
          item.FlightEvents.MostConfidentDepartureTime,
        MostConfidentOffChocksTime:
          item.FlightEvents.MostConfidentOffChocksTime,
        EstimatedDepartureTime: item.FlightEvents.EstimatedDeparture,
        AircraftRegistration: item.PrimaryAircraft.Registration,
        AircraftIATACode: item.PrimaryAircraft.Type.IATA,
        AircraftICAOCode: item.PrimaryAircraft.Type.ICAO,
        AircraftName: item.PrimaryAircraft.Type.Description,
        OriginAirportIATA: item.Route.Origin.IATA,
        OriginAirportICAO: item.Route.Origin.ICAO,
        OriginAirportName: item.Route.Origin.Name,
        OriginAirportCity: item.Route.Origin.City,
        OriginAirportCountry: item.Route.Origin.Country,
        DestinationAirportIATA: item.Route.Destination.IATA,
        DestinationAirportICAO: item.Route.Destination.ICAO,
        DestinationAirportName: item.Route.Destination.Name,
        DestinationAirportCity: item.Route.Destination.City,
        DestinationAirportCountry: item.Route.Destination.Country,
        StandArea: item.ResourceAllocations["BAY"]["@Location"],
        StandNumber: item.ResourceAllocations.BAY.Code,
        StandAllocationStartTime: item.ResourceAllocations.BAY.Start,
        StandAllocationEndTime: item.ResourceAllocations.BAY.Stop,
        Terminal: item.Terminal,
        LinkedFlightUniqueID: item.LinkedFlightID.AIPUniqueID,
        LinkedFlightAirlineIATA: item.LinkedFlightID.Airport.IATA,
        LinkedFlightAirlineICAO: item.LinkedFlightID.Airport.ICAO,
        LinkedFlightAirlineName: item.LinkedFlightID.Airport.Name,
        LinkedFlightAirlineCity: item.LinkedFlightID.Airport.City,
        LinkedFlightAirlineCountry: item.LinkedFlightID.Airport.Country,
        LinkedFlightScheduleDepartureDate: item.LinkedFlightID.STO.Date,
        LinkedFlightScheduleDepartureTime: item.LinkedFlightID.STO.Time,
        Groundedflightornot: item.CustomFields.Grounded,
        SendtobillingforAIMS: item.CustomFields.SendToBilling,
      });
    });
    setRow(list);
  }, []);

  const getRowStyle = (params) => {
    if (
      params.data.AirlineName === "Etihad Airways" &&
      params.data.AirportName === "Chennai"
    ) {
      return { background: "green" };
    }
    return null; // Return null for default row styling
  };

  const [colData, setColData] = useState([
    {
      field: "date",
      headerName: "Date",
      filter: true,
      floatingFilter: true,
      filter: "agDateColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          var dateAsString = cellValue;

          if (dateAsString == null) return -1;

          var dateParts = dateAsString.split("-");

          console.log(dateParts);
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          //console.log(filterLocalDateAtMidnight.toISOString().split("T")[0]);
          console.log(cellDate);
          console.log(filterLocalDateAtMidnight.getTime());
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      browserDatePicker: true,
    },
    {
      field: "Time",
      headerName: "Time",
      filter: true,
      floatingFilter: true,
      filter: "agTextColumnFilter",
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          var dateAsString = cellValue;
          if (dateAsString == null) return -1;
          var dateParts = dateAsString.split("-");
          console.log(dateParts);
          var cellDate = new Date(
            Number(dateParts[2]),
            Number(dateParts[1]) - 1,
            Number(dateParts[0])
          );
          //console.log(filterLocalDateAtMidnight.toISOString().split("T")[0]);
          console.log(cellDate);
          console.log(filterLocalDateAtMidnight.getTime());
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        },
      },
      browserDatePicker: true,
    },

    { field: "UniqueFlightID", headerName: "Unique Flight ID" },
    { field: "AirlineIATAcode", headerName: "Airline IATA code" },
    { field: "AirlineICAOcode", headerName: "Airline ICAO code" },
    {
      field: "AirlineName",
      headerName: "Airline Name",
      cellStyle: (params) => {
        if (params.value === "IndiGo Airlines") {
          return { background: "blue" };
        }
        if (params.value === "TATA SIA AIRLINES (VISTARA)") {
          return { background: "purple" };
        }
        if (params.value === "Etihad Airways") {
          return { background: "red" };
        }

        return null; // Return null for default styling
      },
    },
    { field: "FlightIdentifier", headerName: "Flight Identifier" },
    { field: "ScheduleDepartureDate", headerName: "Schedule Departure Date" },
    { field: "ScheduleDepartureTime", headerName: "Schedule Departure Time" },
    { field: "AirportIATACode", headerName: "Airport IATA Code" },
    { field: "AirportICAOCode", headerName: "Airport ICAO Code" },
    { field: "AirportName", headerName: "Airport Name" },
    { field: "AirportCity", headerName: "Airport City" },
    { field: "AirportCountry", headerName: "Airport Country" },
    { field: "FlightNature", headerName: "Flight Nature" },
    { field: "FlightQualifier", headerName: "Flight Qualifier" },
    { field: "FlightStatus", headerName: "Flight Status" },
    { field: "InternationalStatus", headerName: "International Status" },
    {
      field: "ActualDepartureTime",
      headerName: "Actual Departure Time",
      width: 300,
    },
    {
      field: "MostConfidentDepartureTime",
      headerName: "Most Confident Departure Time",
      resizable: true,
      width: 300,
    },

    {
      field: "MostConfidentOffChocksTime",
      headerName: "Most Confident Off Chocks Time",
      resizable: true,
      width: 300,
    },
    {
      field: "EstimatedDepartureTime",
      headerName: "Estimated Departure Time",
      resizable: true,
      width: 300,
    },
    { field: "AircraftRegistration", headerName: "Aircraft Registration" },
    { field: "AircraftIATACode", headerName: "Aircraft IATA Code" },
    { field: "AircraftICAOCode", headerName: "Aircraft ICAO Code" },
    { field: "AircraftName", headerName: "Aircraft Name" },
    { field: "OriginAirportIATA", headerName: "Origin Airport IATA" },
    { field: "OriginAirportICAO", headerName: "Origin Airport ICAO" },
    { field: "OriginAirportName", headerName: "Origin Airport Name" },
    { field: "OriginAirportCity", headerName: "Origin Airport City" },
    { field: "OriginAirportCountry", headerName: "Origin Airport Country" },
    { field: "DestinationAirportIATA", headerName: "Destination Airport IATA" },
    { field: "DestinationAirportICAO", headerName: "Destination Airport ICAO" },
    { field: "DestinationAirportName", headerName: "Destination Airport Name" },
    { field: "DestinationAirportCity", headerName: "Destination Airport City" },
    {
      field: "DestinationAirportCountry",
      headerName: "Destination Airport Country",
    },
    { field: "StandArea", headerName: "Stand Area", width: 400 },
    { field: "StandNumber", headerName: "Stand Number" },
    {
      field: "StandAllocationStartTime",
      headerName: "Stand Allocation Start Time",
    },
    {
      field: "StandAllocationEndTime",
      headerName: "Stand Allocation End Time",
    },
    {
      field: "Terminal",
      headerName: "Terminal(1-Domestic,2-Internationl)",
    },
    {
      field: "LinkedFlightUniqueID",
      headerName: "Linked Flight Unique ID",
    },
    {
      field: "LinkedFlightAirlineIATA",
      headerName: "Linked Flight Airline IATA",
    },
    {
      field: "LinkedFlightAirlineICAO",
      headerName: "Linked Flight Airline ICAO",
    },
    {
      field: "LinkedFlightAirlineName",
      headerName: "Linked Flight Airline Name",
    },
    {
      field: "LinkedFlightAirlineCity",
      headerName: "Linked Flight Airline City",
    },
    {
      field: "LinkedFlightAirlineCountry",
      headerName: "Linked Flight Airline Country",
    },
    {
      field: "LinkedFlightScheduleDepartureDate",
      headerName: "Linked Flight Schedule Departure Date",
    },
    {
      field: "LinkedFlightScheduleDepartureTime",
      headerName: "Linked Flight Schedule Departure Time",
    },
    {
      field: "Groundedflightornot",
      headerName: "Grounded flight or not",
    },
    {
      field: "SendtobillingforAIMS",
      headerName: "Send to billing for AIMS",
    },
  ]);

  const [tempD, setTempD] = useState(colData);

  const [fDate, setFDate] = useState(0);
  const [tDate, setTDate] = useState(0);

  const defaultColDef = {
    animateRows: true,
    sortable: true,
    filter: true,
    floatingFilter: true,
    editable: true,
    resizable: true,
  };

  const [colInput, setColInput] = useState();
  let columnFilters = ["timestamp"];

  // const [filteredCol, setfilteredCol] = useState([]);

  const [z, setZ] = useState(colData);

  const filteredCol = [];
  var s = 0;

  const ApplyFilter = async () => {
    let c = [];
    c.push(colInput);

    // const filteredColumnDefinitions = colData
    //   .filter((column) => c.includes(column.headerName.toLocaleLowerCase()))
    //   .map((column) => ({ ...column }));

    var v = colData;

    const filteredColumnDefinitions = v.filter((column) => {
      return c.includes(column.headerName.toLocaleLowerCase());
    });
    console.log(filteredColumnDefinitions);

    // const updatedFilteredCol = [...filteredCol, filteredColumnDefinitions[0]];
    // setfilteredCol(updatedFilteredCol);
    filteredCol.push(filteredColumnDefinitions[0]);

    console.log(filteredCol);

    setZ([]);

    setZ((prevCols) => [...prevCols, filteredColumnDefinitions[0]]);

    console.log("z value", z);
    setTempD(z);
  };

  const resetState = () => {
    setTempD(colData);
  };

  function onGridReady(params) {
    setgApi(params.api);
  }

  const triggerSearch = (e) => {
    gApi.setQuickFilter(e.target.value);
  };

  const addCols = async (e) => {
    const s = e.target.value.toLocaleLowerCase();
    setColInput(s);
  };

  const ExportContent = useCallback(() => {
    if (gApi) {
      gApi.exportDataAsCsv({ allColumns: true });
    }
  }, [gApi]);
  const popupParent = useMemo(() => {
    return document.body;
  }, []);

  // const getFilterType = () => {
  //   if (fDate !== "" && tDate !== "") return "inRange";
  //   else if (startDate !== "") return "greaterThan";
  //   else if (endDate !== "") return "lessThan";
  // };
  const ApplyRangeFilter = () => {
    var dateFilterComponent = gApi.getFilterInstance("date");

    var d1 = fDate.split("-");
    var d2 = tDate.split("-");

    var fromDate = d1[2] + "-" + d1[1] + "-" + d1[0];
    var toDate = d2[2] + "-" + d2[1] + "-" + d2[0];

    dateFilterComponent.setModel({
      type: "inRange",
      dateFrom: fDate,
      dateTo: tDate,
    });

    gApi.onFilterChanged();
  };

  const [fTime, setFTime] = useState(0);
  const [tTime, setTTime] = useState(0);

  const ApplyTimeFilter = () => {
    const rows = gApi.getModel().rowsToDisplay;

    // Iterate over each row
    rows.forEach((rowNode) => {
      // Get the value of the time column for the current row
      const timeValue = rowNode.data.Time; // Replace 'timeColumn' with the actual column key or field name of the time column in your grid

      // Convert time values to Date objects or comparable values
      var fTimeParts = fTime.split(":");
      var tTimeParts = tTime.split(":");
      var timeValueParts = timeValue.split(":");

      let g =
        Number(fTimeParts[0]) <= Number(timeValueParts[0]) &&
        Number(timeValueParts[0]) <= Number(tTimeParts[0]);

      let g1 =
        Number(fTimeParts[1]) <= Number(timeValueParts[1]) &&
        Number(timeValueParts[1]) <= Number(tTimeParts[1]);

      let g2 =
        Number(fTimeParts[2]) <= Number(timeValueParts[2]) &&
        Number(timeValueParts[2]) <= Number(tTimeParts[2]);

      // Check if the current cell value is within the specified range
      if (g1 && g) {
        // If the cell value is within the range, set 'display' to true for the current row
      } else {
        // I

        gridRef.current.api.applyTransaction({ remove: [rowNode.data] });
      }
    });
  };

  return (
    <div className="HomePage">
      <div className="filterBar">
        <input
          placeholder="From Date"
          type="date"
          className="fdinput"
          onChange={(e) => {
            setFDate(e.target.value);
          }}
        />

        <input
          placeholder="To Date"
          type="date"
          className="tdinput"
          onChange={(e) => {
            setTDate(e.target.value);
          }}
        ></input>
        <button onClick={ApplyRangeFilter} className="rangeFilterButton">
          Filter
        </button>

        <input
          placeholder="From time"
          className="ftinput"
          type="text"
          onChange={(e) => {
            setFTime(e.target.value);
          }}
        ></input>
        <input
          placeholder="To time"
          className="ttinput"
          type="text"
          onChange={(e) => {
            setTTime(e.target.value);
          }}
        ></input>

        <button onClick={ApplyTimeFilter} className="timeButton">
          Filter
        </button>
        <input
          placeholder="Search Here"
          className="sBar"
          onChange={triggerSearch}
          type="text"
        ></input>
      </div>

      <div
        className="ag-theme-balham-dark"
        style={{ height: "90vh", width: "100vw" }}
      >
        <AgGridReact
          rowData={row}
          rowHeight={22}
          headerHeight={25}
          columnDefs={tempD}
          defaultColDef={defaultColDef}
          getRowStyle={getRowStyle}
          popupParent={popupParent}
          onGridReady={onGridReady}
          sideBar={true}
          ref={gridRef}
        ></AgGridReact>
      </div>
    </div>
  );
}
