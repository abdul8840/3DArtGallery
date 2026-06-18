import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { fetchCart } from '@store/slices/cartSlice';
import { createOrder } from '@store/slices/orderSlice';
import paymentService from '@services/paymentService';
import CheckoutSteps from '@components/checkout/CheckoutSteps';
import AddressForm from '@components/checkout/AddressForm';
import PaymentForm from '@components/checkout/PaymentForm';
import OrderSummary from '@components/checkout/OrderSummary';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';
import { IoArrowBack } from 'react-icons/io5';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading: cartLoading } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if cart is empty
    if (cart && cart.items.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const handleAddressSubmit = async (addressData) => {
    setShippingAddress(addressData);
    setCurrentStep(2);

    // Create payment intent
    try {
      setLoading(true);
      const shipping = cart.totalPrice > 500 ? 0 : 50;
      const tax = cart.totalPrice * 0.1;
      const total = cart.finalPrice + shipping + tax;

      // Note: We'll create the order first, then get payment intent
      const orderData = {
        items: cart.items.map((item) => ({
          product: item.product._id,
          title: item.product.title,
          image: item.product.images?.[0]?.url,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.subtotal,
        })),
        shippingAddress: addressData,
        paymentMethod: 'stripe',
        itemsPrice: cart.totalPrice,
        taxPrice: tax,
        shippingPrice: shipping,
        totalPrice: total,
      };

      const order = await dispatch(createOrder(orderData)).unwrap();

      // Get payment intent from backend
      const { data } = await paymentService.createPaymentIntent(
        total,
        order._id
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error('Payment intent creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async (paymentMethod) => {
    try {
      setLoading(true);
      
      // Process payment with Stripe (handled by PaymentForm)
      // On success, navigate to success page
      navigate('/payment-success');
    } catch (error) {
      console.error('Payment failed:', error);
      navigate('/payment-failed');
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading || !cart) {
    return <Loader fullScreen message="Loading checkout..." />;
  }

  const shipping = cart.totalPrice > 500 ? 0 : 50;
  const tax = cart.totalPrice * 0.1;
  const total = cart.finalPrice + shipping + tax;

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/cart')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Back to Cart</span>
            </button>
            <h1 className="text-4xl font-display font-bold text-gray-900">
              Checkout
            </h1>
          </div>

          {/* Steps */}
          <CheckoutSteps currentStep={currentStep} />

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Forms */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                      Shipping Information
                    </h2>
                    <AddressForm
                      onSubmit={handleAddressSubmit}
                      initialData={{
                        fullName: user?.name,
                        email: user?.email,
                        ...user?.address,
                      }}
                      loading={loading}
                    />
                  </div>
                )}

                {currentStep === 2 && clientSecret && (
                  <div>
                    <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                      Payment Information
                    </h2>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm
                        onSubmit={handlePaymentSubmit}
                        amount={total}
                        loading={loading}
                      />
                    </Elements>
                    <div className="mt-6">
                      <Button
                        variant="outline"
                        fullWidth
                        onClick={() => setCurrentStep(1)}
                      >
                        Back to Shipping
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <OrderSummary cart={cart} shippingAddress={shippingAddress} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;