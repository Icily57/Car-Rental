import { useEffect, useState } from 'react';
import { bookingApi } from '../../features/api/bookingApi';

interface Booking {
  id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  booking_status: string;
  total_amount: string;
}

const AllBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const { data: userBookings, error, isLoading } = bookingApi.useGetBookingsQuery(bookings);
  const [approveBooking, { isLoading: isApproving }] = bookingApi.useApproveBookingMutation();
  const [declineBooking, { isLoading: isDeclining }] = bookingApi.useDeclineBookingMutation();

  useEffect(() => {
    if (userBookings) {
      setBookings(userBookings);
    }
  }, [userBookings]);

  const handleApprove = async (bookingId: number) => {
    try {
      await approveBooking({
        id: bookingId,
        booking_status: 'approved',
      }).unwrap();
      // Update the booking status in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, booking_status: 'approved' } : booking
        )
      );
    } catch (error) {
      console.error('Failed to approve booking', error);
    }
  };
  

  const handleDecline = async (bookingId: number) => {
    try {
      await declineBooking({
        id: bookingId,
        booking_status: 'declined',
      }).unwrap();
      // Update the booking status in the state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === bookingId ? { ...booking, booking_status: 'declined' } : booking
        )
      );
    } catch (error) {
      console.error('Failed to decline booking', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-4">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-bold">Booking ID</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Vehicle ID</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Booking Date</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Return Date</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Status</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Total Amount</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td className="py-2 px-4 border">{booking.id}</td>
                <td className="py-2 px-4 border">{booking.vehicle_id}</td>
                <td className="py-2 px-4 border">{booking.booking_date}</td>
                <td className="py-2 px-4 border">{booking.return_date}</td>
                <td className="py-2 px-4 border">{booking.booking_status}</td>
                <td className="py-2 px-4 border">${booking.total_amount}</td>
                <td className="py-2 px-4 border">
                  <button
                    className="btn btn-info"
                    onClick={() => handleApprove(booking.id)}
                    disabled={isApproving}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDecline(booking.id)}
                    disabled={isDeclining}
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;