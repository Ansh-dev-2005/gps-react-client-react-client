import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getToken, getUser } from './Helpers'
import { jwtDecode } from 'jwt-decode'
const ProtectedRoutes = () => {

    // let auth = getUser()
    // let token = getToken() || ''
    // if(token === '')
    //     return <Navigate to="/login" />
    // let { exp } = jwtDecode(token)
    // let expiry = Date.now() >= exp * 1000 
    // if(auth && !expiry)
    //     return <Outlet />
    // else    
    //     return <Navigate to="/login" />
    return <Outlet />
}
export default ProtectedRoutes
