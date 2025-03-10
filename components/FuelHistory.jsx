import React from "react";
import useFetchFuels from "@/hooks/useFetchFuels";

const FuelHistory = ({ fleet }) => {
  const { fuelEntries, loading, error } = useFetchFuels(fleet.id);

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="rounded-box border-base-content/5 bg-base-100 flex flex-col gap-5 overflow-x-auto border p-8 h-full">
        <h1 className="text-3xl font-bold">Fuel Consumption Record</h1>
        <table className="table overflow-y-scroll">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Entry Date</th>
              <th>Fuel Quantity</th>
              <th>Fuel Type</th>
              <th>Cost per Unit</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            )}
            {error && (
              <tr>
                <td colSpan="5" className="text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && fuelEntries.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No fuel entries available
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              fuelEntries.map((entry, index) => (
                <tr key={entry.id}>
                  <th>{index + 1}</th>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.quantity} liter</td>
                  <td>{entry.fuel_type}</td>
                  <td>{entry.cost_per_unit}₱ per liter</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FuelHistory;
