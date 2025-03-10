import { useState, useEffect } from "react";
import { pb } from "../lib/pocketbase";

// Custom hook to fetch fuel entries based on the fleet
const useFetchFuels = (fleetId) => {
  // State to store fuel entries data
  const [fuelEntries, setFuelEntries] = useState([]);
  // State to track loading state
  const [loading, setLoading] = useState(true);
  // State to track errors
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFuelEntries = async () => {
      try {
        setLoading(true);
        const result = await pb.collection("fuel_history").getList(1, 100, {
          filter: `fleet.id = "${fleetId}"`,
          requestKey: null
        });
        setFuelEntries(result.items);
      } catch (error) {
        setError("Error fetching fuel entries.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // Fetch fuel entries when the fleetId prop changes or component mounts
    if (fleetId) fetchFuelEntries();
  }, [fleetId]);

  // Return the fuel entries data, loading state, and errors
  return { fuelEntries, loading, error };
};

export default useFetchFuels;