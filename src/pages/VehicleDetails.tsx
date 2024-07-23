import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { vehiclesApi } from '../features/api/vehiclesApi';
import Car1 from '../assets/images/car.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {  useSelector } from 'react-redux';
import { RootState } from "../app/store";
import {bookingApi} from '../features/api/bookingApi';
import { useNavigate } from 'react-router-dom';

// interface VehicleSpecs {
//   vehicleSpec_id: number;
//   manufacturer: string;
//   model: string;
//   year: string;
//   fuel_type: string;
//   engine_capacity: string;
//   transmission: string;
//   seating_capacity: string;
//   color: string;
//   imageUrl: string;
// }

// interface Car {
//   id: number;
//   rental_rate: string; 
//   availability: string;
//   vehicleSpecs: VehicleSpecs;
// }

interface BookingDetails {
  booking_date: string;
  return_date: string;
  location_name: string; 
}

const VehicleDetails: React.FC = () => {
  const navigate = useNavigate();
  const [createBooking] = bookingApi.useCreateBookingMutation();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const vehicle_id = window.location.pathname.split('/')[2];
  const user_id = user?.user.id; // Replace with actual user ID logic

  const { data: carWithDetails, error, isLoading } = vehiclesApi.useGetOneVehicleWithDetailsByIdQuery(vehicle_id);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<BookingDetails>();

  const [total_amount, setAmount] = useState<number>(0);
  const rentalRate = carWithDetails?.rental_rate ? parseFloat(carWithDetails.rental_rate) : 0;

  const booking_date = watch('booking_date');
  const return_date = watch('return_date');

  useEffect(() => {
    if (booking_date && return_date) {
      const booking = new Date(booking_date);
      const returning = new Date(return_date);
      const diffTime = Math.abs(returning.getTime() - booking.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const totalAmount = diffDays * rentalRate;
      setAmount(totalAmount);
    }
  }, [booking_date, return_date, rentalRate]);

  const onSubmit = async (data: BookingDetails) => {
    const vehicleIdNumber = parseInt(vehicle_id, 10);
    const bookingData = {
      ...data,
      total_amount,
      user_id: user_id,
      vehicle_id: vehicleIdNumber,
    };
    //check if authenticated
    if(!isAuthenticated){
      alert("Please login to book a vehicle")
      return;
    }
    console.log('Booking data:', bookingData);
    try {
      await createBooking(bookingData).unwrap();
      navigate('/dashboard/bookings');
    } catch (error) {
      console.error('Failed to book vehicle:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching vehicle data</div>;
  }

  if (!carWithDetails) {
    return <div>No vehicle details available</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Vehicle Details</h1>
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <img src={Car1} alt={`${carWithDetails.vehicleSpecs.manufacturer} ${carWithDetails.vehicleSpecs.model}`} className="w-full md:w-1/2 h-64 object-cover" />
          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold mb-4">{`${carWithDetails.vehicleSpecs.manufacturer} ${carWithDetails.vehicleSpecs.model} (${carWithDetails.vehicleSpecs.year})`}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-2"><strong>Fuel Type:</strong> {carWithDetails.vehicleSpecs.fuel_type}</div>
              <div className="mb-2"><strong>Engine Capacity:</strong> {carWithDetails.vehicleSpecs.engine_capacity}</div>
              <div className="mb-2"><strong>Transmission:</strong> {carWithDetails.vehicleSpecs.transmission}</div>
              <div className="mb-2"><strong>Seating Capacity:</strong> {carWithDetails.vehicleSpecs.seating_capacity}</div>
              <div className="mb-2"><strong>Color:</strong> {carWithDetails.vehicleSpecs.color}</div>
              <div className="mb-2"><strong>Rental Rate:</strong> {carWithDetails.rental_rate}</div>
              <div className="mb-4"><strong>Availability:</strong> {carWithDetails.availability}</div>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-8">
          <h2 className="text-2xl font-bold text-center mb-4">Book This Vehicle</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDate">
                Booking Date
              </label>
              <input
                id="bookingDate"
                type="date"
                {...register('booking_date', { required: 'Booking date is required' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.booking_date && <span className="text-red-500 text-sm">{errors.booking_date.message}</span>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="returnDate">
                Return Date
              </label>
              <input
                id="returnDate"
                type="date"
                {...register('return_date', { required: 'Return date is required' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              {errors.return_date && <span className="text-red-500 text-sm">{errors.return_date.message}</span>}
            </div>
            <div className="mb-4">            
              <div >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location_name">
                Location
              </label>
              <select
                id="location_name"
                {...register('location_name', { required: 'Location is required' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Location</option>
                <option value="Nairobi">Nairobi</option>
                <option value="Mombasa">Mombasa</option>
                <option value="Kisumu">Kisumu</option>
                {/* Add more options as needed */}
              </select>
              {errors.location_name && <span className="text-red-500 text-sm">{errors.location_name.message}</span>}
            </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <input
                id="amount"
                type="number"
                value={total_amount}
                readOnly
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="btn btn-info"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VehicleDetails;
