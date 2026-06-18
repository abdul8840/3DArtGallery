import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { applyCoupon, removeCoupon } from '@store/slices/cartSlice';
import Button from '@components/common/Button';
import { IoClose } from 'react-icons/io5';

const CouponInput = ({ appliedCoupon }) => {
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    
    setLoading(true);
    try {
      await dispatch(applyCoupon(code)).unwrap();
      setCode('');
    } catch (error) {
      // Error handled by slice
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = () => {
    dispatch(removeCoupon());
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-4 py-3">
        <div>
          <span className="text-sm font-medium text-green-800">
            Coupon Applied: {appliedCoupon.code}
          </span>
          <p className="text-xs text-green-600">
            {appliedCoupon.discountType === 'percentage'
              ? `${appliedCoupon.discount}% off`
              : `$${appliedCoupon.discount} off`}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className="p-1 text-green-600 hover:text-green-800 transition-colors"
        >
          <IoClose className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        placeholder="Enter coupon code"
        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
      />
      <Button
        onClick={handleApply}
        loading={loading}
        disabled={!code.trim()}
      >
        Apply
      </Button>
    </div>
  );
};

export default CouponInput;