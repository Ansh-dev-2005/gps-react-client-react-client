import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './Assets/Style/style.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedRoutes from './ProtectedRoutes'
import Loader from './Components/Loader/Loader'
import Form from './Pages/Form'


const Home = React.lazy(() => import("./Pages/Home"))
const Login = React.lazy(() => import("./Pages/Login"))
const Dashboard = React.lazy(() => import("./Pages/Dashboard"))
const Feedback = React.lazy(() => import("./Pages/Feedback"))
const Profile = React.lazy(() => import("./Pages/Profile"))
const Buses = React.lazy(() => import("./Pages/Buses"))
const Location = React.lazy(() => import("./Pages/Location"))
const Locations = React.lazy(() => import("./Pages/Locations"))




const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Suspense fallback={<Loader />}><Home /></Suspense>} />
        <Route path='/login' element={<Suspense fallback={<Loader />}><Login /></Suspense>} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />
          <Route path='/elephants' element={<Suspense fallback={<Loader />}><Buses /></Suspense>} />
          <Route path='/profile' element={<Suspense fallback={<Loader />}><Profile /></Suspense>} />
          <Route path='/feedback' element={<Suspense fallback={<Loader />}><Feedback /></Suspense>} />
          <Route path='/location' element={<Suspense fallback={<Loader />}><Location /></Suspense>} />
          <Route path='/locations' element={<Suspense fallback={<Loader />}><Locations /></Suspense>} />
          <Route path='/add-sighting' element={<Suspense fallback={<Loader />}><Form /></Suspense>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)

