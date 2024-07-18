import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { vehiclesApi } from "../features/api/vehiclesApi";
import { Car } from "../types/Types";

const Explore: React.FC = () => {
  const { data: carsData, error: carsError, isLoading: carsLoading } = vehiclesApi.useGetVehiclesQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });
  const [cars, setCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (carsData) {
      console.log("Cars data from API:", carsData);
      setCars(carsData);
    }
  }, [carsData]);

  const handleBookingClick = () => {
    navigate(`/dashboard/Bookings`);
  };

  if (carsLoading) {
    return <div>Loading...</div>;
  }

  if (carsError) {
    return <div>Error fetching vehicle data</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Our Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <div key={car.vehicleSpec_id} className="card shadow-xl">
              {/* <figure>
                <img src={car.imageUrl} alt={`${car.manufacturer} ${car.model}`} />
              </figure> */}
              <div className="card-body">
                <h2 className="card-title">{`${car.manufacturer} ${car.model}`}</h2>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" onClick={() => handleBookingClick()}>Book Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
