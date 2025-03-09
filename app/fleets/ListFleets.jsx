import React, { useState } from "react";
import { Icon } from "@iconify/react";
import useFetchFleets from "@/hooks/useFetchFleets";
import ModalCreateFleet from "@/components/ModalCreateFleet";

const ListFleets = ({ driver }) => {
  const { fleets, loading, error } = useFetchFleets(driver);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="h-full w-full bg-blue-500 p-4 gap-2 flex flex-col">
      {/* Header with new fleet button */}
      <div className="flex items-center justify-between bg-orange-400">
        <h1 className="text-start text-3xl font-bold">Fleets</h1>
        <button className="btn whitespace-nowrap" onClick={openModal}>
          <Icon icon="akar-icons:plus" />
          New Fleet
        </button>
      </div>

      {/* Loading fleets */}
      {loading && (
        <div className="flex w-full flex-col items-center justify-center">
          <span className="loading loading-infinity loading-xl"></span>
          <p className="text-xs">Loading Fleets list</p>
        </div>
      )}

      {/* Error fetching fleets */}
      {error && (
        <div role="alert" className="alert alert-info alert-dash">
          <span>{error}</span>
        </div>
      )}

      {/* Fleets list */}
      <div className="flex flex-wrap gap-4">
        {fleets.length === 0 ? (
          <p>No Fleets available</p>
        ) : (
          fleets.map((fleet) => <Fleet key={fleet.id} fleet={fleet} />)
        )}
      </div>

      {/* Modal for creating a new fleet */}
      <ModalCreateFleet
        isOpen={isModalOpen}
        onClose={closeModal}
        driverId={driver.id}
      />
    </div>
  );
};

const Fleet = ({ fleet, onViewFleet }) => {
  const { plate, id, image } = fleet;
  const imageUrl = `${process.env.NEXT_PUBLIC_POCKETBASE_URL}/api/files/fleets/${id}/${image}`;

  return (
    <div className="flex h-fit w-48 flex-col gap-2 overflow-clip rounded-xl bg-red-500 p-2">
      <img
        className="aspect-square w-full rounded-xl object-cover"
        src={imageUrl}
        alt="Fleet"
      />
      <h1 className="text-center text-2xl">{plate}</h1>
      <button className="btn btn-soft" onClick={onViewFleet}>
        View Fleet
      </button>
    </div>
  );
};

export default ListFleets;
