import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useAuth } from '../contexts/AuthContext';
import useCreateDriver from '../hooks/useCreateDriver';

const ModalCreateDriver = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const adminId = user?.id;

  // Use the custom hook to handle the logic for creating a driver
  const { createDriver, loading, error } = useCreateDriver(adminId);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    avatar: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the custom hook to create the driver
    const success = await createDriver(formData);

    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Create New Driver</h2>
          <button onClick={onClose}>
            <Icon icon="akar-icons:cross" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Avatar</label>
            <input
              type="file"
              name="avatar"
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Driver"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateDriver;
