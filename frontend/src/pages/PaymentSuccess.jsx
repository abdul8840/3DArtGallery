import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { clearCart } from '@store/slices/cartSlice';
import Button from '@components/common/Button';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  useEffect(() => {
    // Clear cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <IoCheckmarkCircleOutline className="w-16 h-16 text-green-600" />
            </motion.div>

            {/* Message */}
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for your purchase. Your order has been confirmed and will
              be processed shortly.
            </p>

            {/* Order Number */}
            {orderId && (
              <div className="bg-gray-50 rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="text-lg font-bold text-gray-900">{orderId}</p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3">
              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/orders')}
              >
                View Order Details
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                A confirmation email has been sent to your email address with
                order details and tracking information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default PaymentSuccess;