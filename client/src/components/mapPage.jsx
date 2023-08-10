import { useRef, useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import "./mapPage.scss";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

export default function MapPage() {
  const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const [lat1, setLat1] = useState(0);
  const [lon1, setLon1] = useState(0);
  const [lat2, setLat2] = useState(0);
  const [lon2, setLon2] = useState(0);
  const [lat3, setLat3] = useState(0);
  const [lon3, setLon3] = useState(0);
  const [lat4, setLat4] = useState(0);
  const [lon4, setLon4] = useState(0);
  const [lat5, setLat5] = useState(0);
  const [lon5, setLon5] = useState(0);
  const [lat6, setLat6] = useState(0);
  const [lon6, setLon6] = useState(0);
  const [lat7, setLat7] = useState(0);
  const [lon7, setLon7] = useState(0);
  const [lat8, setLat8] = useState(0);
  const [lon8, setLon8] = useState(0);
  const [lat9, setLat9] = useState(0);
  const [lon9, setLon9] = useState(0);
  const [lat10, setLat10] = useState(0);
  const [lon10, setLon10] = useState(0);
  const [lat11, setLat11] = useState(0);
  const [lon11, setLon11] = useState(0);
  const [lat12, setLat12] = useState(0);
  const [lon12, setLon12] = useState(0);
  const [lat13, setLat13] = useState(0);
  const [lon13, setLon13] = useState(0);
  const [lat14, setLat14] = useState(0);
  const [lon14, setLon14] = useState(0);
  const [arLen, setArLen] = useState(0);
  const mapRef = useRef();
  const icon = new L.icon({
    iconUrl: require("../plane.png"),
    iconSize: [35, 45],
  });
  const getData = async () => {
    try {
      var v = await axios.get("https://blunav-backend-2.onrender.com/input");
      setArLen(v.data.length);
      setLat1(v.data[0]);
      setLon1(v.data[1]);
      setLat2(v.data[2]);
      setLon2(v.data[3]);
      setLat3(v.data[4]);
      setLon3(v.data[5]);
      setLat4(v.data[6]);
      setLon4(v.data[7]);
      setLat5(v.data[8]);
      setLon5(v.data[9]);
      setLat6(v.data[10]);
      setLon6(v.data[11]);
      setLat7(v.data[12]);
      setLon7(v.data[13]);
      setLat8(v.data[14]);
      setLon8(v.data[15]);
      setLat9(v.data[16]);
      setLon9(v.data[17]);
      setLat10(v.data[18]);
      setLon10(v.data[19]);
      setLat11(v.data[20]);
      setLon11(v.data[21]);
      setLat12(v.data[22]);
      setLon12(v.data[23]);
      setLat13(v.data[24]);
      setLon13(v.data[25]);
      setLat14(v.data[26]);
      setLon14(v.data[27]);
      console.log(v.data);
      // if (v != null) {
      //   setLat(v);
      // }
      // console.log(v);
      // console.log(ar);
      //console.log(v[1]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setInterval(() => getData(), 1000);
  });
  return (
    <div className="MapPage">
      <MapContainer center={[13.4, 80.7]} zoom={8} ref={mapRef}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        if ((lat1!=null) && (lon1!=null))
        {
          <Marker position={[lat1, lon1]} icon={icon}>
            <Popup>
              <h1>I041</h1>
            </Popup>
          </Marker>
        }
        if ((lat2!=null) && (lon2!=null))
        {
          <Marker position={[lat2, lon2]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat3!=null) && (lon3!=null))
        {
          <Marker position={[lat3, lon3]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat4!=null) && (lon4!=null))
        {
          <Marker position={[lat4, lon4]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat5!=null) && (lon5!=null))
        {
          <Marker position={[lat5, lon5]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat6!=null) && (lon6!=null))
        {
          <Marker position={[lat6, lon6]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat7!=null) && (lon7!=null))
        {
          <Marker position={[lat7, lon7]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat8!=null) && (lon8!=null))
        {
          <Marker position={[lat8, lon8]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat9!=null) && (lon9!=null))
        {
          <Marker position={[lat9, lon9]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat10!=null) && (lon10!=null))
        {
          <Marker position={[lat10, lon10]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat11!=null) && (lon11!=null))
        {
          <Marker position={[lat11, lon11]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat12!=null) && (lon12!=null))
        {
          <Marker position={[lat12, lon12]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat13!=null) && (lon13!=null))
        {
          <Marker position={[lat13, lon13]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
        if ((lat14!=null) && (lon14!=null))
        {
          <Marker position={[lat14, lon14]} icon={icon}>
            <Popup>
              <h1>I042</h1>
            </Popup>
          </Marker>
        }
      </MapContainer>
    </div>
  );
}
