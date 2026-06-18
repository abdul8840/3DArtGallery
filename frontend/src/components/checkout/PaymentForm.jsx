import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Button from '@components/common/Button';
import { IoLockClosedOutline } from 'react-icons/io5';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
      fontFamily: 'Inter, sans-serif',
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

const PaymentForm = ({ onSubmit, amount, loading = false }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
      return;
    }

    // Call parent submit with payment method
    await onSubmit(paymentMethod);
    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <CardElement options={CARD_ELEMENT_OPTIONS} />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </div>

      {/* Security Message */}
      <div className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
        <IoLockClosedOutline className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-900">Secure Payment</p>
          <p className="text-xs text-gray-600 mt-1">
            Your payment information is encrypted and secure. We never store your
            card details.
          </p>
        </div>
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        loading={loading || processing}
        disabled={!stripe || loading || processing}
      >
        Pay ${amount?.toFixed(2) || '0.00'}
      </Button>

      {/* Test Card Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm font-medium text-blue-900 mb-2">Test Card:</p>
        <p className="text-xs text-blue-700">Card: 4242 4242 4242 4242</p>
        <p className="text-xs text-blue-700">Exp: Any future date</p>
        <p className="text-xs text-blue-700">CVC: Any 3 digits</p>
      </div>
    </form>
  );
};

export default PaymentForm;