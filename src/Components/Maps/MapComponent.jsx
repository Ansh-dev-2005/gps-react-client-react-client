import React, { useState, useCallback } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
  height: "400px",
  width: "100%",
};

const MapComponent = ({ location, onLocationSelect }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCWtaj4Gfc7NE9ni0zctH0MFyoiTGvL81I", // Replace with your API key
    libraries,
  });

  const [map, setMap] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(location);

  const handleMapClick = useCallback(
    (event) => {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedLocation(newLocation);
      onLocationSelect(newLocation);
    },
    [onLocationSelect]
  );

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={12}
      center={selectedLocation}
      onClick={handleMapClick}
      onLoad={(mapInstance) => setMap(mapInstance)}
    >
      <Marker position={selectedLocation} />
    </GoogleMap>
  );
};

export default MapComponent;
