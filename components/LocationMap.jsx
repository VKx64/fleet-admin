import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Import OpenLayers modules
import 'ol/ol.css';
import { Map } from 'ol';
import { View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Overlay } from 'ol';

const LocationMap = () => {
  const mapElement = useRef(null); // Reference to the DOM element where map will render

  useEffect(() => {
    if (mapElement.current) {
      // Create the map instance
      new Map({
        target: mapElement.current, // The DOM element to render the map in
        layers: [
          new TileLayer({
            source: new OSM(), // OpenStreetMap tile source
          }),
        ],
        view: new View({
          center: fromLonLat([125.1795, 6.1157]), // Coordinates in [longitude, latitude]
          zoom: 13,
        }),
      });
    }
  }, []);

  return (
    <div ref={mapElement} style={{ height: '500px', width: '100%' }}>
      {/* Map will be rendered here */}
    </div>
  );
};

export default LocationMap;
