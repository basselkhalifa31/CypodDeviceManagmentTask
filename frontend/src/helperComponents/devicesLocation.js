import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

import "leaflet/dist/leaflet.css";

const DevicesLocation = ({ devices }) => {
  const bounds = devices.map(device => [device.lat, device.lng]);
  const pinIcon = new Icon({
    iconUrl: require("../icons/pin.png"),
    iconSize: [42, 42]
  });

  return (
    <MapContainer
      center={[25.243143273449427, 55.32663345336914]}
      zoom={10}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {devices.map(device => (
        <Marker
          key={device.id}
          position={[device.lat, device.lng]}
          icon={pinIcon}
        >
          <Popup>
            <h3>{device.name}</h3>
            <p>Status: {device.status}</p>
            <p>Temperature: {device.temperature}</p>
            <p>Humidity: {device.humidity}</p>
            <p>Power Consumption: {device.totalPowerConsumption}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default DevicesLocation;
