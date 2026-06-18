import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchCart, clearCart } from '@store/slices/cartSlice';
import CartItem from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import CouponInput from '@components/cart/CouponInput';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { IoCartOutline, IoArrowBack } from 'react-icons/io5';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (loading) {
    return <Loader fullScreen message="Loading your cart..." />;
  }

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/products')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>

            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-display font-bold text-gray-900">
                Shopping Cart
              </h1>
              {cart && cart.items.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              )}
            </div>
          </div>

          {/* Empty Cart */}
          {!cart || cart.items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoCartOutline className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Your Cart is Empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any artworks to your cart yet.
                Browse our collection and find something you love!
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/products">
                  <Button size="lg">Browse Artworks</Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="outline" size="lg">
                    Visit 3D Gallery
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Cart Items */
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Items List */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
                    Items ({cart.totalItems})
                  </h2>

                  <div className="space-y-6">
                    {cart.items.map((item) => (
                      <CartItem key={item.product._id} item={item} />
                    ))}
                  </div>

                  {/* Coupon Input */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                      Have a coupon code?
                    </h3>
                    <CouponInput appliedCoupon={cart.appliedCoupon} />
                  </div>
                </div>

                {/* Continue Shopping */}
                <div className="mt-6">
                  <Link to="/products">
                    <Button variant="outline" fullWidth>
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <CartSummary cart={cart} />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;