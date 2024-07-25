import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Dummy data for the report
const bookingData = [
  { name: 'January', bookings: 4000 },
  { name: 'February', bookings: 3000 },
  { name: 'March', bookings: 5000 },
  { name: 'April', bookings: 4500 },
  { name: 'May', bookings: 6000 },
];

const revenueData = [
  { month: 'January', revenue: 10000 },
  { month: 'February', revenue: 8000 },
  { month: 'March', revenue: 12000 },
  { month: 'April', revenue: 11000 },
  { month: 'May', revenue: 15000 },
];

const ticketData = [
  { type: 'Resolved', count: 300 },
  { type: 'Pending', count: 150 },
  { type: 'Closed', count: 200 },
];

const userData = [
  { role: 'Admins', count: 10 },
  { role: 'Drivers', count: 50 },
  { role: 'Customers', count: 200 },
];

const Report: React.FC = () => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <>
      <div className="container mx-auto py-8 bg-gradient-to-r from-blue-100 to-blue-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Car Rental System Report</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Booking Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Bookings</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={bookingData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="bookings" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Revenue Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Monthly Revenue</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Ticket Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ticket Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={ticketData}
                  dataKey="count"
                  nameKey="type"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {ticketData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* User Statistics */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userData}
                  dataKey="count"
                  nameKey="role"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {userData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Report;