import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { vehiclesApi } from "../features/api/vehiclesApi";
import PlaceholderImage from '../assets/images/car.jpg'; // Placeholder image
import './Explore.css'; // Import the CSS file

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
    return <div className="black-text">Loading...</div>;
  }

  if (carsError) {
    console.error("Error fetching vehicle data:", carsError);
    return <div className="black-text">Error fetching vehicle data</div>;
  }

  if (!carsData || cars.length === 0) {
    return <div className="black-text">No cars available</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 bg-gradient-to-r from-blue-100 to-blue-200">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">Explore Our Cars</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            car && car.vehicleSpecs && (
              <div key={car.id} className="card shadow-xl transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                <img
                  src={car.vehicleSpecs.imageUrl || PlaceholderImage}
                  alt={`${car.vehicleSpecs.manufacturer} ${car.vehicleSpecs.model}`}
                  className="card-image rounded-t-lg"
                  onError={(e) => (e.currentTarget.src = PlaceholderImage)}
                />
                <div className="card-body bg-white p-4">
                  <h2 className="card-title text-2xl font-bold text-gray-800 mb-2">{`${car.vehicleSpecs.manufacturer} ${car.vehicleSpecs.model}`}</h2>
                  <p className="text-gray-700"><strong>Year:</strong> {car.vehicleSpecs.year}</p>
                  <p className="text-gray-700"><strong>Color:</strong> {car.vehicleSpecs.color}</p>
                  <div className="card-actions justify-end mt-4">
                    <Link to={`/vehicle/${car.id}`} className="btn btn-primary transition duration-300 hover:bg-blue-700">Book Now</Link>
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
