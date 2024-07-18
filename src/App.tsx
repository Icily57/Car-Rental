import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Error from './pages/Error.tsx'
import Explore from './pages/Explore.tsx'
import About from './pages/About.tsx'
import Login from './pages/Login.tsx'
import UserProfile from './components/dashboard/UserProfile.tsx'
import Bookings from '../src/components/dashboard/Bookings.tsx'
import Tickets from './components/dashboard/Tickets.tsx'
import AdminDashboard from './pages/AdminDashboard.tsx'
import Analytics from './components/adminDashboard/Analytics.tsx'
import UserProfiles from './components/adminDashboard/UserProfiles.tsx'
import AdminProfile from './components/adminDashboard/AdminProfile.tsx'
import VehicleDetails from './pages/VehicleDetails.tsx'
import Payments from '../src/components/dashboard/Payment.tsx'
import AdminBookings from './Dashboard/pages/AdminBookings.tsx'
import AdminHome from './Dashboard/pages/AdminHome.tsx'
import Register from './pages/Register.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement:<Error/>,
  },
  {
    path: 'admin-home',
    element: <AdminHome />,
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
  {
    path: 'vehicle/:id',
    element: <VehicleDetails />,
    errorElement:<Error/>,
  },
  {
    path: 'register',
    element: <Register />,
    errorElement:<Error/>,
  },
  {
    path: 'login',
    element: <Login />,
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
        path: "",
        element: <Analytics />,
      },
      {
        path: "me",
        element: <AdminProfile />,
      },
      {
        path: "users-profiles",
        element: <UserProfiles />,
      },
      {
        path: "booking",
        element: <AdminBookings />,
      },
      {
        path: "vehicles",
        element: <VehicleDetails />,
      },
    ]
  },

])

function App() {

  return <RouterProvider router={router} />
}

export default App
