import React from "react"
import { 
    ArrowLeftIcon
} from '@heroicons/react/24/solid'

import { useNavigate } from "react-router-dom"

const BackButton = (props) => {

    const navigate = useNavigate()
    return(
        <div className="mt-10 flex flex-row gap-2 ml-2">
            <div onClick={() => navigate(-1)} className="rounded-full bg-white h-[40px] w-[40px] flex flex-col items-center justify-center">
                <ArrowLeftIcon width={30} height={30}  />
            </div>
            <h2 className="text-white text-3xl font-bold">
                {props.title}
            </h2>
      </div>
    )
}

export default BackButton