import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Error from './pages/Error.tsx'
import Explore from './pages/Explore.tsx'
import About from './pages/About.tsx'
import UserLogin from './pages/Login.tsx'
import UserProfile from './components/dashboard/UserProfile.tsx'
import Bookings from '../src/components/dashboard/Bookings.tsx'
import Tickets from './components/dashboard/Tickets.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import AdminProfile from './components/adminDashboard/AdminProfile.tsx'
import VehicleDetails from './pages/VehicleDetails.tsx'
import Payments from '../src/components/dashboard/Payment.tsx'
import Register from './pages/Register.tsx'
import AllBookings from './components/adminDashboard/AllBookings.tsx'
import AllUsers from './components/adminDashboard/AllUsers.tsx'
import AllVehicles from './components/adminDashboard/AllVehicles.tsx'
import AllsVehSpecs from './components/adminDashboard/AllsVehSpecs.tsx'
import AllPayments from './components/adminDashboard/AllPayment.tsx'
import AdminHome from './pages/AdminHome.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement:<Error/>,
  },
  {
    path: 'login',
      element: <UserLogin />,
      errorElement:<Error/>,
    },
    {
      path: 'register',
      element: <Register />,
      errorElement:<Error/>,
    },
  {
    path: 'explore',
    element: <Explore />,
    errorElement:<Error/>,
  },
  {
    path: 'about',
    element: <About />,
    errorElement:<Error/>,
  },
  // {
  //   path: 'login/admin',
  //   element: <AdminLogin />,
  //   errorElement:<Error/>,
  // },
  {
    path: '/admin',
      element: <AdminHome />,
      errorElement:<Error/>,
  },
  {
    path: '/admin/vehicles',
    element: <AllVehicles />,
      errorElement:<Error/>,
  },
  {
    path: 'vehicle/:id',
    element: <VehicleDetails />,
    errorElement:<Error/>,
  },
  {
    path: 'dashboard',
    element: <Dashboard />,
    errorElement:<Error/>,
    children: [
      {
        path: "",
        element: <UserProfile />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "tickets",
        element: <Tickets />,
      }
    ]
    
  },
  {
    path: 'dashboard/admin',
    element: <AdminDashboard />,
    errorElement:<Error/>,
    children: [
      {
        path: "users",
        element: <AllUsers />,
      },
      {
        path: "me",
        element: <AdminProfile />,
      },
      {
        path: "bookings",
        element: <AllBookings />,
      },
      {
        path: "payments",
        element: <AllPayments />,
      },
      // {
      //   path: "vehicles",
      //   element: <AllVehicles />,
      // },
      {
        path: "vehicles-specs",
        element: <AllsVehSpecs />,
      },
    ]
  },

])

function App() {

  return <RouterProvider router={router} />
}

export default App
