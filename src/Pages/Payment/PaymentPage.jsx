
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PackageCard from './PackageCard';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PACKAGES = [
  {
    id: 1,
    name: '5 Members for $5',
    price: 5,
    members: 5,
    features: ['5 Team Members', 'Basic Support', 'Member Management']
  },
  {
    id: 2,
    name: '10 Members for $8',
    price: 8,
    members: 10,
    features: ['10 Team Members', 'Priority Support', 'Advanced Analytics']
  },
  {
    id: 3,
    name: '20 Members for $15',
    price: 15,
    members: 20,
    features: ['20 Team Members', '24/7 Support', 'Custom Reports']
  }
];

const PaymentPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const options = {
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#0366d6',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Choose Your Package & Complete Payment
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Select a package and process payment in one simple step
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">Available Packages</h3>
            <div className="space-y-4">
              {PACKAGES.map((pkg) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isSelected={selectedPackage?.id === pkg.id}
                  onSelect={() => setSelectedPackage(pkg)}
                />
              ))}
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h3>
            {!selectedPackage ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Please select a package to proceed with payment</p>
              </div>
            ) : (
              <Elements stripe={stripePromise} options={options}>
                <CheckoutForm packageDetails={selectedPackage} />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;