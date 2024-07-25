import React, { useEffect, useState } from 'react';
import { bookingApi } from '../../features/api/bookingApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { toast, Toaster } from 'sonner';

interface Booking {
  id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  booking_status: string;
  total_amount: string;
}

const AllBookings: React.FC = () => {
  const { data: userBookings, error, isLoading } = bookingApi.useGetBookingsQuery({});
  const [approveBooking, { isLoading: isApproving }] = bookingApi.useApproveBookingMutation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loadingBookingId, setLoadingBookingId] = useState<number | null>(null);

  useEffect(() => {
    if (userBookings) {
      setBookings(userBookings);
    }
  }, [userBookings]);

  useEffect(() => {
    if (error) {
      toast.error('Error loading bookings');
    }
  }, [error]);

  const handleApprove = async (bookingId: number) => {
    setLoadingBookingId(bookingId);
    try {
      await approveBooking({ id: bookingId, booking_status: 'approved' }).unwrap();
      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === bookingId ? { ...booking, booking_status: 'approved' } : booking
        )
      );
      toast.success('Booking approved successfully');
    } catch (error) {
      console.error('Failed to approve booking:', error);
      toast.error('Failed to approve booking');
    } finally {
      setLoadingBookingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-4xl" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Booking ID</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Vehicle ID</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Booking Date</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Return Date</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Status</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Total Amount</th>
              <th className="py-3 px-4 bg-gray-200 font-bold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                <td className="py-3 px-4 border-b">{booking.id}</td>
                <td className="py-3 px-4 border-b">{booking.vehicle_id}</td>
                <td className="py-3 px-4 border-b">{new Date(booking.booking_date).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">{new Date(booking.return_date).toLocaleDateString()}</td>
                <td className="py-3 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-white ${
                      booking.booking_status === 'approved' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                  >
                    {booking.booking_status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b">${booking.total_amount}</td>
                <td className="py-3 px-4 border-b">
                  <button
                    className={`btn btn-info ${isApproving && loadingBookingId === booking.id ? 'loading' : ''}`}
                    onClick={() => handleApprove(booking.id)}
                    disabled={isApproving && loadingBookingId === booking.id}
                    aria-label={`Approve booking ${booking.id}`}
                  >
                    <FaCheck />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AllBookings;
