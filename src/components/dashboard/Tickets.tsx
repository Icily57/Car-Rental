import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { RootState } from '../../app/store';
import { useSelector } from 'react-redux';
import { ticketsApi } from '../../features/api/ticketsApi';

type TicketFormInputs = {
  id: number;
  subject: string;
  description: string;
};

const Ticket: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TicketFormInputs>();
  const [addTicket] = ticketsApi.useCreateTicketMutation();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const user_id = user?.user.id;
  const { data: tickets, refetch } = ticketsApi.useGetTicketsByUserIdQuery(user?.user.id);

  const onSubmit = async (data: TicketFormInputs) => {
    const ticket = {
      ...data,
      user_id: user_id
    };

    try {
      await addTicket(ticket).unwrap();
      toast.success('Ticket submitted successfully');
      reset();
      setIsCreateModalOpen(false);
      refetch();
    } catch (err) {
      toast.error('Failed to submit ticket');
    }
  };

  useEffect(() => {
    if (isCreateModalOpen) {
      refetch();
    }
  }, [isCreateModalOpen, refetch]);

  return (
    <div className="bg-cyan-100 min-h-screen p-6">
      <Toaster />
      <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
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
      </div>

      <div className="mt-8">
        <h2 className="font-bold text-3xl text-center mb-4">Your Tickets</h2>
        {tickets?.length ? (
          <div className="overflow-x-auto">
            <table className="table-fixed min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-6 py-3 border-b text-left leading-4 text-black text-2xl tracking-wider">Subject</th>
                  <th className="px-6 py-3 border-b text-left leading-4 text-black text-2xl tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket: any) => (
                  <tr key={ticket.id} className="hover:bg-gray-100 transition-colors duration-200">
                    <td className="px-6 py-4 border">{ticket.subject}</td>
                    <td className="px-6 py-4 border">{ticket.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default Ticket;
