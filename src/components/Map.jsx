import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ cafes, warehouses }) => {
  return (
    <MapContainer
      center={[21.893997344670613, -102.2942098266233]}
      zoom={12}
      style={{ height: '600px' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {cafes.map((cafe) => (
        <Marker key={cafe.ID} position={[cafe.Latitud, cafe.Longitud]}>
          <Popup>
            <strong>{cafe.Nombre}</strong>
            <br />
            {cafe.Personal} personas
          </Popup>
        </Marker>
      ))}
      {warehouses.map((warehouse) => (
        //this marker is for the warehouse so its color is different
        <Marker
          position={[warehouse.Latitud, warehouse.Longitud]}
          icon={
            new L.Icon({
              iconUrl:
                'https://cdn-icons-png.flaticon.com/512/3774/3774895.png',

              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            })
          }
        >
          <Popup>
            <strong>{'almacen'}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;
