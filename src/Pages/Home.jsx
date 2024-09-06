import React from "react"
import Base from "../Components/Base/Base"
import { useNavigate } from "react-router-dom"


const Home = () => {
    const navigate = useNavigate()
    return(
        <Base style="">
            <div className=" mt-auto mb-auto flex flex-col">
                <div className="w-full flex flex-col items-center"> 
                    <h1 className="text-white font-extrabold text-4xl text-center">
                        Get Live Elephants <br/> 
                        Updates
                    </h1>
                    <p className=" text-white text-center">
                        Get live location updates of <br/> Elephants Siting.
                    </p>
                </div>
                <button onClick={() => navigate('/login')} className="btn ml-auto mr-auto bg-white h-[50px] w-[250px] mt-[10px] rounded font-bold text-lg">
                    Get Started
                </button>
            </div>
        </Base>   
    )
}

export default Home