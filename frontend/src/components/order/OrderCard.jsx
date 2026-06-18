import React from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency, formatDate } from '@utils/helpers';
import { ORDER_STATUS_COLORS, ORDER_STATUS_LABELS } from '@utils/constants';
import { IoArrowForward } from 'react-icons/io5';

const OrderCard = ({ order }) => {
  return (
    <Link
      to={`/orders/${order._id}`}
      className="block bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Order Number</p>
          <p className="text-lg font-bold text-gray-900">{order.orderNumber}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            ORDER_STATUS_COLORS[order.orderStatus]
          }`}
        >
          {ORDER_STATUS_LABELS[order.orderStatus]}
        </span>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-500">Order Date</p>
        <p className="text-gray-900 font-medium">
          {formatDate(order.createdAt)}
        </p>
      </div>

      {/* Order Items Preview */}
      <div className="flex items-center space-x-2 mb-4 overflow-x-auto">
        {order.items.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
          >
            <img
              src={item.image || '/placeholder.jpg'}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {order.items.length > 3 && (
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-semibold text-gray-600">
              +{order.items.length - 3}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">Total Amount</p>
          <p className="text-xl font-bold text-gray-900">
            {formatCurrency(order.totalPrice)}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-yellow-600 font-semibold">
          <span>View Details</span>
          <IoArrowForward />
        </div>
      </div>
    </Link>
  );
};

export default OrderCard;