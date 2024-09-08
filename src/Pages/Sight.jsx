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
    const [selectedLocation, setSelectedLocation] = useState([0,0]);

    const navigate = useNavigate();


  useEffect(() => {
    console.log(params);
     if (!params.has("id")) return navigate("/home");
      const id = params.get("id");

      // Fetch the sight with the given id
      // Use the id to fetch the sight
      
      getSight(id).then((data) => {
        setData(data);
        const coo = JSON.parse(data.dbRes.gpsCoordinates)
        setSelectedLocation({
          lat: parseFloat(coo.lat),
          lng: parseFloat(coo.lng),
        });
        console.log(data.dbRes);
      });

  }, []);



  return (
    <BaseTwo
      header={<BackButton title={data ? "Sight" : "Loading..."} />}
      style="bg-white rounded-t-2xl"
    >
      {data ? (
        <div className="flex flex-col items-start p-5">
          <div className="flex flex-col items-start p-5">
            <h1 className="text-3xl font-semibold text-black">
              Remarks: {data.dbRes.remarks}
            </h1>
            <div className="w-full h-[70vh]">
            <Map
                location={selectedLocation ? selectedLocation : [0, 0]}
              />
            </div>
            <p className="text-sm font-normal text-black">
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