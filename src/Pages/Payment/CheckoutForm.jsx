import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const CheckoutForm = ({ packageDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [processing, setProcessing] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const showSuccessModal = (transactionId) => {
    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      html: `
        <div class="text-center">
          <p class="mb-4">Your payment has been processed successfully.</p>
          <p class="text-sm text-gray-600">Transaction ID:</p>
          <p class="font-mono bg-gray-100 p-2 rounded">${transactionId}</p>
        </div>
      `,
      confirmButtonText: 'Close',
      confirmButtonColor: '#3085d6',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError('');

    try {
      const { error: cardError, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
        billing_details: {
          email: user?.email,
          name: user?.displayName,
        },
      });

      if (cardError) {
        setError(cardError.message);
        setProcessing(false);
        return;
      }

      const { data: { clientSecret } } = await axiosSecure.post('/create-payment-intent', {
        packageType: packageDetails.name
      });

      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (confirmError) {
        setError(confirmError.message);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        await axiosSecure.post('/payments', {
          email: user.email,
          packageType: packageDetails.name,
          amount: packageDetails.price,
          transactionId: paymentIntent.id,
        });

        showSuccessModal(paymentIntent.id);
      }
    } catch (err) {
      setError('An error occurred during payment processing.');
      // console.error('Payment Error:', err);
    } finally {
      setProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-purple-50 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium">{packageDetails.name}</span>
          <span className="text-lg font-bold">${packageDetails.price}</span>
        </div>
      </div>

      <div className="p-4 border rounded-md">
        <CardElement options={cardElementOptions} />
      </div>
      
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-md font-medium text-white ${
          processing ? 'bg-gray-400' : 'bg-[#9538E2] hover:bg-[#8f2fdf]'
        }`}
      >
        {processing ? 'Processing...' : `Pay $${packageDetails.price}`}
      </button>
    </form>
  );
};

export default CheckoutForm;