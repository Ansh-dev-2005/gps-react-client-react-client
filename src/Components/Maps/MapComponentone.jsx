import React, { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const Map = ({ location }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCWtaj4Gfc7NE9ni0zctH0MFyoiTGvL81I", // Your API key
  });
  useEffect(() => {
    console.log(location);
  }, [location]);
  

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap
      zoom={14}
      center={location} // Center the map on the provided location
      mapContainerStyle={{ width: "100%", height: "400px" }} // Adjust the size as needed
    >
      {/* Add a marker at the location */}
      <Marker position={location} />
    </GoogleMap>
  );
};

export default Map;
