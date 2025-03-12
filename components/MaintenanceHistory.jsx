import React from 'react';
import useFetchMaintenanceHistory from "@/hooks/useFetchMaintenanceHistory";

const MaintenanceHistory = ({ fleet }) => {
  const { maintenanceHistory, loading, error } = useFetchMaintenanceHistory(fleet.id);

  return (
    <div className="flex h-full w-full flex-col gap-5">
      <div className="rounded-box border-base-content/5 bg-base-100 flex flex-col gap-5 overflow-x-auto border p-8 h-full">
        <h1 className="text-3xl font-bold">Maintenance History</h1>
        <table className="table overflow-y-scroll">
          <thead>
            <tr>
              <th>#</th>
              <th>Maintenance</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Result</th>
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
            {!loading && !error && maintenanceHistory.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No maintenance history available
                </td>
              </tr>
            )}
            {!loading && !error && maintenanceHistory.map((entry, index) => (
              <tr key={entry.id}>
                <th>{index + 1}</th>
                <td>{entry.expand?.maintenance?.name || 'N/A'}</td> {/* Display the maintenance name */}
                <td>{entry.date}</td>
                <td>{entry.remarks}</td>
                <td>{entry.result}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MaintenanceHistory;