import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

// Custom hook to fetch maintenance entries based on the fleet
const useFetchMaintenance = (fleetId) => {
  // State to store maintenance entries data
  const [maintenanceEntries, setMaintenanceEntries] = useState([]);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceEntries = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("maintenance").getList(1, 100, {
          filter: `fleet="${fleetId}"`,
          requestKey: null
        });
        setMaintenanceEntries(result.items);
      } catch (error) {
        setError("Error fetching maintenance entries.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch maintenance entries when the fleetId prop changes or component mounts
    if (fleetId) fetchMaintenanceEntries();
  }, [fleetId]);

  // Return the maintenance entries data, loading state, and errors
  return { maintenanceEntries, loading, error };
};

export default useFetchMaintenance;