import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../app/store";
import { clearUserLogins } from "../features/auth/authSlice";
import { FaHome, FaCompass, FaInfoCircle, FaUserCircle, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(clearUserLogins());
    navigate('/');
  };

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
            <li>
              <Link to="/"><FaHome className="mr-2" /> Home</Link>
            </li>
            <li>
              <Link to="/explore"><FaCompass className="mr-2" /> Explore</Link>
            </li>
            <li>
              <Link to="/about"><FaInfoCircle className="mr-2" /> About Us</Link>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Enuma Car Rental Services</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/"><FaHome className="mr-2" /> Home</Link>
          </li>
          <li>
            <Link to="/explore"><FaCompass className="mr-2" /> Explore</Link>
          </li>
          <li>
            <Link to="/about"><FaInfoCircle className="mr-2" /> About Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <span>
              <a className="btn btn-ghost">Welcome, {user.full_name}</a>
            </span>
            <div tabIndex={0} className="m-1 btn btn-ghost">
              <FaUserCircle className="h-5 w-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-cyan-50 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/dashboard">
                  <FaUserCircle className="mr-2" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <a className="btn btn-primary flex items-center"><FaSignInAlt className="mr-2" /> Login</a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
