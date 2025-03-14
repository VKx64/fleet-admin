import { useState } from 'react';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://192.168.1.7:8090');

const useCreateDriver = (adminId) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createDriver = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      if (!adminId) {
        setError('Admin ID is required');
        return;
      }

      // Prepare FormData to include both text fields and the avatar file
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('email', formData.email);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('password', formData.password);
      formDataToSubmit.append('passwordConfirm', formData.password); // Add passwordConfirm field
      formDataToSubmit.append('admin', adminId);
      if (formData.avatar) {
        formDataToSubmit.append('avatar', formData.avatar);
      }

      // Log FormData to inspect the contents
      console.log("FormData to be sent:", formDataToSubmit);

      // Use PocketBase SDK to create a new driver record
      await pb.collection('drivers').create(formDataToSubmit);

      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { createDriver, loading, error };
};

export default useCreateDriver;
