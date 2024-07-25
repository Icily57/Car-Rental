import React from 'react';
import { paymentApi } from '../../features/api/paymentApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface Payment {
  id: number;
  user_id: number;
  booking_id: number;
  payment_date: string;
  payment_status: string;
  amount: string;
  payment_method: string;
}

const AllPayments: React.FC = () => {
  const { data: payments, isError, isLoading } = paymentApi.useGetPaymentsQuery(1, {
    refetchOnFocus: true,
    pollingInterval: 60000,
  });

  return (
    <div className="p-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">All Payments</h1>
      
      {isLoading && (
        <div className="flex justify-center items-center h-screen">
          <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-4xl" />
        </div>
      )}
      
      {isError && (
        <div className="text-center text-red-500 mb-6">
          Error fetching payments
        </div>
      )}
      
      {payments && (
        <div className="overflow-x-auto">
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-3 px-4 border-b">ID</th>
                  <th className="py-3 px-4 border-b">User ID</th>
                  <th className="py-3 px-4 border-b">Booking ID</th>
                  <th className="py-3 px-4 border-b">Payment Date</th>
                  <th className="py-3 px-4 border-b">Payment Status</th>
                  <th className="py-3 px-4 border-b">Amount</th>
                  <th className="py-3 px-4 border-b">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: Payment) => (
                  <tr key={payment.id} className="hover:bg-gray-100 transition duration-200 ease-in-out">
                    <td className="py-3 px-4 border-b">{payment.id}</td>
                    <td className="py-3 px-4 border-b">{payment.user_id}</td>
                    <td className="py-3 px-4 border-b">{payment.booking_id}</td>
                    <td className="py-3 px-4 border-b">{new Date(payment.payment_date).toLocaleDateString()}</td>
                    <td className="py-3 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          payment.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-b">${payment.amount}</td>
                    <td className="py-3 px-4 border-b">{payment.payment_method}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPayments;
