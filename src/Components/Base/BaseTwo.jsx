import React, { useState } from "react"
import Logo from '../../Assets/Media/logo-dark-nagaland.png'
import BottomBar from "../BottomBar/BottomBar"
import { useLocation } from "react-router-dom"

const BaseTwo = (props) => {

    const [open, setOpen] = useState(true)

    const location = useLocation()

    return(
        <div className="h-screen w-screen bg-[#0075a1] md:overflow-hidden">
            <div className="flex flex-row justify-between h-1/6 p-2">
                {props.header}
                <div className="h-[40px] ">
                    <img src={Logo} alt="UPES Logo" className="h-[60px] -mt-[2px]" />
                </div>
            </div>
            <div className={`flex flex-col items-center drop-shadow-2xl h-5/6 ${props.style}`}>
                <div className="overflow-y-scroll h-[90%]">
                    {props.children}
                </div>
                {/* { !open ? '' :
                    <div className="h-[80px] bg-[#e6106d] w-screen p-1 pb-4 flex flex-row items-center justify-between gap-2">
                        <p className="text-white text-sm ">Install The Application Which Does'nt Requires Extra Space On Your Device!</p>
                        <button className="btn bg-white text-black rounded-sm w-[200px] h-[30px]">
                            Install Now
                        </button>
                        <button onClick={() => setOpen(false)} className="btn bg-white text-black rounded-sm w-[200px] h-[30px]">
                            Not Now
                        </button>
                    </div>
                } */}
                <BottomBar />
            </div>
        </div>
    )
}

export default BaseTwo