import { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FaLock, FaShieldAlt, FaCreditCard, FaCheckCircle, FaUsers } from "react-icons/fa";

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
      confirmButtonColor: '#9538E2',
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
        color: '#f3f4f6',
        '::placeholder': {
          color: '#9ca3af',
        },
      },
      invalid: {
        color: '#ef4444',
      },
    },
    hidePostalCode: true
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Package Summary */}
      <div className="p-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl border border-purple-500/30">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/25">
              <FaCreditCard className="text-white" />
            </div>
            <div>
              <span className="font-medium text-white text-lg">{packageDetails.name}</span>
              <div className="flex items-center space-x-2 text-gray-300">
                <FaUsers className="text-[#9538E2] text-sm" />
                <span className="text-sm">{packageDetails.members} Team Members</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-[#9538E2]">${packageDetails.price}</div>
            <div className="text-gray-400 text-sm">per month</div>
          </div>
        </div>
        
        {/* Features Preview */}
        <div className="grid grid-cols-2 gap-2">
          {packageDetails.features.slice(0, 4).map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-gray-300 text-sm">
              <FaCheckCircle className="text-[#9538E2] text-xs" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-lg flex items-center justify-center">
            <FaCreditCard className="text-white text-sm" />
          </div>
          <h4 className="text-lg font-semibold text-white">Payment Method</h4>
        </div>
        
        <div className="p-4 border border-gray-700 rounded-xl bg-gray-800">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#9538E2]/20 rounded-lg flex items-center justify-center">
            <FaLock className="text-[#9538E2] text-sm" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">Secure Payment</p>
            <p className="text-gray-400 text-xs">Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>
      
      {/* Error Display */}
      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded-xl border border-red-500/30">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center space-x-3 ${
          processing 
            ? 'bg-gray-600 cursor-not-allowed' 
            : 'bg-gradient-to-r from-[#9538E2] to-purple-700 hover:from-purple-700 hover:to-[#9538E2] hover:scale-105 shadow-lg shadow-purple-900/25'
        }`}
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <FaShieldAlt className="text-lg" />
            <span>Pay ${packageDetails.price} - Secure Payment</span>
          </>
        )}
      </button>

      {/* Additional Security Info */}
      <div className="text-center">
        <p className="text-gray-400 text-xs">
          By completing this payment, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
};

export default CheckoutForm;