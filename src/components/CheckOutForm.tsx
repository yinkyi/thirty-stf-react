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

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
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
