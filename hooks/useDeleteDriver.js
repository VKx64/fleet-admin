import { useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

// Custom hook to delete a driver
const useDeleteDriver = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDriver = async (driverId) => {
    try {
      setLoading(true);
      await pb.collection("drivers").delete(driverId);
    } catch (error) {
      setError("Error deleting driver.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { deleteDriver, loading, error };
};

export default useDeleteDriver;