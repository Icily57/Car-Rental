import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { vehiclesApi } from "../features/api/vehiclesApi";
import PlaceholderImage from '../assets/images/car.jpg'; // Placeholder image

interface VehicleSpecs {
  vehicleSpec_id: number;
  manufacturer: string;
  model: string;
  year: string;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  seating_capacity: string;
  color: string;
  imageUrl: string;
}

interface Car {
  id: number;
  rental_rate: string;
  availability: string;
  vehicleSpecs: VehicleSpecs;
}

const Explore: React.FC = () => {
  const { data: carsData, error: carsError, isLoading: carsLoading } = vehiclesApi.useGetVehiclesWithTheirDetailsQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    if (carsData && Array.isArray(carsData)) {
      console.log("Fetched data:", carsData);
      setCars(carsData);
    } else {
      console.log("No data or data is not an array");
    }
  }, [carsData]);

  if (carsLoading) {
    return <div>Loading...</div>;
  }

  if (carsError) {
    console.error("Error fetching vehicle data:", carsError);
    return <div>Error fetching vehicle data</div>;
  }

  if (!carsData || cars.length === 0) {
    return <div>No cars available</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Our Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            car && car.vehicleSpecs && (
              <div key={car.id} className="card shadow-xl">
                <img
                  src={car.vehicleSpecs.imageUrl || PlaceholderImage}
                  alt={`${car.vehicleSpecs.manufacturer} ${car.vehicleSpecs.model}`}
                  className="card-image"
                  onError={(e) => (e.currentTarget.src = PlaceholderImage)}
                />
                <div className="card-body">
                  <h2 className="card-title">{`${car.vehicleSpecs.manufacturer} ${car.vehicleSpecs.model}`}</h2>
                  <p><strong>Year:</strong> {car.vehicleSpecs.year}</p>
                  <p><strong>Color:</strong> {car.vehicleSpecs.color}</p>
                  <div className="card-actions justify-end">
                    <Link to={`/vehicle/${car.id}`} className="btn btn-primary">Book Now</Link>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
