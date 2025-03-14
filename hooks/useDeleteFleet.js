import { useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

// Custom hook to delete a fleet
const useDeleteFleet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteFleet = async (fleetId) => {
    try {
      setLoading(true);
      await pb.collection("fleets").delete(fleetId);
    } catch (error) {
      setError("Error deleting fleet.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteFleet, loading, error };
};

export default useDeleteFleet;