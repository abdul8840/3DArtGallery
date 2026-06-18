import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { fetchOrderById, cancelOrder } from '@store/slices/orderSlice';
import OrderTimeline from '@components/order/OrderTimeline';
import TrackingInfo from '@components/order/TrackingInfo';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { formatCurrency, formatDate } from '@utils/helpers';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '@utils/constants';
import { IoArrowBack, IoDownloadOutline, IoPrintOutline } from 'react-icons/io5';

const OrderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentOrder: order, loading } = useSelector((state) => state.order);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await dispatch(cancelOrder({ orderId: id, reason: 'Customer request' })).unwrap();
      } catch (error) {
        // Error handled by slice
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !order) {
    return <Loader fullScreen message="Loading order details..." />;
  }

  const canCancel = ['pending', 'processing'].includes(order.orderStatus);

  return (
    <>
      <Helmet>
        <title>Order {order.orderNumber} | Virtual Art Gallery</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => navigate('/orders')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Back to Orders</span>
            </button>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
                  Order {order.orderNumber}
                </h1>
                <p className="text-gray-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <IoPrintOutline className="w-6 h-6" />
                </button>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    ORDER_STATUS_COLORS[order.orderStatus]
                  }`}
                >
                  {ORDER_STATUS_LABELS[order.orderStatus]}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Order Items */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-6">
                  Order Items
                </h2>
                <div className="space-y-6">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-4 pb-6 border-b border-gray-200 last:border-0 last:pb-0"
                    >
                      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.image || '/placeholder.jpg'}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">
                          {formatCurrency(item.subtotal)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatCurrency(item.price)} each
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Shipping Address
                </h2>
                <div className="text-gray-600">
                  <p className="font-semibold text-gray-900">
                    {order.shippingAddress.fullName}
                  </p>
                  <p>{order.shippingAddress.street}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                    {order.shippingAddress.zipCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2">Email: {order.shippingAddress.email}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Payment Information
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Method</span>
                    <span className="font-semibold text-gray-900 capitalize">
                      {order.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Payment Status</span>
                    <span
                      className={`font-semibold ${
                        order.isPaid ? 'text-green-600' : 'text-yellow-600'
                      }`}
                    >
                      {order.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                  {order.isPaid && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Paid On</span>
                      <span className="font-semibold text-gray-900">
                        {formatDate(order.paidAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Timeline */}
              <OrderTimeline
                statusHistory={order.statusHistory}
                currentStatus={order.orderStatus}
              />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-display font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>
                <div className="space-y-3">
                  <SummaryRow label="Subtotal" value={formatCurrency(order.itemsPrice)} />
                  <SummaryRow label="Shipping" value={formatCurrency(order.shippingPrice)} />
                  <SummaryRow label="Tax" value={formatCurrency(order.taxPrice)} />
                  {order.discountAmount > 0 && (
                    <SummaryRow
                      label="Discount"
                      value={`-${formatCurrency(order.discountAmount)}`}
                      className="text-green-600"
                    />
                  )}
                  <div className="pt-3 border-t border-gray-200">
                    <SummaryRow
                      label="Total"
                      value={formatCurrency(order.totalPrice)}
                      className="text-xl font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Tracking Info */}
              {order.trackingNumber && (
                <TrackingInfo
                  trackingNumber={order.trackingNumber}
                  shippingCarrier={order.shippingCarrier}
                />
              )}

              {/* Actions */}
              <div className="space-y-3">
                {canCancel && (
                  <Button
                    variant="danger"
                    fullWidth
                    onClick={handleCancelOrder}
                  >
                    Cancel Order
                  </Button>
                )}
                <Button variant="outline" fullWidth onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
              </div>

              {/* Need Help */}
              <div className="bg-gray-50 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-600 mb-2">Need help with your order?</p>
                <a
                  href="mailto:support@virtualgallery.com"
                  className="text-sm text-yellow-600 hover:text-yellow-700 font-semibold"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SummaryRow = ({ label, value, className = '' }) => (
  <div className={`flex justify-between ${className}`}>
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

export default OrderDetail;