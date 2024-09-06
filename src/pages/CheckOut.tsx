import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckOutForm';
import { useQuery } from 'react-query';
import { getBookingByRef } from '../libs/fetcher';
import { BookingData } from '../libs/apiResponseInterface';
import { useState } from 'react';
import Loading from '../components/UI/Loading';
import { useParams } from 'react-router-dom';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_PUBLIC_KEY);

const Checkout: React.FC = () => {
  const { reference } = useParams<{ reference: string }>();
  const [options, setOption] = useState({
    clientSecret: '',
  });
  const { isLoading, data } = useQuery(
    ['checkout', reference],
    async () => {
      if (reference) return await getBookingByRef(reference);
    },
    {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: !!reference,
      onSuccess: (data: BookingData) => {
        setOption({
          // passing the client secret obtained from the server
          clientSecret: data?.clientSecrect,
        });
      },
    },
  );
  console.log(options);
  return (
    <>
      {isLoading && <Loading />}
      {data && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};
export default Checkout;
