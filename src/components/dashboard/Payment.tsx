import React from 'react';
import { useSelector } from 'react-redux';
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

const UserPayments: React.FC = () => {
    const user_id = useSelector((state: any) => state.auth.user.id);

    const { data: payments, isError, isLoading } = paymentApi.useGetPaymentsQuery(user_id, {
        refetchOnFocus: true,
        pollingInterval: 60000,
    });

    return (
        <div className="container mx-auto p-6 bg-cyan-100 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Your Payments</h1>
            {isLoading && (
                <div className="flex justify-center items-center h-screen">
                    <AiOutlineLoading3Quarters className="animate-spin text-4xl text-blue-500" />
                </div>
            )}
            {isError && (
                <div className="text-center text-red-500 text-lg">
                    Error fetching payments. Please try again later.
                </div>
            )}
            {payments && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-4 border-b">ID</th>
                                <th className="py-3 px-4 border-b">Booking ID</th>
                                <th className="py-3 px-4 border-b">Payment Date</th>
                                <th className="py-3 px-4 border-b">Payment Status</th>
                                <th className="py-3 px-4 border-b">Amount</th>
                                <th className="py-3 px-4 border-b">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment: Payment) => (
                                <tr key={payment.id} className="hover:bg-gray-100 transition-colors duration-200">
                                    <td className="py-2 px-4 border-b">{payment.id}</td>
                                    <td className="py-2 px-4 border-b">{payment.booking_id}</td>
                                    <td className="py-2 px-4 border-b">{payment.payment_date}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-white ${
                                                payment.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
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
            )}
        </div>
    );
};

export default UserPayments;
