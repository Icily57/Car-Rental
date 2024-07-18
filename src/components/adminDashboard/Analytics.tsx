import { useEffect, useState } from 'react';
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

const Analytics = () => {
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
      const totalRevenue = bookingData.reduce((acc: number, booking: any) => acc + booking.amount, 0);
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalBookings: bookingData.length,
        totalRevenue,
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
      const totalRevenue = paymentData.reduce((acc: number, payment: any) => acc + payment.amount, 0);
      setAnalyticsData((prevData) => ({
        ...prevData,
        totalRevenue:paymentData.length,
      }));
    }
  }, [paymentData]);

  if (userLoading || bookingLoading || vehicleLoading || paymentLoading) return <div>Loading...</div>;
  if (userError) return <div>Error fetching user data</div>;
  if (bookingError) return <div>Error fetching booking data</div>;
  if (vehicleError) return <div>Error fetching vehicle data</div>;
  if (paymentError) return <div>Error fetching payment data</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Cards for displaying analytics data */}
        {/* Total Bookings */}
        <div className="card bg-primary text-primary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Bookings</h2>
            <p className="text-3xl">{analyticsData.totalBookings}</p>
          </div>
        </div>
        {/* Total Revenue */}
        <div className="card bg-secondary text-secondary-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Revenue</h2>
            <p className="text-3xl">${analyticsData.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        {/* Total Users */}
        <div className="card bg-accent text-accent-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-3xl">{analyticsData.totalUsers}</p>
          </div>
        </div>
        {/* Total Vehicles */}
        <div className="card bg-neutral text-neutral-content shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Vehicles</h2>
            <p className="text-3xl">{analyticsData.totalVehicles}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
