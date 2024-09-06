import React from "react"
import { 
    ArrowLeftIcon
} from '@heroicons/react/24/solid'
const Drawer = (props) => {
  return (
        <main
            className={
                " fixed overflow-hidden z-10 bg-opacity-25 inset-0 transform ease-in-out " +
                (props.isOpen
                ? " transition-opacity opacity-100 duration-500 translate-x-0  "
                : " transition-all delay-500 opacity-0 translate-x-full  ")
            }
        >
            <section
                className={
                " w-[1/2] max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
                (props.isOpen ? " translate-x-0 " : " translate-x-full ")
                }
            >
                    <article className="relative w-[200px] max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full">
                        <div className="mt-10 flex flex-row gap-2 ml-2">
                            <div onClick={() => props.setIsOpen(false)} className="rounded-full bg-white h-[40px] w-[40px] flex flex-col items-center justify-center">
                                <ArrowLeftIcon width={30} height={30}  />
                            </div>
                        </div>
                        {props.children}
                    </article>
            </section>
            <section
                className=" w-screen h-full cursor-pointer"
                onClick={() => {
                    props.setIsOpen(false);
                }}
            >
                
            </section>
        
        </main>
  )
}
export default Drawer