"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position: [number, number] = [13.0827, 80.2707];

export default function Map() {
  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: "400px", width: "87%", margin:"auto" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}