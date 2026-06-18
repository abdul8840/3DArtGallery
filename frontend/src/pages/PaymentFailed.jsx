import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@components/common/Button';
import { IoCloseCircleOutline } from 'react-icons/io5';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <IoCloseCircleOutline className="w-16 h-16 text-red-600" />
            </motion.div>

            {/* Message */}
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Payment Failed
            </h1>
            <p className="text-gray-600 mb-8">
              We couldn't process your payment. Please check your payment details
              and try again.
            </p>

            {/* Common Issues */}
            <div className="bg-gray-50 rounded-lg p-4 mb-8 text-left">
              <p className="text-sm font-semibold text-gray-900 mb-2">
                Common issues:
              </p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Insufficient funds</li>
                <li>• Incorrect card details</li>
                <li>• Card expired</li>
                <li>• Transaction declined by bank</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Try Again
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </Button>
            </div>

            {/* Support */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Need help?{' '}
                <a href="mailto:support@virtualgallery.com" className="text-yellow-600 hover:text-yellow-700 font-semibold">
                  Contact Support
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentFailed;