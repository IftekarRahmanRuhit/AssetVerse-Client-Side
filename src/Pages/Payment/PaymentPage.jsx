
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PackageCard from './PackageCard';
import CheckoutForm from './CheckoutForm';
import {Helmet} from "react-helmet-async"
import { FaCreditCard, FaShieldAlt, FaCheckCircle, FaStar, FaUsers } from "react-icons/fa";

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
      theme: 'night',
      variables: {
        colorPrimary: '#9538E2',
        colorBackground: '#1f2937',
        colorText: '#f3f4f6',
        colorDanger: '#ef4444',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
      <Helmet> <title>AssetVerse | Payment page</title> </Helmet>
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#9538E2]/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-2xl mb-6 shadow-2xl shadow-purple-900/50">
            <FaCreditCard className="text-white text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#9538E2] to-purple-600 bg-clip-text text-transparent mb-6">
            Choose Your Package & Complete Payment
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-8">
            Select a package and process payment in one simple step
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-gray-400">
            <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
              <FaShieldAlt className="text-[#9538E2]" />
              <span className="text-sm font-medium">Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
              <FaCheckCircle className="text-[#9538E2]" />
              <span className="text-sm font-medium">Instant Access</span>
            </div>
            <div className="flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-xl border border-gray-700">
              <FaStar className="text-[#9538E2]" />
              <span className="text-sm font-medium">30-Day Money Back</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Package Selection */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">Available Packages</h2>
              <p className="text-gray-400">Choose the plan that best fits your organization's needs</p>
            </div>
            <div className="space-y-6">
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

          {/* Payment Section */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gray-900/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-gray-700">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-[#9538E2] to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/25">
                  <FaCreditCard className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">Payment Details</h3>
                  <p className="text-gray-400 text-sm">Complete your subscription</p>
                </div>
              </div>
              
              {!selectedPackage ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <FaUsers className="text-gray-400 text-2xl" />
                  </div>
                  <p className="text-gray-300 font-medium text-lg mb-2">Select a Package</p>
                  <p className="text-gray-400">Choose a package from the left to proceed with payment</p>
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
    </div>
  );
};

export default PaymentPage;