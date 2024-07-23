import React from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { ticketsApi } from '../../features/api/ticketsApi';

type TicketFormInputs = {
  subject: string;
  description: string;
};

const Ticket: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TicketFormInputs>();
  const[addTicket] = ticketsApi.useCreateTicketMutation();
  const [ CreateModalOpen,setIsCreateModalOpen] = React.useState(false);
  console.log(CreateModalOpen);
  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.user_id;
  const onSubmit = async (data: any) => {
    const ticket = {
      ...data,
      user_id: user_id
    };
    try {
      await addTicket(ticket).unwrap();
      toast('Ticket submitted successfully');
      reset();
      setIsCreateModalOpen(false);
      console.log('Ticket submitted successfully');
    } catch (err) {
      toast('Failed to submit ticket');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a Ticket</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            id="subject"
            {...register('subject', { required: 'Subject is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.subject && <span className="text-red-600 text-sm">{errors.subject.message}</span>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.description && <span className="text-red-600 text-sm">{errors.description.message}</span>}
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default Ticket;
