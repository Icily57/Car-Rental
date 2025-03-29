import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { clearUserLogins } from "../features/auth/authSlice";
import {
  FaHome,
  FaCar,
  FaUserCircle,
  FaSignOutAlt,
  FaSignInAlt,
  FaUsers,
  FaCalendarAlt,
  FaCreditCard,
} from "react-icons/fa";

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(clearUserLogins());
    navigate("/login");
  };

  return (
    <div className="navbar bg-blue-100 text-blue-950 shadow-lg sticky top-0 z-50">
      <div className="navbar-start">
        {/* Mobile Menu Toggle */}
        <div className="dropdown relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <ul
              tabIndex={0}
              className="absolute left-0 mt-3 w-52 bg-white text-black rounded-box z-10 p-2 shadow-md border border-gray-300"
              onBlur={() => setMenuOpen(false)}
            >
              <li>
                <Link to="/admin" className="flex items-center py-2">
                  <FaHome className="mr-2" /> Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/users" className="flex items-center py-2">
                  <FaUsers className="mr-2" /> All Users
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/bookings" className="flex items-center py-2">
                  <FaCalendarAlt className="mr-2" /> Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/payments" className="flex items-center py-2">
                  <FaCreditCard className="mr-2" /> Payments
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin/vehicles-specs" className="flex items-center py-2">
                  <FaCar className="mr-2" /> Vehicles Specs
                </Link>
              </li>
              <li>
            <Link to="/admin/vehicles">
              <FaCar className="mr-2" /> All Vehicles
            </Link>
          </li>
              <li>
                <Link to="/dashboard/admin/me" className="flex items-center py-2">
                  <FaUserCircle className="mr-2" /> My Profile
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Brand Name */}
        <a className="btn btn-ghost text-xl">Enuma Car Rental Services</a>
      </div>

      {/* Desktop Menu */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/admin">
              <FaHome className="mr-2" /> Home
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/users">
              <FaUsers className="mr-2" /> All Users
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/bookings">
              <FaCalendarAlt className="mr-2" /> Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/payments">
              <FaCreditCard className="mr-2" /> Payments
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/vehicles-specs">
              <FaCar className="mr-2" /> Vehicles Specs
            </Link>
          </li>
          <li>
            <Link to="/admin/vehicles">
              <FaCar className="mr-2" /> All Vehicles
            </Link>
          </li>
          <li>
            <Link to="/dashboard/admin/me">
              <FaUserCircle className="mr-2" /> My Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* User Profile & Logout */}
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
              className="menu menu-sm dropdown-content bg-blue-50 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button onClick={handleLogout} className="flex items-center">
                  <FaSignOutAlt className="mr-2" /> Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link to="/login">
            <a className="btn flex items-center">
              <FaSignInAlt className="mr-2" /> Login
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default AdminNav;
