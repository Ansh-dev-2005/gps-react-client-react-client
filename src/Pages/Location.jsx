import React, { useEffect, useState } from "react";
import socketIO from "socket.io-client";
import BaseTwo from "../Components/Base/BaseTwo";
import BackButton from "../Components/BackButton/BackButton";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import config from "../config.json";
import { getBusById, getToken } from "../Helpers/index";

const mapContainerStyle = {
  width: "100vw",
  height: "50vh",
};

const center = {
  lat: 30.3165,
  lng: 78.0322,
};

const Location = () => {
  const [data, setData] = useState(null);
  const [join, setJoin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const [position, setPosition] = useState(center);
  const [userPosition, setUserPosition] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBYC76JOZuZ35FNEsaW5gk7hibfcJu9I0Q", // Replace with your API key
  });
  const [selectedBus, setSelectedBus] = useState(null);

  useEffect(() => {
    if (!params.has("id")) return navigate("/buses");

    const socket = socketIO.connect(config.URL, {
      extraHeaders: {
        Authorization: `Bearer ${getToken()[2]}`,
      },
    });

    socket.on("connect", () => {
      socket.emit("bus", params.get("id"));
    });

    socket.on("disconnect", () => {
      setJoin(false);
    });

    socket.on("joined", (data) => {
      setJoin(true);
    });

    socket.emit("location", params.get("id"));

    socket.on("locationsent", (item) => {
      let loc = JSON.parse(item);
      setData(loc);
      loc = JSON.parse(loc.lastGpsInformation);
      setLoading(false);
      setPosition({ lat: loc.latitude, lng: loc.longitude });
    });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }

    const interval = setInterval(() => {
      socket.emit("location", params.get("id"));
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          setUserPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        });
      } else {
        console.log("Geolocation is not available in your browser.");
      }
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
      header={<BackButton title={data ? data.routeName : "Loading..."} />}
      style="bg-white rounded-t-2xl"
    >
      <div className="flex flex-col md:p-2 ">
        <div className="flex flex-row flex-wrap gap-1 h-1/3 pt-4 pl-2 md:pl-5">
          <p className="text-black text-lg">
            <strong>Driver Contact: </strong>
            {data ? data.driverContact : ""}
          </p>
          <p className="text-black text-lg">
            <strong>Last Location: </strong>
            {data ? JSON.parse(data.lastGpsInformation).address : ""}
          </p>
          <p className="text-black text-lg">
            <strong>RTO: </strong>
            {data ? data.vehicleRegistration : ""}
          </p>
          <p className="text-black text-lg">
            <strong>State Of Bus: </strong>
            {data ? JSON.parse(data.lastGpsInformation).statusStr : ""}
          </p>
          <p className="text-black text-lg">
            <strong>Last Updated: </strong>
            {data ? JSON.parse(data.lastGpsInformation).gpsTimeStr : ""}
          </p>
          {!userPosition ? (
            <p className="text-sm">
              Allow Location To See Your Location As Well.
            </p>
          ) : (
            ""
          )}
          {join ? (
            <p className="text-sm">Status: Connected</p>
          ) : (
            <p className="text-sm">Status: Disconnected</p>
          )}
        </div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={13}
          center={position}
        >
          <Marker
            position={position}
            onClick={() => {
              setSelectedBus(data);
            }}
          />
          {selectedBus && (
            <InfoWindow
              position={position}
              onCloseClick={() => {
                setSelectedBus(null);
              }}
            >
              <div>
                <h2>{selectedBus.vehicleRegistration}</h2>
                <p>{selectedBus.driverContact}</p>
              </div>
            </InfoWindow>
          )}
          {userPosition && <Marker position={userPosition} />}
        </GoogleMap>
      </div>
    </BaseTwo>
  );
};

export default Location;
