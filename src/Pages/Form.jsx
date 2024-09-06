import React, { useState } from "react";
import BaseTwo from "../Components/Base/BaseTwo";
import BackButton from "../Components/BackButton/BackButton";
import MapComponent from "../Components/Maps/MapComponent";

const Form = () => {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  }); // Default to San Francisco for initial load
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLocation = {
            lat: latitude,
            lng: longitude,
          };
          setSelectedLocation(currentLocation);
          setUseCurrentLocation(true);
        },
        (error) => {
          console.error("Error getting current location:", error);
          // Optionally handle the error
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission including selectedLocation
    console.log("Selected Location:", selectedLocation);
  };

  return (
    <BaseTwo
      header={<BackButton title="Report Elephants Sighting" />}
      style="bg-white rounded-t-2xl"
    >
      <div className="flex flex-col items-center mt-5 mb-5 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 w-full max-w-lg"
        >
          <input
            type="text"
            placeholder="Name"
            className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="w-full max-w-lg">
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Select Location
            </label>
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              className="bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mb-4"
            >
              Use Current Location
            </button>
            <MapComponent
              location={selectedLocation}
              onLocationSelect={handleLocationSelect}
            />
            {selectedLocation && (
              <div className="mt-4">
                <p>Selected Location:</p>
                <p>Latitude: {selectedLocation.lat}</p>
                <p>Longitude: {selectedLocation.lng}</p>
              </div>
            )}
          </div>
          <input
            type="text"
            placeholder="Date"
            className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Time"
            className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            className="p-2 border-2 border-gray-300 rounded-md bg-gray-50 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          <textarea
            placeholder="Description"
            className="p-3 border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="bg-[#0075a1] text-white p-3 rounded-md shadow-md hover:bg-[#005f73] transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </BaseTwo>
  );
};

export default Form;
