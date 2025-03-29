import { useEffect, useState } from 'react';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import AdminNavbar from '../AdminNavbar';
import Footer from '../Footer';
import AddVehicleForm from '../VehicleForm';
import { toast, Toaster } from 'sonner';

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

  useEffect(() => {
    if (isError) {
      toast.error('Error loading vehicles');
    }
  }, [isError]);

  if (isLoading) {
    return <div className="text-center text-blue-800">Loading...</div>;
  }

  const handleDeleteVehicle = async (id: number) => {
    try {
      const response = await deleteCar(id).unwrap();
      console.log('Deleted vehicle with ID:', id);
      console.log(response);
      setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle', error);
      toast.error('Failed to delete vehicle');
    }
  };

  const handleSuccess = () => {
    refetch(); // Refetch the vehicle data after adding a new vehicle
    toast.success('Vehicle added successfully');
  };

  return (
    <div className="bg-gradient-to-b from-blue-600 to-blue-950 min-h-screen flex flex-col">
      <AdminNavbar />
      <div className="flex-grow p-6 bg-gradient-to-b from-blue-600 to-blue-950 bg-opacity-75 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">All Vehicles</h1>
        <AddVehicleForm onSuccess={handleSuccess} />
        <div className="overflow-x-auto mt-6 flex flex-col items-center">
        <table className="table w-4/5 bg-blue-200 rounded-lg shadow-md ">
        <thead className="bg-blue-400">
              <tr>
                <th className="text-black py-2 text-lg font-bold text-left">ID</th>
                <th className="text-black py-2 text-lg font-bold text-left">Name</th>
                <th className="text-black py-2 text-lg font-bold text-left">Rental Rate</th>
                <th className="text-black py-2 text-lg font-bold text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-blue-100 text-black transition duration-200">
                  <td className="py-2 font-bold text-blue-900">{vehicle.id}</td>
                  <td className="py-2 font-bold text-blue-900">{vehicle.vehicleSpecs.manufacturer}</td>
                  <td className="py-2 font-bold text-blue-900">${vehicle.rental_rate}</td>
                  <td className="py-2 font-bold text-blue-900">
                    <button onClick={() => handleDeleteVehicle(vehicle.id)} className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Toaster position="top-right" />
      <Footer />
    </div>
  );
};

export default AllVehicles;
