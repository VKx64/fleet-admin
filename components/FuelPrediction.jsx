// components/FuelPrediction.js

import React from "react";
import useFetchFuels from "@/hooks/useFetchFuels";

const FuelPrediction = ({ fleet }) => {
  const { fuelEntries, loading, error } = useFetchFuels(fleet.id);

  // Calculate statistics
  const totalAmountSpent = fuelEntries.reduce((total, entry) => total + (entry.quantity * entry.cost_per_unit), 0);
  const totalTimesRefueled = fuelEntries.length;
  const totalGasRefueled = fuelEntries.reduce((total, entry) => total + entry.quantity, 0);

  // Predict next month's gas consumption and spendings
  const averageFuelQuantity = totalGasRefueled / totalTimesRefueled || 0;
  const averageCostPerUnit = totalAmountSpent / totalGasRefueled || 0;
  const predictedGasConsumption = averageFuelQuantity * 30; // Assuming daily refueling
  const predictedSpendings = predictedGasConsumption * averageCostPerUnit;

  return (
    <div className="stats border-base-content/5 bg-base-100 w-full h-fit overflow-clip border p-8">
      <div className="stats">
        <div className="stat-title">Predicted Gas Consumption (Next Month)</div>
        <div className="stat-value">
          {loading ? "Loading..." : `${predictedGasConsumption.toFixed(2)} liters`}
        </div>
        <div className="stat-desc">
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>

      <div className="stats">
        <div className="stat-title">Predicted Spendings (Next Month)</div>
        <div className="stat-value">
          {loading ? "Loading..." : `₱${predictedSpendings.toFixed(2)}`}
        </div>
        <div className="stat-desc">
          {error && <span className="text-red-500">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default FuelPrediction;
