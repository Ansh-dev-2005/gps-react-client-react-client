import React, { useState } from "react";
import BaseTwo from "../Components/Base/BaseTwo";
import BackButton from "../Components/BackButton/BackButton";
import MapComponent from "../Components/Maps/MapComponent";
import { createSighting, uploadImage } from "../Helpers";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of Navigate
import config from "../config.json";

const Form = () => {
  const navigate = useNavigate(); // Use navigate hook
  const [loadingImage, setLoadingImage] = useState(false);
  const [formData, setFormData] = useState({
    gpsCoordinates: "", // Corrected typo: "Coodinates" -> "Coordinates"
    imageUrl: "",
    remarks: "",
  });

  const [selectedLocation, setSelectedLocation] = useState({
    lat: 37.7749,
    lng: -122.4194,
  });
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    setFormData({
      ...formData,
      gpsCoordinates: `${location.lat},${location.lng}`,
    });
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
          setFormData({
            ...formData,
            gpsCoordinates: JSON.stringify(currentLocation),
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation) {
      alert("Please select a location");
      return;
    }

    const payload = { ...formData };

    try {
      const response = await createSighting(payload);

      if (response.success) {
        alert("Sighting created successfully!");
        navigate("/sightings"); // Use navigate to redirect
      } else {
        alert("Failed to create sighting");
      }
    } catch (err) {
      console.error("Error creating sighting:", err);
      alert("Failed to create sighting");
    }
  };
const handleUploadImage = async (e) => {
  const file = e.target.files[0];
  if (file) {
    try {
      setLoadingImage(true);
      const formData = new FormData();
      console.log("file", file);
      formData.append("image", file); // Ensure 'image' matches the name used in multer

      const response = await uploadImage(formData);

   
      if (response.success) {
        setFormData({
          ...formData,
          imageUrl: response.fileUrl,
        });
        // setImageUrl(result.fileUrl);
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image");
    } finally {
      setLoadingImage(false);
    }
  }
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
            type="file"
            name="image"
            accept="image/*"
            onChange={handleUploadImage}
            className="p-2 border-2 border-gray-300 rounded-md bg-gray-50 text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
          />
          {loadingImage && <p>Uploading image...</p>}
          {formData.imageUrl && (
            <img
              src={`${config.URL}public/${formData.imageUrl}`}
              alt="Uploaded"
              className="mt-2 rounded-md shadow-md"
            />
          )}

          <textarea
            placeholder="Description"
            value={formData.remarks}
            onChange={(e) =>
              setFormData({ ...formData, remarks: e.target.value })
            }
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
