import React from 'react';
import { useSelector } from 'react-redux';
import { paymentApi } from '../../features/api/paymentApi';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { RootState } from '../../app/store';

interface Payment {
    id: number;
    user_id: number;
    booking_id: number;
    payment_date: string;
    payment_status: string;
    amount: string;
    payment_method: string;
}

const UserPayments: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const user_id = user?.id;

    const { data: payments, isError, isLoading } = paymentApi.useGetPaymentsQuery(user_id, {
        refetchOnFocus: true,
        pollingInterval: 60000,
    });

    if (isLoading) {
        return  <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
    </div>;
      }
    
      if (isError) {
        return<div className="text-center text-red-500 text-lg">
        Error fetching payments. Please try again later.
    </div>;
      }

    return (
        <div className="container mx-auto py-8 px-4 bg-gradient-to-b from-blue-900 via-blue-600 to-blue-900">
            <h1 className="text-5xl font-bold text-center mb-8 text-white">My Transactions</h1>
        <div className="overflow-x-auto flex flex-col items-center">
                    <table className="min-w-full bg-blue-100 rounded-lg shadow-md text-black">
                        <thead className="bg-blue-300">
                            <tr>
                                <th className="text-black py-2 text-lg font-bold text-left">ID</th>
                                <th className="text-black py-2 text-lg font-bold text-left">Booking ID</th>
                                <th className="text-black py-2 text-lg font-bold text-left">Payment Date</th>
                                <th className="text-black py-2 text-lg font-bold text-left">Payment Status</th>
                                <th className="text-black py-2 text-lg font-bold text-left">Amount</th>
                                <th className="text-black py-2 text-lg font-bold text-left">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment: Payment) => (
                                <tr key={payment.id} className="hover:bg-blue-100 transition-colors duration-200">
                                    <td className="py-2 px-4 border-b">{payment.id}</td>
                                    <td className="py-2 px-4 border-b">{payment.booking_id}</td>
                                    <td className="py-2 px-4 border-b">{payment.payment_date}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${
                                                payment.payment_status === 'paid' ? 'bg-green-600' : 'bg-red-600'
                                            }`}
                                        >
                                            {payment.payment_status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">${payment.amount}</td>
                                    <td className="py-2 px-4 border-b">{payment.payment_method}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
    );
};

export default UserPayments;
