import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';

import { Button, Card } from 'antd';
import { FormEvent } from 'react';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: FormEvent) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Return URL where the customer should be redirected after the PaymentIntent is confirmed.
          return_url: 'http://localhost:3000/payment-success',
        },
      })
      .then(function (result) {
        if (result.error) {
          // Inform the customer that there was an error.
        }
      });
  };

  return (
    <Card style={{ margin: 'auto', width: '50% ' }}>
      <form style={{ textAlign: 'center' }} onSubmit={handleSubmit}>
        <PaymentElement />
        <Button disabled={!stripe} type='primary' style={{ marginTop: 20 }} htmlType='submit'>
          Submit
        </Button>
      </form>
    </Card>
  );
};

export default CheckoutForm;
