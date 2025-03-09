"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import useDrivers from "@/hooks/useFetchDrivers";
import ModalCreateDriver from "@/components/ModalCreateDriver";

const ListDrivers = ({ onSelectDriver }) => {
  // State from fetch driver hook
  const { drivers, loading, error } = useDrivers();
  // State of modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="h-full w-1/3 bg-red-500 p-4">
      <ModalCreateDriver isOpen={isModalOpen} onClose={closeModal} />
      <ul className="list gap-2">
        {/* List Header with Add Driver Button */}
        <div className="flex items-center justify-between bg-orange-400">
          <h1 className="text-start text-3xl font-bold">Drivers</h1>
          <button className="btn whitespace-nowrap" onClick={openModal}>
            <Icon icon="akar-icons:plus" />
            New Driver
          </button>
        </div>

        {/* Loading Drivers */}
        {loading && (
          <div className="flex w-full flex-col items-center justify-center">
            <span className="loading loading-infinity loading-xl"></span>
            <p className="text-xs">Loading Drivers list</p>
          </div>
        )}

        {/* Error Fetching Drivers */}
        {error && (
          <div role="alert" className="alert alert-info alert-dash">
            <span>{error}</span>
          </div>
        )}

        {/* Drivers List */}
        {drivers.length === 0 ? (
          <p>No Drivers Available, Create One.</p>
        ) : (
          drivers.map((driver) => (
            <Driver
              key={driver.id}
              driver={driver}
              onClick={() => onSelectDriver(driver)}
            />
          ))
        )}
      </ul>
    </div>
  );
};

// Driver Component for Drivers List
const Driver = ({ driver, onClick }) => {
  const { id, name, avatar, phone, email } = driver;
  const avatarUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/drivers/${id}/${avatar}`;

  return (
    <div
      className="flex h-20 w-full cursor-pointer flex-row items-start justify-start gap-2 rounded-2xl bg-amber-200 py-2 pr-4 pl-2"
      onClick={onClick}
    >
      <div className="aspect-square h-full">
        <img
          src={avatarUrl}
          alt="Driver"
          className="h-full w-full rounded-xl object-cover"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-xl whitespace-nowrap text-black">{name}</h1>
        <p className="text-xs text-gray-600">{email}</p>
        <p className="text-xs text-gray-600">+63 {phone}</p>
      </div>
    </div>
  );
};

export default ListDrivers;
