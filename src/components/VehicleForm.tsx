import { useForm, SubmitHandler } from 'react-hook-form';
import { vehiclesApi } from '../features/api/vehiclesApi';

interface VehicleFormValues {
  rental_rate: number;
  vehicleSpec_id: number;
}

interface AddVehicleFormProps {
  onSuccess: () => void;
}

const AddVehicleForm = ({ onSuccess }: AddVehicleFormProps) => {
  const { register, handleSubmit, reset } = useForm<VehicleFormValues>();
  const [addVehicle] = vehiclesApi.useAddCarMutation();

  const onSubmit: SubmitHandler<VehicleFormValues> = async (data) => {
    try {
      await addVehicle(data).unwrap();
      console.log('Vehicle added successfully:', data);
      reset(); // Reset the form after successful submission
      onSuccess(); // Trigger the refetch or update the parent component
    } catch (error) {
      console.error('Failed to add vehicle', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center  mx-auto my-4  text-white font-bold  border-none">
      <div className="mb-4 ">
        <label className="block text-gray-200">Rental Rate</label>
        <input
          type="number"
          {...register('rental_rate', { required: true })}
          className="w-full px-3 py-2 border rounded bg-blue-100 text-black"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-200 ">Vehicle Spec ID</label>
        <input
          type="number"
          {...register('vehicleSpec_id', { required: true })}
          className="w-full px-3 py-2 border rounded bg-blue-100 text-black"
        />
      </div>
      
      <button type="submit" className="btn btn-primary bg-blue-800 text-gray-200">
        Add Vehicle
      </button>
    </form>
  );
};

export default AddVehicleForm;
