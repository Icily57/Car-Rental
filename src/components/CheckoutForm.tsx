// import React from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement!,
//     });

//     if (error) {
//       console.log('[error]', error);
//     } else {
//       console.log('[PaymentMethod]', paymentMethod);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="p-4 bg-base-100 rounded shadow-md" />
//       <button type="submit" className="btn btn-primary w-full" disabled={!stripe}>
//         Pay
//       </button>
//     </form>
//   );
// };

// export default CheckoutForm;

import React from 'react';
import { useForm } from 'react-hook-form'; // SubmitHandler
// import { useDispatch} from 'react-redux';//, useSelector 
// import { RootState } from '../store';
// import { updateBooking } from '../app/BookingSlice';

type PaymentInputs = {
  paymentMethod: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCVC?: string;
  paypalEmail?: string;
  mobileMoneyNumber?: string;
};

const CheckoutForm: React.FC = () => {
  const { register,  watch } = useForm<PaymentInputs>(); //handleSubmit,
  // const dispatch = useDispatch();
  const paymentMethod = watch('paymentMethod');

  // const onSubmit: SubmitHandler<PaymentInputs> = data => {
  //   dispatch(updateBooking(data));
  // };

  return (
    <form  className="space-y-4">
      <div>
        <label className="block">Payment Method</label>
        <select {...register('paymentMethod')} className="select select-bordered w-full">
          <option value="Card">Card</option>
          <option value="Paypal">Paypal</option>
          <option value="MobileMoney">Mobile Money</option>
        </select>
      </div>

      {paymentMethod === 'Card' && (
        <>
          <div>
            <label className="block">Card Number</label>
            <input type="text" {...register('cardNumber')} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block">Card Expiry</label>
            <input type="text" {...register('cardExpiry')} className="input input-bordered w-full" />
          </div>
          <div>
            <label className="block">Card CVC</label>
            <input type="text" {...register('cardCVC')} className="input input-bordered w-full" />
          </div>
        </>
      )}

      {paymentMethod === 'Paypal' && (
        <div>
          <label className="block">Paypal Email</label>
          <input type="email" {...register('paypalEmail')} className="input input-bordered w-full" />
        </div>
      )}

      {paymentMethod === 'MobileMoney' && (
        <div>
          <label className="block">Mobile Money Number</label>
          <input type="text" {...register('mobileMoneyNumber')} className="input input-bordered w-full" />
        </div>
      )}

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default CheckoutForm;

