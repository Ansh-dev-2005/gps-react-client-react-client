import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import BaseTwo from "../Components/Base/BaseTwo";
import BackButton from "../Components/BackButton/BackButton";
import config from "../config.json";
import { getToken } from "../Helpers/index";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100vw",
  height: "70vh",
};

const center = {
  lat: 30.3165,
  lng: 78.0322,
};

const Locations = () => {
  const [data, setData] = useState(null);
  const [join, setJoin] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedBus, setSelectedBus] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBYC76JOZuZ35FNEsaW5gk7hibfcJu9I0Q", // Replace with your actual API key
  });

  useEffect(() => {
    const socket = socketIO.connect(config.URL, {
      extraHeaders: {
        Authorization: `Bearer ${getToken()[2]}`,
      },
    });

    socket.on("connect", () => {
      console.log("connected");
      socket.emit("all", "");
    });

    socket.on("disconnect", () => {
      setJoin(false);
    });

    socket.on("joined", (data) => {
      setJoin(true);
      socket.emit("all-location", "");
    });

    socket.on("location-all", (data) => {
      setData(data);
      setLoading(false);
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }

    const interval = setInterval(() => {
      socket.emit("all-location", "");
    }, 5000);

    return () => {
      socket.disconnect();
      clearInterval(interval);
    };
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <BaseTwo
      header={<BackButton title={data ? "All Buses" : "Loading..."} />}
      style="bg-white rounded-t-2xl"
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {userPosition && <Marker position={userPosition} />}

        {data &&
          data.map((item, index) => {
            let bus = JSON.parse(item);
            let gpsData = JSON.parse(bus.lastGpsInformation);
            let routeLatLng = bus.routeLatLng.map((point) => ({
              lat: point.lat,
              lng: point.lng,
            }));

            return (
              <React.Fragment key={index}>
                {/* Markers for each bus */}
                <Marker
                  position={{ lat: gpsData.latitude, lng: gpsData.longitude }}
                  onClick={() => {
                    setSelectedBus(bus);
                  }}
                />

                {/* Polyline for bus route */}
                <Polyline
                  path={routeLatLng}
                  options={{
                    strokeColor: "#6FA1EC",
                    strokeOpacity: 1,
                    strokeWeight: 4,
                  }}
                />
              </React.Fragment>
            );
          })}

        {/* InfoWindow to display details of selected bus */}
        {selectedBus && (
          <InfoWindow
            position={{ lat: selectedBus.latitude, lng: selectedBus.longitude }}
            onCloseClick={() => {
              setSelectedBus(null);
            }}
          >
            <div>
              <h2>{selectedBus.vehicleRegistration}</h2>
              <p>Driver Contact: {selectedBus.driverContact}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </BaseTwo>
  );
};

export default Locations;
