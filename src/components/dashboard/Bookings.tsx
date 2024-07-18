import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import { Car } from '../../types/Types';

interface BookingFormInputs {
  carId: number;
  booking_date: string;
  return_date: string;
}

const Booking: React.FC = () => {
  const { data: carsData, error: carsError, isLoading: carsLoading } = vehiclesApi.useGetVehiclesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const [bookings, setBookings] = useState<BookingFormInputs[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BookingFormInputs>();

  useEffect(() => {
    setIsLoading(carsLoading);
    setError(carsError ? carsError.toString() : null);
  }, [carsData, carsLoading, carsError]);

  const onSubmit: SubmitHandler<BookingFormInputs> = async (data) => {
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result: BookingFormInputs = await response.json();
      setBookings([...bookings, result]);
      reset(); // Reset form after successful submission
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching cars: {error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-8">Available Cars for Booking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {carsData?.map((car: Car) => (
          <div key={car.vehicleSpec_id} className="card shadow-xl p-5">
            <h2 className="card-title">{car.manufacturer} {car.model} ({car.year})</h2>
            <p>Fuel Type: {car.fuel_type}</p>
            <p>Engine Capacity: {car.engine_capacity}</p>
            <p>Transmission: {car.transmission}</p>
            <p>Color: {car.color}</p>
            <p>Rental Rate: {car.rental_rate}</p>
            <p>Availability: {car.availability}</p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="card gap-6 p-10 shadow-xl rounded-lg w-fit text-white">
          <div className="form-control">
            <label className="label">Car Type</label>
            <select {...register('carId', { required: true })} className="input input-bordered">
              <option value="">Select a car</option>
              {carsData?.map((car: Car) => (
                <option key={car.vehicleSpec_id} value={car.vehicleSpec_id}>{car.manufacturer} {car.model}</option>
              ))}
            </select>
            {errors.carId && <p className="text-red-500">Car selection is required</p>}
          </div>
          <div className="form-control">
            <label className="label">Booking Date</label>
            <input type="date" {...register('booking_date', { required: true })} className="input input-bordered" />
            {errors.booking_date && <p className="text-red-500">Booking date is required</p>}
          </div>
          <div className="form-control">
            <label className="label">Return Date</label>
            <input type="date" {...register('return_date', { required: true })} className="input input-bordered" />
            {errors.return_date && <p className="text-red-500">Return date is required</p>}
          </div>
          <div className="flex space-x-4">
            <button type="submit" className="btn btn-primary">Book Now</button>
            <button type="button" className="btn btn-secondary" onClick={() => alert('Payment functionality not implemented yet')}>Pay Now</button>
          </div>
        </form>
      </div>

      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Booking Details</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bookings.map((booking, index) => (
            <div key={index} className="card shadow-xl p-5">
              <h2 className="card-title">Booking {index + 1}</h2>
              <p>Car ID: {booking.carId}</p>
              <p>Booking Date: {booking.booking_date}</p>
              <p>Return Date: {booking.return_date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;
