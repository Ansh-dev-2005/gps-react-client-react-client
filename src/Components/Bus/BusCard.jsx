import React from "react"
import { useNavigate } from "react-router-dom"


const BusCard = (props) => {
    const navigate = useNavigate()
    return(
          
                <div /* onClick={() => navigate(`/location?id=${item._id}`)} */ className="shadow w-[350px] h-250px] rounded-xl">
                    <div className="h-1/3 rounded-t-xl bg-cover bg-no-repeat bg-center p-4" style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url("bus.png")'}}>
                        <h1 className="text-3xl font-semibold text-white">
                            {/* {item.routeName} */}
                            xyz
                        </h1>
                        <h1 className="text-xl font-medium text-white">
                            {/* {item.vehicleRegistration} */}
                            xyz
                        </h1>
                        <p className="text-sm font-normal text-white">
                            {/* <strong>Start: </strong>{item.startPoint} */}
                            xyz
                        </p> 
                    </div>
                    <div className="p-4 h-2/3">
                        {/* <p className="text-sm font-normal text-black">
                            <strong>Start: </strong>{item.startPoint}
                        </p>  */}
                        {/* <p className="text-sm font-normal text-black">
                            <strong>End: </strong>{item.endPoint}
                        </p>  */}
                        <p className="text-sm font-normal text-black">
                            {/* <strong>Via: </strong>{item.viaPassPoints ? item.viaPassPoints : 'No Points'} */}
                            xyz
                        </p> 
                        <p className="text-sm font-normal text-black">
                            {/* <strong>Driver Contact: </strong>{item.driverContact ? item.driverContact : 'No Contact'} */}
                            xyz
                        </p> 
                    </div>
                </div>
            )
    
    

}

export default BusCard