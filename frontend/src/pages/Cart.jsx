import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchCart, clearCart } from '@store/slices/cartSlice';
import CartItem from '@components/cart/CartItem';
import CartSummary from '@components/cart/CartSummary';
import CouponInput from '@components/cart/CouponInput';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { IoCartOutline, IoArrowBackOutline, IoSparklesOutline, IoTrashOutline } from 'react-icons/io5';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, loading } = useSelector((s) => s.cart);

  useEffect(() => { dispatch(fetchCart()); }, [dispatch]);

  const handleClearCart = () => {
    if (window.confirm('Clear your entire cart?')) dispatch(clearCart());
  };

  if (loading) return <Loader fullScreen message="Loading your cart…" />;

  const isEmpty = !cart || cart.items.length === 0;

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Page header */}
      <div className="bg-white border-b border-[#e2e8f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/products')}
            className="flex items-center gap-2 text-sm text-[#64748b] hover:text-[#0f2447] font-medium transition-colors mb-4"
          >
            <IoArrowBackOutline className="w-4 h-4" />
            Continue Shopping
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#0a1628]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Shopping Cart
              </h1>
              {!isEmpty && (
                <p className="text-[#64748b] text-sm mt-1">
                  {cart.totalItems} {cart.totalItems === 1 ? 'item' : 'items'} in your cart
                </p>
              )}
            </div>
            {!isEmpty && (
              <button
                onClick={handleClearCart}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-600 font-medium transition-colors"
              >
                <IoTrashOutline className="w-4 h-4" />
                Clear cart
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {isEmpty ? (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-24 h-24 rounded-3xl bg-[#eef5ff] border border-[#a8c8f5] flex items-center justify-center mb-6">
                <IoCartOutline className="w-12 h-12 text-[#2563eb]" />
              </div>
              <h2 className="text-3xl font-bold text-[#0a1628] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                Your Cart is Empty
              </h2>
              <p className="text-[#64748b] max-w-md mb-10 text-sm leading-relaxed">
                You haven't added any artworks to your cart yet. Explore our curated collection and find something extraordinary.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/products">
                  <Button size="lg">Browse Artworks</Button>
                </Link>
                <Link to="/gallery">
                  <Button variant="secondary" size="lg" icon={<IoSparklesOutline />}>
                    Visit 3D Gallery
                  </Button>
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Cart content */
            <motion.div
              key="cart"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Items list */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden shadow-sm">
                  <div className="px-6 py-4 border-b border-[#f1f5f9]">
                    <h2 className="font-bold text-[#0a1628] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Items ({cart.totalItems})
                    </h2>
                  </div>
                  <div className="divide-y divide-[#f1f5f9]">
                    {cart.items.map((item) => (
                      <div key={item.product._id} className="px-6 py-5">
                        <CartItem item={item} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 shadow-sm">
                  <h3 className="text-sm font-bold text-[#0a1628] mb-4 uppercase tracking-wide">
                    Coupon Code
                  </h3>
                  <CouponInput appliedCoupon={cart.appliedCoupon} />
                </div>
              </div>

              {/* Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <CartSummary cart={cart} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Cart;
