import React from "react";
import { fleetApi } from "../features/api/fleetApi"; // Import the hook

interface VehicleSpecs {
  manufacturer: string;
  model: string;
  year: string;
  imageUrl: string; 
}
const Fleet: React.FC = () => {
  const { data: cars, isLoading, error } = fleetApi.endpoints.getVehiclesWithDetails.useQuery({});

  return (
    <div className="container mx-auto py-12 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <h1 className="text-5xl font-extrabold text-center mb-10 text-blue-400">Our Fleet</h1>

      {isLoading && <p className="text-center text-gray-400">Loading fleet...</p>}
      {error && <p className="text-center text-red-500">Failed to load vehicles. Please try again.</p>}

      {!isLoading && !error && cars && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {cars.map((vehicle: VehicleSpecs) => (
            <div>
            // 
            {/* //   key={vehicle.id}
            //   className="card shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl 
            //  border-2 border-purple-500 rounded-lg bg-gray-800 p-4"
            // > */}
              <img src={vehicle.imageUrl}
          alt={`${vehicle.manufacturer} ${vehicle.model}`}
          className="w-full h-40 object-cover rounded-lg border-b-2 border-blue-400"
              />
              <div className="p-4">
          <h2 className="text-2xl font-bold text-yellow-400 mb-1">
            {vehicle.manufacturer} {vehicle.model}
          </h2>
          <p className="text-gray-300">
            <strong>Year:</strong> {vehicle.year}
          </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fleet;
