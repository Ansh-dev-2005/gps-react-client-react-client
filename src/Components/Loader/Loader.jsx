import React from "react"


const Loader = () => {

    return(
        <div className='bg-[#9376F4] fixed w-screen h-screen top-0 left-0 z-50 flex items-center justify-center transition-all'>
            <div class="portfolio-loader">
                <div class="sun"></div>
                <div class="orbit orbit1"><div class="planetX planet1"></div></div>
                <div class="orbit orbit2"><div class="planetX planet2"></div></div>
                <div class="orbit orbit3"><div class="planetX planet3"></div></div>
            </div>
     </div>
    )
}

export default Loader