"use client";
import React, { useState } from 'react'
import ListDrivers from './ListDrivers'
import ListFleets from './ListFleets';

const page = () => {
  const [selectedDriver, setSelectedDriver] = useState(null);

  // Function to handle driver selection
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
  };

  return (
    <div className="flex h-full w-full flex-row">
      <ListDrivers onSelectDriver={handleDriverSelect} />

      {/* Conditionally check for driver selection */}
      {selectedDriver ? (
        // If Driver Found
        <ListFleets driver={selectedDriver} />
      ) : (
        // If Driver not Found
        <p className="flex h-full w-full items-center justify-center bg-blue-500">
          Select a driver first
        </p>
      )}
    </div>
  )
}

export default page