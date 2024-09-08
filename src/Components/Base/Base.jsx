import React, { useState } from "react"
import Logo from '../../Assets/Media/logo-dark-nagaland.png'
import Drawer from "../Drawer/Drawer"
import { Link, useLocation } from "react-router-dom"

const Base = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()
    const menuItems = [
        { title: 'Home', href: '/', active: location.pathname === '/' ? true : false },
        { title: 'Login', href: '/login', active: location.pathname === '/login' ? true : false },
        { title: 'Signup', href: '/signup', active: location.pathname === '/signup' ? true : false },
        { title: 'Privacy Policy', href: '/privacy-policy', active: location.pathname === '/privacy-policy' ? true : false },
        { title: 'Terms & Conditions', href: '/terms-and-conditions', active: location.pathname === '/terms-and-conditions' ? true : false }
    ]

    return (
      <div className="h-screen w-screen bg-[#0075a1]">
        <div className="flex flex-row justify-between items-center p-2">
          <div className="h-[40px] ">
            <img src={Logo} alt="UPES Logo" className="h-[60px] -mt-[2px]" />
          </div>
          <div onClick={() => setIsOpen(true)} className="h-[40px] p-2">
            <div className="h-1 rounded-lg w-8 bg-white mt-1"></div>
            <div className="h-1 rounded-lg w-6 bg-white mt-1"></div>
            <div className="h-1 rounded-lg w-4 bg-white mt-1"></div>
            <div className="h-1 rounded-lg w-8 bg-white mt-1"></div>
          </div>
        </div>
        {/* <img src={VectorArt} alt="background image" className="w-auto h-auto absolute" /> */}
        <div
          className={`flex flex-col items-center h-5/6 fixed w-screen bottom-0 ${props.style}`}
        >
          {props.children}
        </div>
        <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
          {menuItems.map((item) => {
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-xl ml-2 ${item.active ? "font-semibold" : ""}`}
              >
                {item.title}
              </Link>
            );
          })}
        </Drawer>
      </div>
    );
}

export default Base