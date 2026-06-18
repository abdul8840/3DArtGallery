import React from 'react';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';

const OrderSummary = ({ cart, shippingAddress }) => {
  const shipping = cart.totalPrice > 500 ? 0 : 50;
  const tax = cart.totalPrice * 0.1;
  const total = cart.finalPrice + shipping + tax;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Order Summary
      </h2>

      {/* Items */}
      <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
        {cart.items.map((item) => (
          <div key={item.product._id} className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={getPrimaryImage(item.product.images)}
                alt={item.product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">
                {item.product.title}
              </p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(item.subtotal)}
            </p>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
        <PriceRow label="Subtotal" value={formatCurrency(cart.totalPrice)} />
        
        {cart.appliedCoupon && (
          <PriceRow
            label={`Discount (${cart.appliedCoupon.code})`}
            value={`-${formatCurrency(
              cart.appliedCoupon.discountType === 'percentage'
                ? (cart.totalPrice * cart.appliedCoupon.discount) / 100
                : cart.appliedCoupon.discount
            )}`}
            className="text-green-600"
          />
        )}

        <PriceRow
          label="Shipping"
          value={shipping === 0 ? 'Free' : formatCurrency(shipping)}
        />
        <PriceRow label="Tax" value={formatCurrency(tax)} />
      </div>

      {/* Total */}
      <div className="pt-6 border-t border-gray-200 mb-6">
        <PriceRow
          label="Total"
          value={formatCurrency(total)}
          className="text-xl font-bold"
        />
      </div>

      {/* Shipping Address */}
      {shippingAddress && (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm font-semibold text-gray-900 mb-2">
            Shipping Address
          </p>
          <p className="text-sm text-gray-600">{shippingAddress.fullName}</p>
          <p className="text-sm text-gray-600">{shippingAddress.street}</p>
          <p className="text-sm text-gray-600">
            {shippingAddress.city}, {shippingAddress.state}{' '}
            {shippingAddress.zipCode}
          </p>
          <p className="text-sm text-gray-600">{shippingAddress.country}</p>
        </div>
      )}
    </div>
  );
};

const PriceRow = ({ label, value, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default OrderSummary;