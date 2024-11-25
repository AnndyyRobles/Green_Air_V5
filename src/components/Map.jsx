import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map({ latitude, longitude, stationName }) {
  return (
    <div className="bg-app-card p-4 rounded-lg h-[300px]">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>{stationName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}