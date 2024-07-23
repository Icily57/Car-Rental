import React from 'react';
import { bookingApi } from '../../features/api/bookingApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../app/store";
import  {loadStripe} from '@stripe/stripe-js';
import axios from 'axios';
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
  const dispatch = useDispatch();
  console.log(dispatch);
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.id;

  console.log(user_id);

  const { data: userBookings, error, isLoading } = bookingApi.useGetBookingsByUserIdQuery(user_id);
console.log(userBookings);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading bookings</div>;
  }
  const handleDelete=async(id: number)=> {
    console.log(id);
    // Implement delete booking functionality
  }
  // Filter pending bookings
  const pendingBookings = userBookings?.filter((booking: UserBooking) => booking.booking_status === 'pending');

  // Filter confirmed bookings for the table
  const confirmedBookings = userBookings?.filter((booking: UserBooking) => booking.booking_status === 'approved');


  const handleCheckout=async(id: number)=> {
   const booking = pendingBookings.find((booking: { id: number; })=>booking.id === id)
   console.log(booking);
    try {
      const stripe = await stripePromise;
  
      const header = {'Content-Type': 'application/json'};
  
      const checkoutResponse = await axios.post('http://localhost:8000/checkout-session', JSON.stringify(booking) ,{headers: header});
      const session = await checkoutResponse.data;
  
      await stripe?.redirectToCheckout({sessionId: session.id});
      console.log('Checkout session:', session);
    }
    catch (error) {
      console.error('Failed to checkout:', error);
      
  }
}

  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">My Bookings</h1>
      
      {/* Display pending bookings in cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {pendingBookings?.map((booking: UserBooking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">Booking ID: {booking.id}</h2>
            <p><strong>Booking Date:</strong> {booking.booking_date}</p>
            <p><strong>Return Date:</strong> {booking.return_date}</p>
            <p><strong>Status:</strong> {booking.booking_status}</p>
            <p><strong>Total Amount:</strong> ${booking.total_amount}</p>
            <div className="flex justify-between mt-4">
              <button className="btn btn-danger" onClick={() => handleDelete(booking.vehicle_id)}>
                Delete
              </button>
              <button className="btn btn-info" onClick={() => handleCheckout(booking.id)}>
                Checkout
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display confirmed bookings in a table */}
      <h2 className="text-2xl font-bold text-center mb-4">Confirmed Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-bold">Booking ID</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Booking Date</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Return Date</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {confirmedBookings?.map((booking: UserBooking) => (
              <tr key={booking.id}>
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
