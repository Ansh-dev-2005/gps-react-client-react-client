import React, { useEffect, useState } from "react"
import BaseTwo from "../Components/Base/BaseTwo"
import Card from "../Components/Card/Card"
import { PlusIcon } from "@heroicons/react/24/solid" // Import Heroicons
import {  useNavigate } from "react-router-dom"
import { getAllSightings, getUser } from "../Helpers"


const Header = () => {
  return (
    <div className="mt-10">
      <h2 className="text-white text-2xl">
        Namaste, <strong>{getUser().firstName}</strong>
      </h2>
      <p className="text-white text-sm pt-1">Hope you are having a nice day!</p>
    </div>
  )
}


const Buses = () => {
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null) 

  const navigate = useNavigate()

   useEffect(() => {
    getAllSightings()
      .then((data) => {
        setData(data)
      }).catch(err => console.log(err))
    setLoading(false)
  }
  , [])
  

  const handleAddBus = () => {
    navigate("/add-sighting")
    console.log("Add new bus")
  }

  return (
    <BaseTwo header={<Header />} style="bg-white rounded-t-2xl">
      <div className="flex flex-col items-start p-5">
        {console.log(data)}
        {data ? data.dbRes.docs.map((item) => {
          return(
            <Card 
              data={item}
            />
          )
        }) : ''}
      </div>
      <button
        onClick={handleAddBus}
        className="fixed bottom-24 right-5 bg-[#0075a1] text-white p-4 rounded-full shadow-lg hover:bg-[#0075a1] transition duration-300"
        aria-label="Add new bus"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </BaseTwo>
  )
}

export default Buses
