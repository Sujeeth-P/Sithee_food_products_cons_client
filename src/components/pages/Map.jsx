import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});


const outlets = [
  { id: 1, name: "No147, Near Ration Shop, C.mettupalayam, Perode-638102", position: [ 11.379185431608306, 77.64138380070528] }
];

const Map = () => {
  return (
    <MapContainer
      center={[10.7905, 78.7047]}
      zoom={7}
      style={{ height: "400px", width: "100%" }}
      scrollWheelZoom={true}
      draggable={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {outlets.map((outlet) => (
        <Marker key={outlet.id} position={outlet.position}>
          <Popup>{outlet.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
