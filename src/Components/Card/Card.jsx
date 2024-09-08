import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const BusCard = (props) => {

    useEffect(() => {
       
    })
    const navigate = useNavigate()
    return(
                <div onClick={() => navigate(`/sight?id=${props.data._id}`)} className="shadow w-[350px] h-250px] rounded-xl">
                    <div className="h-1/3 rounded-t-xl bg-cover bg-no-repeat bg-center p-4" style={{ background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3)),url("bus.png")'}}>
                        <h1 className="text-3xl font-semibold text-white">
                            Sighted At: {props.data.remarks}
                        </h1>
                        <h1 className="text-xl font-medium text-white">
                        </h1>
                        <p className="text-sm font-normal text-white">
                           
                        </p> 
                    </div>
                    <div className="p-4 h-2/3">
                        <p className="text-sm font-normal text-black">
                            
                        </p> 
                        <p className="text-sm font-normal text-black">
                            
                        </p> 
                    </div>
                </div>
            )
    
    

}

export default BusCard