import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';
import { formatCurrency } from '@utils/helpers';
import { IoCheckmarkCircle } from 'react-icons/io5';

const CartSummary = ({ cart }) => {
  const navigate = useNavigate();

  const shipping = cart.totalPrice > 500 ? 0 : 50;
  const tax = cart.totalPrice * 0.1; // 10% tax
  const total = cart.finalPrice + shipping + tax;

  return (
    <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Order Summary
      </h2>

      <div className="space-y-4 mb-6">
        <SummaryRow label="Subtotal" value={formatCurrency(cart.totalPrice)} />
        
        {cart.appliedCoupon && (
          <SummaryRow
            label={`Discount (${cart.appliedCoupon.code})`}
            value={`-${formatCurrency(
              cart.appliedCoupon.discountType === 'percentage'
                ? (cart.totalPrice * cart.appliedCoupon.discount) / 100
                : cart.appliedCoupon.discount
            )}`}
            className="text-green-600"
          />
        )}

        <SummaryRow
          label="Shipping"
          value={shipping === 0 ? 'Free' : formatCurrency(shipping)}
        />
        
        <SummaryRow label="Tax" value={formatCurrency(tax)} />

        <div className="pt-4 border-t border-gray-300">
          <SummaryRow
            label="Total"
            value={formatCurrency(total)}
            className="text-xl font-bold"
          />
        </div>
      </div>

      {shipping === 0 && (
        <div className="flex items-center space-x-2 text-green-600 bg-green-50 px-4 py-3 rounded-lg mb-6">
          <IoCheckmarkCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-sm font-medium">
            You qualify for free shipping!
          </span>
        </div>
      )}

      <Button fullWidth size="lg" onClick={() => navigate('/checkout')}>
        Proceed to Checkout
      </Button>

      <div className="mt-6 space-y-3 text-sm text-gray-600">
        <Feature text="Secure checkout with SSL encryption" />
        <Feature text="30-day money-back guarantee" />
        <Feature text="Free returns on all orders" />
      </div>
    </div>
  );
};

const SummaryRow = ({ label, value, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

const Feature = ({ text }) => (
  <div className="flex items-center space-x-2">
    <IoCheckmarkCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
    <span>{text}</span>
  </div>
);

export default CartSummary;