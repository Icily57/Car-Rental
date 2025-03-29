import React, { useEffect, useState } from 'react';
import { FaUsers, FaMoneyBillWave, FaCar, FaCalendarAlt } from 'react-icons/fa';
import { usersApi } from '../../features/api/usersApi';
import { bookingApi } from '../../features/api/bookingApi';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import { paymentApi } from '../../features/api/paymentApi';

interface AnalyticsData {
  totalBookings: number;
  totalRevenue: number;
  totalUsers: number;
  totalVehicles: number;
}

const Analytics: React.FC = () => {
  const { data: userData, error: userError, isLoading: userLoading } = usersApi.useGetUsersQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const { data: bookingData, error: bookingError, isLoading: bookingLoading } = bookingApi.useGetBookingsQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const { data: vehicleData, error: vehicleError, isLoading: vehicleLoading } = vehiclesApi.useGetVehiclesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const { data: paymentData, error: paymentError, isLoading: paymentLoading } = paymentApi.useGetPaymentsQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    totalBookings: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalVehicles: 0,
  });

  useEffect(() => {
    if (userData) {
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalUsers: userData.length,
      }));
    }
  }, [userData]);

  useEffect(() => {
    if (bookingData) {
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalBookings: bookingData.length,
      }));
    }
  }, [bookingData]);

  useEffect(() => {
    if (vehicleData) {
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalVehicles: vehicleData.length,
      }));
    }
  }, [vehicleData]);

  useEffect(() => {
    if (paymentData) {
      const totalRevenue = paymentData.reduce(
        (acc: number, payment: any) => acc + Number(payment.amount || 0), // Ensure it's a number
        0
      );
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalRevenue, // Correctly setting totalRevenue as a number
      }));
    }
  }, [paymentData]);
  

  if (userLoading || bookingLoading || vehicleLoading || paymentLoading) return <div>Loading...</div>;
  if (userError) return <div>Error fetching user data</div>;
  if (bookingError) return <div>Error fetching booking data</div>;
  if (vehicleError) return <div>Error fetching vehicle data</div>;
  if (paymentError) return <div>Error fetching payment data</div>;

  return (
    <div className="p-6 bg-blue-100 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-black text-center">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Total Bookings */}
        <div className="card text-black bg-blue-300 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 p-6 flex items-center">
          <FaCalendarAlt className="text-4xl mr-4" />
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Bookings</h2>
            <p className="text-4xl">{analyticsData.totalBookings}</p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="card text-black bg-blue-300 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 p-6 flex items-center">
          <FaMoneyBillWave className="text-4xl mr-4" />
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Revenue</h2>
            <p className="text-4xl">${analyticsData.totalRevenue ? analyticsData.totalRevenue.toFixed(2) : '0.00'}</p>

          </div>
        </div>
        {/* Total Users */}
        <div className="card text-black bg-blue-300 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 p-6 flex items-center">
          <FaUsers className="text-4xl mr-4" />
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-4xl">{analyticsData.totalUsers}</p>
          </div>
        </div>
        {/* Total Vehicles */}
        <div className="card text-black bg-blue-300 shadow-lg rounded-lg transform hover:scale-105 transition-transform duration-300 p-6 flex items-center">
          <FaCar className="text-4xl mr-4" />
          <div className="card-body text-center">
            <h2 className="text-xl font-bold">Total Vehicles</h2>
            <p className="text-4xl">{analyticsData.totalVehicles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
