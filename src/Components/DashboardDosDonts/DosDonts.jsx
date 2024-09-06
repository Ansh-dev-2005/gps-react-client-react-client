import React from "react"


const DosDonts = (props) => {
    return(
        <div className="w-screen p-4">
            <h1 className="text-2xl font-bold text-left">{props.title}</h1>
            {props.data.map((item) => {
                return(
                    <div key={item.text} className="border-l-4 border-black rounded px-2 py-2 mt-2">
                        <p className="text-black">
                            {item.text}
                        </p>
                    </div>
                )
            })}
        </div>
    )
}

export default DosDonts