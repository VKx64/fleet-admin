import { useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

const useCreateFleet = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createFleet = async (formData, driverId) => {
    setLoading(true);
    setError(null);

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('plate', formData.plate);
    formDataToSubmit.append('image', formData.image);
    formDataToSubmit.append('driver', driverId); // Include the driver ID

    try {
      await pb.collection('fleets').create(formDataToSubmit);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createFleet, loading, error };
};

export default useCreateFleet;