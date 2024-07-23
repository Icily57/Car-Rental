import { useEffect, useState } from 'react';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import { useForm } from 'react-hook-form';
import { VehicleSpecsFormValues } from '../../types/Types';
import axios from 'axios';

interface VehicleSpecs {
  id: number;
  manufacturer: string;
  model: string;
  year: number;
  fuel_type: string;
  engine_capacity: string;
  transmission: string;
  features: string;
  seating_capacity: number;
  color: string;
}

interface VehicleFormValues {
  rental_rate: number;
  vehicleSpec_id: number;
}

const AllsVehSpecs: React.FC = () => {
  const preset_key = "zkm9gt8i";
  const cloud_name = "dlci2voox";
  const { data: allSpecVehicles, isError, isLoading: vehSpecsLoading } = vehiclesApi.useGetVehicleSpecsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [imageUrl, setImageUrl] = useState<string>("");
  const { register, handleSubmit } = useForm<VehicleSpecsFormValues>();
  const [selectedVehicleSpecId, setSelectedVehicleSpecId] = useState<number>(0);
  const [rentalRate, setRentalRate] = useState<number>(0);
  const [vehiclesSpecs, setVehiclesSpecs] = useState<VehicleSpecs[]>([]);
  const [addSpecs] = vehiclesApi.useAddSpecsMutation();
  const [deleteSpecs] = vehiclesApi.useDeleteSpecsMutation();
  const [addVehicle, { isLoading: addVehicleIsLoading }] = vehiclesApi.useAddCarMutation();

  if (addVehicleIsLoading) {
    return <div>Loading...</div>;
  }

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset_key);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
      setImageUrl(res.data.secure_url);
    } catch (error) {
      console.error('Failed to upload image', error);
    }
  };

  useEffect(() => {
    if (allSpecVehicles) {
      setVehiclesSpecs(allSpecVehicles);
    }
  }, [allSpecVehicles]);

  const onSubmit = async (data: VehicleSpecsFormValues) => {
    data.imageUrl = imageUrl;

    const transformedData = {
      ...data,
      year: Number(data.year),
      seating_capacity: Number(data.seating_capacity)
    };
    try {
      const response = await addSpecs(transformedData).unwrap();
      console.log(response);
    } catch (error) {
      console.error('Failed to add vehicle spec', error);
    }
  };

  const handleAddVehicle = async () => {
    if (rentalRate === 0) {
      alert('Please enter rental rate');
      return;
    }
    const vehicledata: VehicleFormValues = {
      vehicleSpec_id: selectedVehicleSpecId,
      rental_rate: rentalRate,
    };
    try {
      const response = await addVehicle(vehicledata).unwrap();
      console.log(response);
    } catch (error) {
      console.error('Failed to add vehicle', error);
    }
  };

  const handleDeleteSpecs = async (id: number) => {
    try {
      await deleteSpecs(id).unwrap();
      setVehiclesSpecs(vehiclesSpecs.filter(spec => spec.id !== id));
    } catch (error) {
      console.error('Failed to delete vehicle spec', error);
    }
  };

  if (vehSpecsLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading vehicle specs</div>;
  }

  return (
    <div> 
      <button className="btn" onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}>
        Add Specs
      </button>
      <dialog id="my_modal_4" className="modal-box w-3/4 max-w-full p-6">
        <div className="modal-box w-full max-w-full p-6 bg-base-200 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-4">Add Spec!</h3>
          <div className="modal-action">
            <form method="dialog" className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap gap-4 mb-4">
                <input
                  type="text"
                  {...register('manufacturer', { required: true })}
                  placeholder="Manufacturer"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('model', { required: true })}
                  placeholder="Model"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('year', { required: true })}
                  placeholder="Year"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('fuel_type', { required: true })}
                  placeholder="Fuel Type"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('engine_capacity', { required: true })}
                  placeholder="Engine Capacity"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('transmission', { required: true })}
                  placeholder="Transmission"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('seating_capacity', { required: true })}
                  placeholder="Seating Capacity"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('color', { required: true })}
                  placeholder="Color"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="text"
                  {...register('features', { required: true })}
                  placeholder="Features"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <input
                  type="file"
                  onChange={handleFile}
                  placeholder="Image URL"
                  className="input input-bordered w-1/3 p-2 mb-2"
                />
                <img src={imageUrl} alt="" width={50} height={50} />
              </div>
              <div className="flex justify-end gap-4">
                <button type="submit" className="btn btn-primary p-2">Submit</button>
                <button className="btn p-2">Close</button>
              </div>
            </form>
          </div>
        </div>
      </dialog>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-bold">ID</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Name</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Model</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Year</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Fuel Type</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Transmission</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Seats</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Color</th>
              <th className="py-2 px-4 bg-gray-200 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesSpecs.map((vehicleSpec) => (
              <tr key={vehicleSpec.id}>
                <td className="py-2 px-4 border">{vehicleSpec.id}</td>
                <td className="py-2 px-4 border">{vehicleSpec.manufacturer}</td>
                <td className="py-2 px-4 border">{vehicleSpec.model}</td>
                <td className="py-2 px-4 border">{vehicleSpec.year}</td>
                <td className="py-2 px-4 border">{vehicleSpec.fuel_type}</td>
                <td className="py-2 px-4 border">{vehicleSpec.transmission}</td>
                <td className="py-2 px-4 border">{vehicleSpec.seating_capacity}</td>
                <td className="py-2 px-4 border">{vehicleSpec.color}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => {
                      setSelectedVehicleSpecId(vehicleSpec.id);
                      (document.getElementById('my_modal_5') as HTMLDialogElement)?.showModal()
                    }}
                    className="btn btn-info mr-2"
                  >
                    Add Car
                  </button>
                  <button onClick={() => handleDeleteSpecs(vehicleSpec.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <dialog id="my_modal_5" className="modal-box w-3/4 max-w-full p-6">
  <div className="modal-box w-full max-w-full p-6 bg-base-200 rounded-lg shadow-lg">
    <h3 className="font-bold text-lg mb-4">Add Car</h3>
    <div className="modal-action">
      <form className="w-full" onSubmit={(e) => {
        e.preventDefault();
        handleAddVehicle();
      }}>
        <div className="flex flex-wrap gap-4 mb-4">
          <input
            type="number"
            value={rentalRate}
            onChange={(e) => setRentalRate(Number(e.target.value))}
            placeholder="Rental Rate"
            className="input input-bordered w-1/3 p-2 mb-2"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button type="submit" className="btn btn-primary p-2">Submit</button>
          <button 
            type="button" 
            className="btn btn-danger p-2" 
            onClick={() => (document.getElementById('my_modal_5') as HTMLDialogElement)?.close()}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</dialog>

    </div>
  );
};

export default AllsVehSpecs;
