import React, { useEffect} from 'react';
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
  const [addTicket] = ticketsApi.useCreateTicketMutation();
  // const [Tickets,setTickets] = useState<TicketFormInputs[]>([]); 
  // const [updateTicket] = ticketsApi.useUpdateTicketMutation(); // Add this line for update functionality
  // const [deleteTicket] = ticketsApi.useDeleteTicketMutation(); // Add this line for delete functionality
  const [isCreateModalOpen, setIsCreateModalOpen] = React.useState(false);
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
      toast('Ticket submitted successfully');
      reset();
      setIsCreateModalOpen(false);
      refetch(); // Refetch tickets after submitting a new one
    } catch (err) {
      toast('Failed to submit ticket');
    }
  };

  useEffect(() => {
    if (isCreateModalOpen) {
      refetch();
    }
  }, [isCreateModalOpen, refetch]);

  // const handleEdit = async (id: number) => {
  //   try {
  //     await updateTicket({ id }).unwrap();
  //     toast('Ticket updated successfully');
  //     refetch();
  //   } catch (err) {
  //     toast('Failed to update ticket');
  //   }
  //   console.log('Edit ticket with ID:', id);
  // };

  // const handleDelete = async (id: number) => {
  //   try {
  //   const response = await deleteTicket(id).unwrap();
  //   console.log(response);
  //   setTickets(tickets.filter(ticket => ticket.id !== id));
  //   } catch (err) {
  //     toast('Failed to delete ticket');
  //   }
  //   console.log('Delete ticket with ID:', id);
  // };
  // const handleDeleteSpecs = async (id: number) => {
  //   try {
  //     const response = await deleteSpecs(id).unwrap();
  //     console.log('Deleted vehicle spec with ID:', id);
  //     console.log(response);
  //     setVehiclesSpecs(vehiclesSpecs.filter(spec => spec.id !== id));
  //   } catch (error) {
  //     console.error('Failed to delete vehicle spec', error);
  //   }
  // };

  return (
    <div>
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
      </div>

      <div className="mt-4">
        <Toaster />
        <div className="mt-10">
          <h2 className="font-bold text-3xl text-white mb-4">Your Tickets</h2>
          {tickets?.length ? (
            <table className="table-fixed min-w-full bg-base-100 border border-gray-300">
              <thead>
                <tr>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black text-2xl tracking-wider">Subject</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black text-2xl tracking-wider">Description</th>
                  {/* <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black text-2xl tracking-wider">Status</th>
                  <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-black text-2xl tracking-wider">Details</th> */}
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket: any) => (
                  <tr key={ticket.id}>
                    <td className="px-6 py-4 border border-gray-300">{ticket.subject}</td>
                    <td className="px-6 py-4 border border-gray-300">{ticket.description}</td>
                    {/* <td className="px-6 py-4 border border-gray-300">{ticket.status}</td> */}
                    {/* <td className="px-6 py-4 border border-gray-300"> */}
                      {/* <button className="btn btn-primary mr-2" onClick={() => handleEdit(ticket.id)}>Edit</button> */}
                      {/* <button className="btn btn-danger" onClick={() => handleDelete(ticket.id)}>Delete</button> */}
                    {/* </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No tickets found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
