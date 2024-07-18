import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface TicketFormInputs {
  title: string;
  description: string;
  priority: string;
}

const Tickets: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<TicketFormInputs>();

  const onSubmit: SubmitHandler<TicketFormInputs> = async (data) => {
    try {
      const response = await fetch('/customerSupportTickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create ticket');
      }

      const result = await response.json();
      console.log('Ticket created successfully:', result);
      // Optionally, you can reset the form or show a success message here
    } catch (error) {
      console.error('Error creating ticket:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-white bg-opacity-75 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create a Ticket</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              className="input input-bordered w-full"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="form-control">
            <label htmlFor="description" className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              className="textarea textarea-bordered w-full"
              {...register('description', { required: 'Description is required' })}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
};

export default Tickets;
