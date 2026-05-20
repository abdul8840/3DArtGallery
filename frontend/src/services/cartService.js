import api from './api';

const cartService = {
  // Get user cart
  getCart: async () => {
    const response = await api.get('/cart');
    return response;
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    const response = await api.post('/cart/items', { productId, quantity });
    return response;
  },

  // Update cart item
  updateCartItem: async (productId, quantity) => {
    const response = await api.put(`/cart/items/${productId}`, { quantity });
    return response;
  },

  // Remove from cart
  removeFromCart: async (productId) => {
    const response = await api.delete(`/cart/items/${productId}`);
    return response;
  },

  // Clear cart
  clearCart: async () => {
    const response = await api.delete('/cart');
    return response;
  },

  // Apply coupon
  applyCoupon: async (code) => {
    const response = await api.post('/cart/coupon', { code });
    return response;
  },

  // Remove coupon
  removeCoupon: async () => {
    const response = await api.delete('/cart/coupon');
    return response;
  },
};

export default cartService;