import React from "react"
import { 
    HomeIcon, 
    TruckIcon, 
    UserIcon,
    ChatBubbleLeftIcon,
    ArrowLeftEndOnRectangleIcon,
    FlagIcon
} from '@heroicons/react/24/solid'
import { useLocation, useNavigate } from "react-router-dom"
import { logout } from '../../Helpers/index'
const BottomBar = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const menuItems = [
        {
            title: 'Home',
            icon: <HomeIcon width={30} height={30} className={location.pathname === '/home' ? 'text-black' : 'text-[#0000005f] '} />,
            active: location.pathname === '/home' ? true : false,
            href: '/home'
        },
        {
            title: 'Elephants',
            icon: <FlagIcon width={30} height={30} className={location.pathname === '/buses' ? 'text-black' : 'text-[#0000005f]'} />,
            active: location.pathname === '/buses' ? true : false,
            href: '/elephants'
        },
        {
            title: 'Profile',
            icon: <UserIcon width={30} height={30} className={location.pathname === '/profile' ? 'text-black' : 'text-[#0000005f]'} />,
            active: location.pathname === '/profile' ? true : false,
            href: '/profile'
        },
        {
            title: 'All',
            icon: <TruckIcon width={30} height={30} className={location.pathname === '/locations' ? 'text-black' : 'text-[#0000005f]'} />,
            active: location.pathname === '/locations' ? true : false,
            href: '/locations'
        },
        // {
        //     title: 'Feedback',
        //     icon: <ChatBubbleLeftIcon width={30} height={30} className={location.pathname === '/feedback' ? 'text-black' : 'text-[#0000005f]'} />,
        //     active: location.pathname === '/feedback' ? true : false,
        //     href: '/feedback'
        // }
        {
            title: 'Logout',
            icon: <ArrowLeftEndOnRectangleIcon width={30} height={30} className={location.pathname === '/logout' ? 'text-black' : 'text-[#0000005f]'} />,
            active: location.pathname === '/logout' ? true : false,
            href: '/logout'
        },
    ]

    const signout = async () => {
        let res = await logout()
        if(res) {
            return navigate('/login')
        }
    }

    return(
        <div className="w-screen h-[10%] flex flex-row justify-center gap-12 border-t-2 border-gray-200 shadow">
            { menuItems.map((item) => {
                return(
                    <div onClick={item.href === '/logout' ? () => signout() : () => navigate(`${item.href}`)} key={item.href} className={`flex flex-col pt-2 items-center ${item.active ? 'border-t-4 border-[#e6106d]' : ''} rounded w-[50px]`}>
                        {item.icon}
                        <p className={item.active ? 'text-black font-semibold' : 'text-[#0000005f]'}>
                            {item.title}
                        </p>      
                    </div>
                )
            })}
        </div>
    )
}

export default BottomBar