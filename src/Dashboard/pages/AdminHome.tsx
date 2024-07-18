import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const AdminHome: React.FC = () => {
  const [totalBookings, setTotalBookings] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [vehicleCount, setVehicleCount] = useState<number>(0);

  useEffect(() => {
    // Replace with actual data fetching logic
    setTotalBookings(150);
    setRevenue(12000);
    setUserCount(300);
    setVehicleCount(80);
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center my-6">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">Total Bookings</h2>
              <p className="text-xl text-gray-600">{totalBookings}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">Revenue</h2>
              <p className="text-xl text-gray-600">${revenue}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">Users</h2>
              <p className="text-xl text-gray-600">{userCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800">Vehicles</h2>
              <p className="text-xl text-gray-600">{vehicleCount}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Management</h2>
            <div className="flex flex-col space-y-2">
              <NavLink to="/admin/manage-vehicles" className="text-lg text-indigo-600 hover:text-indigo-800">
                Manage Vehicles
              </NavLink>
              <NavLink to="/admin/manage-users" className="text-lg text-indigo-600 hover:text-indigo-800">
                Manage Users
              </NavLink>
              <NavLink to="/admin/reports" className="text-lg text-indigo-600 hover:text-indigo-800">
                Reports
              </NavLink>
              <NavLink to="/admin/locations" className="text-lg text-indigo-600 hover:text-indigo-800">
                Location and Branches
              </NavLink>
              <NavLink to="/admin/support-tickets" className="text-lg text-indigo-600 hover:text-indigo-800">
                Customer Support Tickets
              </NavLink>
              <NavLink to="/admin/fleet-management" className="text-lg text-indigo-600 hover:text-indigo-800">
                Fleet Management
              </NavLink>
              <NavLink to="/admin/settings" className="text-lg text-indigo-600 hover:text-indigo-800">
                Settings
              </NavLink>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminHome;
