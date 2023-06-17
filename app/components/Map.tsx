"use client";

import leaf from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

//@ts-ignore
delete leaf.Icon.Default.prototype._getIconUrl;

leaf.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export interface IMapProps {
  center?: number[];
}

export const Map: React.FC<IMapProps> = ({ center }) => {
  return (
    <MapContainer
      center={(center as leaf.LatLngExpression) ?? [51, -0.09]}
      zoom={center ? 4 : 2}
      scrollWheelZoom={false}
      className='h-[35vh] rounded-lg'
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={(center as leaf.LatLngExpression) ?? [51, -0.09]} />
    </MapContainer>
  );
};
