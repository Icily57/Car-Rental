import React, { useEffect, useState, useRef } from 'react';
import { vehiclesApi } from '../../features/api/vehiclesApi';
import { useForm } from 'react-hook-form';
import { VehicleSpecsFormValues } from '../../types/Types';
import axios from 'axios';
import { cloudinaryConfig } from '../../cloudinary/cloudinary';
import { toast, Toaster } from 'sonner';

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
  imageUrl?: string; // Added imageUrl
}

const AllsVehSpecs: React.FC = () => {
  const dialogRef = useRef<HTMLDialogElement>(null); // Ref for the dialog
  const { data: allSpecVehicles, isError, isLoading: vehSpecsLoading } = vehiclesApi.useGetVehicleSpecsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  const [imageUrl, setImageUrl] = useState<string>('');
  const { register, handleSubmit } = useForm<VehicleSpecsFormValues>();
  const [vehiclesSpecs, setVehiclesSpecs] = useState<VehicleSpecs[]>([]);
  const [addSpecs] = vehiclesApi.useAddSpecsMutation();
  const [deleteSpecs] = vehiclesApi.useDeleteSpecsMutation();
  const [addVehicle, { isLoading: addVehicleIsLoading }] = vehiclesApi.useAddCarMutation();
  console.log(addVehicle)
  if (addVehicleIsLoading) {
    return <div className="text-center">Loading...</div>;
  }

  useEffect(() => {
    if (allSpecVehicles) {
      setVehiclesSpecs(allSpecVehicles);
    }
  }, [allSpecVehicles]);

  useEffect(() => {
    if (isError) {
      toast.error('Error loading vehicle specs');
    }
  }, [isError]);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, formData);
      setImageUrl(res.data.secure_url);
    } catch (error) {
      console.error('Failed to upload image', error);
      toast.error('Failed to upload image');
    }
  };

  const onSubmit = async (data: VehicleSpecsFormValues) => {
    data.imageUrl = imageUrl;

    const transformedData = {
      ...data,
      year: Number(data.year),
      seating_capacity: Number(data.seating_capacity),
    };
    try {
      const response = await addSpecs(transformedData).unwrap();
      dialogRef.current?.close(); // Close dialog after submission
      toast.success('Vehicle specification added successfully');
      console.log('response', response);
    } catch (error) {
      console.error('Failed to add vehicle spec', error);
      toast.error('Failed to add vehicle specification');
    }
  };

  const handleDeleteSpecs = async (id: number) => {
    try {
      await deleteSpecs(id).unwrap();
      setVehiclesSpecs(vehiclesSpecs.filter((spec) => spec.id !== id));
      toast.success('Vehicle specification deleted successfully');
    } catch (error) {
      console.error('Failed to delete vehicle spec', error);
      toast.error('Failed to delete vehicle specification');
    }
  };

  if (vehSpecsLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="p-4 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">All Vehicle Specifications</h1>

      <button
        className="btn btn-primary mb-4 items-center"
        onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.showModal()}
      >
        Add Specs
      </button>
      <dialog id="my_modal_4" className="modal-box w-3/4  p-6 bg-blue-900">
        <div className="modal-box w-full max-w-4xl bg-blue-700 rounded-lg  p-6">
          <h3 className="text-2xl font-bold mb-4 text-white">Add New Vehicle Specification</h3>
          <form method="dialog" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                {...register('manufacturer', { required: true })}
                placeholder="Manufacturer"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('model', { required: true })}
                placeholder="Model"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('year', { required: true })}
                placeholder="Year"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('fuel_type', { required: true })}
                placeholder="Fuel Type"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('engine_capacity', { required: true })}
                placeholder="Engine Capacity"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('transmission', { required: true })}
                placeholder="Transmission"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('seating_capacity', { required: true })}
                placeholder="Seating Capacity"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('color', { required: true })}
                placeholder="Color"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <input
                type="text"
                {...register('features', { required: true })}
                placeholder="Features"
                className="input input-bordered w-full p-3 rounded-md border-blue-100 bg-blue-300 text-black"
              />
              <div className="col-span-1">
                <input
                  type="file"
                  onChange={handleFile}
                  className="input input-bordered w-full p-2 mb-2 border-blue-100 bg-blue-300 text-black"
                />
                {imageUrl && <img src={imageUrl} alt="Uploaded" className="mt-2 rounded-md shadow-sm" width={150} />}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-6">
              <button type="submit" className="btn btn-primary p-3 rounded-md">Submit</button>
              <button
                type="button"
                className="btn btn-secondary p-3 rounded-md"
                onClick={() => (document.getElementById('my_modal_4') as HTMLDialogElement)?.close()}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="overflow-x-auto flex flex-col items-center mt-6">
      <table className="table w-4/5 bg-blue-100 rounded-lg shadow-md ">
      <thead className="bg-blue-400">
            <tr>
              <th className="text-black py-2 text-lg font-bold text-left">ID</th>
              <th className="text-black py-2 text-lg font-bold text-left">Manufacturer</th>
              <th className="text-black py-2 text-lg font-bold text-left">Model</th>
              <th className="text-black py-2 text-lg font-bold text-left">Year</th>
              <th className="text-black py-2 text-lg font-bold text-left">Fuel Type</th>
              <th className="text-black py-2 text-lg font-bold text-left">Transmission</th>
              <th className="text-black py-2 text-lg font-bold text-left">Seats</th>
              <th className="text-black py-2 text-lg font-bold text-left">Color</th>
              <th className="text-black py-2 text-lg font-bold text-left">Image</th> {/* New Column */}
              <th className="text-black py-2 text-lg font-bold text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vehiclesSpecs.map((vehicleSpec) => (
              <tr key={vehicleSpec.id} className="hover:bg-blue-100 transition duration-200">
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.id}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.manufacturer}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.model}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.year}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.fuel_type}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.transmission}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.seating_capacity}</td>
                <td className="py-2 font-bold text-blue-900">{vehicleSpec.color}</td>
                <td className="py-2 font-bold text-blue-900">
                  {vehicleSpec.imageUrl && (
                    <img src={vehicleSpec.imageUrl} alt={`${vehicleSpec.manufacturer} ${vehicleSpec.model}`} className="w-24 h-16 object-cover" />
                  )}
                </td>
                <td className="py-2 font-bold text-blue-900">
                  <button onClick={() => handleDeleteSpecs(vehicleSpec.id)} className="btn btn-danger p-2 rounded-md">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AllsVehSpecs;
