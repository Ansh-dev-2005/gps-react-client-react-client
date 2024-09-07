import React, { useEffect, useState } from "react";
import BaseTwo from "../Components/Base/BaseTwo";
import BusCard from "../Components/Bus/BusCard";
import { PlusIcon } from "@heroicons/react/24/solid"; // Import Heroicons
import BackButton from "../Components/BackButton/BackButton";
import { Navigate, useNavigate } from "react-router-dom";
import { getAllSightings } from "../Helpers";

const Buses = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null) ;

  const navigate = useNavigate();

  useEffect(() => {
    // call getAllSightings function
    // if success setData
    // if error setError

    setData(getAllSightings());
    setLoading(false);
  }
  , []);
  



  const handleAddBus = () => {
    // Handle logic for adding a new bus (could be a modal, form, or redirect)
    navigate("/add-sighting");
    
    console.log("Add new bus");
  };

  return (
    <BaseTwo
      header={<BackButton title="Elephants Sighting" />}
      style="bg-white rounded-t-2xl"
    >
      <div className="flex flex-col gap-5 w-screen items-center mt-5 mb-5">
        {/* {loading ? <h1>Loading...</h1> : <BusCard data={data} />} */}
        <BusCard data={data} />
      </div>

      {/* Floating action button to add a new bus */}
      <button
        onClick={handleAddBus}
        className="fixed bottom-24 right-5 bg-[#0075a1] text-white p-4 rounded-full shadow-lg hover:bg-[#0075a1] transition duration-300"
        aria-label="Add new bus"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </BaseTwo>
  );
};

export default Buses;
