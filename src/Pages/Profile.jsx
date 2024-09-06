import React, { useEffect, useState } from "react"
import BaseTwo from "../Components/Base/BaseTwo"
import BackButton from "../Components/BackButton/BackButton"
import { getUser } from "../Helpers"




const Profile = () => {
    
    return(
        <BaseTwo header={<BackButton title="Profile" />} style="bg-white rounded-t-2xl">
            <div className="flex flex-col mt-10 items-center justify-center">
                <div className="flex flex-row items-center justify-center rounded-full w-[100px] h-[100px] bg-[#9376F4]">
                    <h1 className="text-4xl font-bold text-white uppercase">{getUser().firstName.charAt(0)}</h1>
                    <h1 className="text-4xl font-bold text-white uppercase">{getUser().lastName ? getUser().lastName.charAt(0): getUser().firstName.charAt(1)}</h1>
                </div>
                <div className="flex flex-col gap-5 mt-2 ">
                    <h4 className="text-2xl font-semibold text-center">
                        {getUser().firstName} {getUser().lastName ? getUser().lastName : ''}
                    </h4>
                    <h4 className="text-xl font-medium">
                        SAPID: {getUser().sapId ? getUser().sapId : 'Not Found!'}
                    </h4>
                    <h4 className="text-xl font-medium">
                        Course: {getUser().courseName ? getUser().courseName : 'Not Found!'}
                    </h4>
                    <h4 className="text-xl font-medium">
                        Semester: {getUser().semester ? getUser().semester : 'Not Found!'}
                    </h4>
                    <h4 className="text-xl font-medium">
                        Boarding Point: {getUser().boardingPoint ? getUser().boardingPoint : 'Not Found!'}
                    </h4>
                </div>
            </div>
        </BaseTwo>
    )
}

export default Profile