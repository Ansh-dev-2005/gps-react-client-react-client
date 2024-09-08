import React, { useEffect, useState } from 'react'
import BaseTwo from '../Components/Base/BaseTwo'
import BackButton from '../Components/BackButton/BackButton';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getSight } from '../Helpers';
import MapComponent from '../Components/Maps/MapComponent';
import Map from '../Components/Maps/MapComponentone';

const Sight = () => {
    const [params, setParams] = useSearchParams();
    const [data, setData] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState();

    const navigate = useNavigate();


  useEffect(() => {
    console.log(params);
     if (!params.has("id")) return navigate("/home");
      const id = params.get("id");

      // Fetch the sight with the given id
      // Use the id to fetch the sight
      
      getSight(id).then((data) => {
        setData(data);
  const [latitude, longitude] = data.dbRes.gpsCoordinates.split(",");
  setSelectedLocation({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  });
        console.log(data.dbRes);
      });

  }, []);



  return (
    <BaseTwo
      header={<BackButton title={data ? "All Buses" : "Loading..."} />}
      style="bg-white rounded-t-2xl"
    >
      {data ? (
        <div className="flex flex-col items-start p-5">
          <div className="flex flex-col items-start p-5">
            <h1 className="text-3xl font-semibold text-black">
              Sighted At: {data.dbRes.remarks}
            </h1>
            <h1 className="text-xl font-medium text-black">
              <Map
                location={selectedLocation}
              />
            </h1>
            <p className="text-sm font-normal text-black">
              {data.dbRes.description}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-96">
          <p className="text-gray-500">Loading...</p>
        </div>
      )}
    </BaseTwo>
  );
}

export default Sight