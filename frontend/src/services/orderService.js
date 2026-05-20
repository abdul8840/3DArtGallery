import api from './api';

const orderService = {
  // Create order
  createOrder: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response;
  },

  // Get user orders
  getMyOrders: async (params = {}) => {
    const response = await api.get('/orders/my-orders', { params });
    return response;
  },

  // Get order by ID
  getOrderById: async (orderId) => {
    const response = await api.get(`/orders/${orderId}`);
    return response;
  },

  // Update order to paid
  updateOrderToPaid: async (orderId, paymentResult) => {
    const response = await api.put(`/orders/${orderId}/pay`, paymentResult);
    return response;
  },

  // Cancel order
  cancelOrder: async (orderId, reason) => {
    const response = await api.put(`/orders/${orderId}/cancel`, { reason });
    return response;
  },

  // Get all orders (Admin)
  getAllOrders: async (params = {}) => {
    const response = await api.get('/orders', { params });
    return response;
  },

  // Update order status (Admin)
  updateOrderStatus: async (orderId, status, note) => {
    const response = await api.put(`/orders/${orderId}/status`, { status, note });
    return response;
  },

  // Update tracking (Admin)
  updateTracking: async (orderId, trackingData) => {
    const response = await api.put(`/orders/${orderId}/tracking`, trackingData);
    return response;
  },
};

export default orderService;