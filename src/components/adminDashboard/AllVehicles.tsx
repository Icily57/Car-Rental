import { useEffect, useState } from 'react';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import AdminNavbar from '../AdminNavbar';
import Footer from '../Footer';
import AddVehicleForm from '../VehicleForm';

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
  rental_rate: string; // This should be a number for calculation
  availability: string;
  vehicleSpecs: VehicleSpecs;
}

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState<Car[]>([]);
  const [deleteCar] = vehiclesApi.useDeleteCarMutation();
  const { data: allVehicles, isError, isLoading, refetch } = vehiclesApi.useGetVehiclesWithTheirDetailsQuery(1, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  useEffect(() => {
    if (allVehicles) {
      setVehicles(allVehicles);
    }
  }, [allVehicles]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.error('Error fetching vehicle data:', isError);
    return <div>Error loading vehicles</div>;
  }

  const handleDeleteVehicle = async (id: number) => {
    try {
      const response = await deleteCar(id).unwrap();
      console.log('Deleted vehicle with ID:', id);
      console.log(response);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.error('Failed to delete vehicle', error);
    }
  };

  const handleSuccess = () => {
    refetch(); // Refetch the vehicle data after adding a new vehicle
  };

  return (
    <>
      <div
        // className="h-screen bg-cover bg-center"
        // style={{ backgroundImage: `url(${backgroundImage})` }} // Apply the local background image
      >
        <AdminNavbar />
        <div className="flex-grow bg-white bg-opacity-75 p-4">
          <h1 className="text-2xl font-bold text-center mb-4">All Vehicles</h1>
          <AddVehicleForm onSuccess={handleSuccess} /> 
          <div className="overflow-x-auto">
            <table className="table-fixed min-w-full bg-base-200 text-white rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-200 font-bold">ID</th>
                  <th className="py-2 px-4 bg-gray-200 font-bold">Name</th>
                  <th className="py-2 px-4 bg-gray-200 font-bold">Rental Rate</th>
                  <th className="py-2 px-4 bg-gray-200 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td className="py-2 px-4 border">{vehicle.id}</td>
                    <td className="py-2 px-4 border">{vehicle.vehicleSpecs.manufacturer}</td>
                    <td className="py-2 px-4 border">${vehicle.rental_rate}</td>
                    <td className="py-2 px-4 border">
                      {/* <button onClick={() => handleUpdateVehicle(vehicle.id)} className="btn btn-info mr-2">Edit</button> */}
                      <button onClick={() => handleDeleteVehicle(vehicle.id)} className="btn btn-danger btn-outline btn-outline-white">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        <Footer />
    </>
  );
};

export default AllVehicles;
