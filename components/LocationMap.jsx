import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the map components for SSR compatibility
const MapWithNoSSR = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const LocationMap = () => {
  const position = [6.1157, 125.1795]; // Coordinates for STI College, General Santos City
  const zoomLevel = 13; // Map zoom level

  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    // Check if the map is properly loaded
    setMapReady(true);
  }, []);

  if (!mapReady) {
    return <div>Loading Map...</div>;
  }

  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapWithNoSSR center={position} zoom={zoomLevel} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>STI College, General Santos City</Popup>
        </Marker>
      </MapWithNoSSR>
    </div>
  );
};

export default LocationMap;
