// import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { paymentApi } from '../../features/api/paymentApi';

interface Payment {
    id: number;
    user_id: number;
    booking_id: number;
    payment_date: string;
    payment_status: string;
    amount: string;
    payment_method: string;
}

const UserPayments = () => {
    // Assuming you have a selector to get the logged-in user_id
    const user_id = useSelector((state: any) => state.auth.user.id);
    
    const { data: payments, isError, isLoading } = paymentApi.useGetPaymentsQuery(user_id, {
        refetchOnFocus: true,
        pollingInterval: 60000,
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Payments</h1>
            {isLoading && <div className="text-center">Loading...</div>}
            {isError && <div className="text-center text-red-500">Error fetching payments</div>}
            {payments && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-2 px-4 border-b">ID</th>
                                <th className="py-2 px-4 border-b">Booking ID</th>
                                <th className="py-2 px-4 border-b">Payment Date</th>
                                <th className="py-2 px-4 border-b">Payment Status</th>
                                <th className="py-2 px-4 border-b">Amount</th>
                                <th className="py-2 px-4 border-b">Payment Method</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment: Payment) => (
                                <tr key={payment.id}>
                                    <td className="py-2 px-4 border-b">{payment.id}</td>
                                    <td className="py-2 px-4 border-b">{payment.booking_id}</td>
                                    <td className="py-2 px-4 border-b">{payment.payment_date}</td>
                                    <td className="py-2 px-4 border-b">
                                        <span
                                            className={`px-2 py-1 rounded-full text-black ${
                                                payment.payment_status === 'paid' ? 'bg-green-500' : 'bg-red-500'
                                            }`}
                                        >
                                            {payment.payment_status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b">{payment.amount}</td>
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