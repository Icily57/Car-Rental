import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { Booking } from '../../types/Types';

const AdminBookings: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('/api/bookings');
        const contentType = response.headers.get('content-type');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch bookings: ${response.statusText}`);
        }
        
        console.log('Content-Type:', contentType);
        
        if (!contentType || !contentType.includes('application/json')) {
          throw new Error('Invalid content type, expected application/json');
        }

        const data: Booking[] = await response.json();
        setBookings(data);
      } catch (err: any) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching bookings: {error}</div>;

  return (
    <div className="p-6 bg-base-200 text-base-content">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-4">
          <Eye className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold ml-2">Admin - View All Bookings</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Car</th>
                <th>Booking Date</th>
                <th>Return Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td>{booking.customerName}</td>
                  <td>{`${booking.car.manufacturer} ${booking.car.model}`}</td>
                  <td>{booking.bookingDate}</td>
                  <td>{booking.returnDate}</td>
                  <td>{booking.amount}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
