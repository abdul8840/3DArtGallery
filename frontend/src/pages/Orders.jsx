import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { fetchMyOrders } from '@store/slices/orderSlice';
import OrderCard from '@components/order/OrderCard';
import Loader from '@components/common/Loader';
import { IoReceiptOutline } from 'react-icons/io5';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, total, pages } = useSelector((state) => state.order);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const params = { page: currentPage, limit: 10 };
    if (filter !== 'all') {
      params.status = filter;
    }
    dispatch(fetchMyOrders(params));
  }, [dispatch, currentPage, filter]);

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
  ];

  if (loading && orders.length === 0) {
    return <Loader fullScreen message="Loading your orders..." />;
  }

  return (
    <>
      <Helmet>
        <title>My Orders | Virtual Art Gallery</title>
        <meta name="description" content="View and track your orders" />
      </Helmet>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-gray-900 mb-2">
              My Orders
            </h1>
            <p className="text-gray-600">
              {total} {total === 1 ? 'order' : 'orders'} found
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilter(option.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === option.value
                    ? 'bg-gradient-gold text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoReceiptOutline className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                No Orders Found
              </h2>
              <p className="text-gray-600 mb-8">
                {filter === 'all'
                  ? "You haven't placed any orders yet"
                  : `No ${filter} orders found`}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {orders.map((order, index) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <OrderCard order={order} />
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pages > 1 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center gap-2">
                {[...Array(pages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-lg font-medium transition-all ${
                      currentPage === index + 1
                        ? 'bg-gradient-gold text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;