import React, { useState } from 'react';
import { Icon } from "@iconify/react";
import useCreateFleet from '../hooks/useCreateFleet';

const ModalCreateFleet = ({ isOpen, onClose, driverId }) => {
  const [formData, setFormData] = useState({
    plate: '',
    image: null,
  });
  const { createFleet, loading, error } = useCreateFleet();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await createFleet(formData, driverId);
    if (success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-60 flex h-full w-full items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="flex h-fit w-fit flex-col gap-5 rounded-lg bg-white p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold text-black">New Fleet Form</h1>
          <button onClick={onClose}>
            <Icon icon="akar-icons:cross" />
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* Plate Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Plate?</legend>
            <input
              type="text"
              name="plate"
              className="input"
              placeholder="Type here"
              value={formData.plate}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          {/* Upload Image File Input */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-black">Upload Image</legend>
            <input
              type="file"
              name="image"
              className="file-input overflow-clip"
              onChange={handleFileChange}
            />
          </fieldset>

          {/* Form Buttons */}
          <div className="mt-4 flex justify-start gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalCreateFleet;