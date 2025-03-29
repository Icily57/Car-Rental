import React from 'react';
import { bookingApi } from '../../features/api/bookingApi';
import { useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Importing an icon for the loading spinner

const stripePromise = loadStripe('pk_test_51PcnDjRsM9MD60MUSokKWQYDKHJRX6QozjatiXn2BLZkcDSNJabkwtXnXgExy9MRKypMnbxpVuXiND5mWsz3IMGO00jsYR73Rd');

interface UserBooking {
  id: number;
  vehicle_id: number;
  booking_date: string;
  return_date: string;
  booking_status: string;
  total_amount: number;
}

const Booking: React.FC = () => {
  // const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.id;
  const [deleteBooking] = bookingApi.useDeleteBookingMutation();

  const { data: userBookings, error, isLoading } = bookingApi.useGetBookingsByUserIdQuery(user_id);

  const handleDelete = async (id: number) => {
    try {
      const response = await deleteBooking(id).unwrap();
      console.log('Deleted booking with ID:', id);
      console.log(response);
    } catch (error) {
      console.error('Failed to delete booking', error);
    }
  };

  const pendingBookings = userBookings?.filter((booking: UserBooking) => booking.booking_status === 'pending');
  const confirmedBookings = userBookings?.filter((booking: UserBooking) => booking.booking_status === 'approved');

  const handleCheckout = async (id: number) => {
    const booking = pendingBookings?.find((booking: UserBooking) => booking.id === id);
    try {
      const stripe = await stripePromise;
      const header = { 'Content-Type': 'application/json' };
      const checkoutResponse = await axios.post('http://localhost:8000/checkout-session', JSON.stringify(booking), { headers: header });
      const session = await checkoutResponse.data;
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (error) {
      console.error('Failed to checkout:', error);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen bg-blue-500">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
    </div>;
  }

  if (error) {
    return <div className="text-center text-red-500 bg-gradient-to-b from-blue-900 via-blue-600 to-blue-900">Error loading bookings. Please try again later.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-blue-900 via-blue-600 to-blue-900">
      <h1 className="text-5xl font-bold text-center mb-8 text-white">My Bookings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {pendingBookings?.map((booking: UserBooking) => (
          <div key={booking.id} className="bg-blue-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-xl font-bold mb-2">Booking ID: {booking.id}</h2>
            <p><strong>Booking Date:</strong> {booking.booking_date}</p>
            <p><strong>Return Date:</strong> {booking.return_date}</p>
            <p><strong>Status:</strong> <span className="text-yellow-600">{booking.booking_status}</span></p>
            <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105" onClick={() => handleDelete(booking.id)}>
                Delete
              </button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105" onClick={() => handleCheckout(booking.id)}>
                Checkout
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-4 text-white">Confirmed Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-blue-100 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="text-black py-2 text-lg font-bold text-left">Booking ID</th>
              <th className="text-black py-2 text-lg font-bold text-left">Booking Date</th>
              <th className="text-black py-2 text-lg font-bold text-left">Return Date</th>
              <th className="text-black py-2 text-lg font-bold text-left">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {confirmedBookings?.map((booking: UserBooking) => (
              <tr key={booking.id} className="hover:bg-gray-100 transition-colors duration-200">
                <td className="py-2 px-4 border">{booking.id}</td>
                <td className="py-2 px-4 border">{booking.booking_date}</td>
                <td className="py-2 px-4 border">{booking.return_date}</td>
                <td className="py-2 px-4 border">${booking.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Booking;
