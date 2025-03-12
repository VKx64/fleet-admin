import React from "react";
import useFetchMaintenance from "@/hooks/useFetchMaintenance";
import MaintenanceHistory from "./MaintenanceHistory";

const FleetMaintenance = ({ fleet }) => {
  const { maintenanceEntries, loading, error } = useFetchMaintenance(fleet.id);

  return (
    <div className="flex h-fit w-full flex-col gap-5">
      <div className="rounded-box border-base-content/5 bg-base-100 flex flex-col gap-5 overflow-x-auto border p-8 h-full">
        <h1 className="text-3xl font-bold">Maintenance List</h1>
        <table className="table overflow-y-scroll">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Interval (Days)</th>
              <th>Importance</th>
              <th>Cost</th>
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
            {!loading && !error && maintenanceEntries.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No maintenance entries available
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
              maintenanceEntries.map((entry, index) => (
                <tr key={entry.id}>
                  <th>{index + 1}</th>
                  <td>{entry.name}</td>
                  <td>{entry.interval_in_days}</td>
                  <td>{entry.importance}</td>
                  <td>{entry.cost}₱</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FleetMaintenance;