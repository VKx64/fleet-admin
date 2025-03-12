import { useState, useEffect } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

// Custom hook to fetch maintenance history entries based on the fleet
const useFetchMaintenanceHistory = (fleetId) => {
  const [maintenanceHistory, setMaintenanceHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMaintenanceHistory = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("maintenance_history").getList(1, 100, {
          filter: `fleet="${fleetId}"`,
          expand: 'maintenance', // Ensure this is correct
          requestKey: null
        });
        setMaintenanceHistory(result.items);
      } catch (error) {
        setError("Error fetching maintenance history.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (fleetId) fetchMaintenanceHistory();
  }, [fleetId]);

  return { maintenanceHistory, loading, error };
};

export default useFetchMaintenanceHistory;