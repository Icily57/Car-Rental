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
    <div className="p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-white">All Payments</h1>
      
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
        <div className="overflow-x-auto flex justify-center items-center">
          <div className=" rounded-lg  border">
          <table className="table w-4/5 bg-blue-100 rounded-lg shadow-md ">
             <thead className="bg-blue-400">
                <tr>
                  <th className="text-black py-2 text-lg font-bold text-left">ID</th>
                  <th className="text-black py-2 text-lg font-bold text-left">User ID</th>
                  <th className="text-black py-2 text-lg font-bold text-left">Booking ID</th>
                  <th className="text-black py-2 text-lg font-bold text-left">Payment Date</th>
                  <th className="text-black py-2 text-lg font-bold text-left">Payment Status</th>
                  <th className="text-black py-2 text-lg font-bold text-left">Amount</th>
                  <th className="text-black py-2 text-lg font-bold text-left">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: Payment) => (
                  <tr key={payment.id} className="hover:bg-blue-100 transition duration-200 ease-in-out">
                    <td className="py-2 font-bold text-blue-900">{payment.id}</td>
                    <td className="py-2 font-bold text-blue-900">{payment.user_id}</td>
                    <td className="py-2 font-bold text-blue-900">{payment.booking_id}</td>
                    <td className="py-2 font-bold text-blue-900">{new Date(payment.payment_date).toLocaleDateString()}</td>
                    <td className="py-2 font-bold text-blue-900">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          payment.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {payment.payment_status}
                      </span>
                    </td>
                    <td className="py-2 font-bold text-blue-900">${payment.amount}</td>
                    <td className="py-2 font-bold text-blue-900">{payment.payment_method}</td>
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
