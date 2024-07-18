// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutForm from '../components/CheckoutForm';
// import { CreditCard } from 'lucide-react';

// const stripePromise = loadStripe('pk_test_51PcnDjRsM9MD60MUSokKWQYDKHJRX6QozjatiXn2BLZkcDSNJabkwtXnXgExy9MRKypMnbxpVuXiND5mWsz3IMGO00jsYR73Rd');

// const Payment: React.FC = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <div className="p-6 bg-base-200 text-base-content">
//         <div className="max-w-4xl mx-auto">
//           <div className="flex items-center mb-4">
//             <CreditCard className="w-6 h-6 text-primary" />
//             <h1 className="text-2xl font-bold ml-2">Payment</h1>
//           </div>
//           <CheckoutForm />
//         </div>
//       </div>
//     </Elements>
//   );
// };

// export default Payment;

import React from 'react';
import CheckoutForm from '../CheckoutForm';
// import { Book } from 'lucide-react';

const Payments: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mt-6 mb-4">Payment</h2>
      <CheckoutForm />
    </div>
  );
};

export default Payments;

