import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "../app/store"
import { clearUserLogins } from "../features/auth/authSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth)

  const handleLogout = () => {
    dispatch(clearUserLogins())
    navigate('/')
  }

  return (
    <div className="navbar bg-cyan-50 text-black">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <Link to="/"><li><a> Home</a></li> </Link>
            <Link to="/explore"><li><a> Explore</a></li> </Link>   
            <Link to="/about"><li><a> About Us</a></li> </Link>         
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Enuma Car Rental Services</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <Link to="/"><li><a> Home</a></li> </Link>
          <Link to="/explore"><li><a> Explore</a></li> </Link>   
          <Link to="/about"><li><a> About Us</a></li> </Link>  
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <span>
              <a className="btn btn-ghost">Welcome, {user.user.full_name}</a>
            </span>
            <div tabIndex={0} className="m-1 btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7" />
              </svg>
            </div>
           
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-cyan-50 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/dashboard">
                  <a>Dashboard</a>
                  </Link>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <a className="btn btn-primary">Login</a>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar
