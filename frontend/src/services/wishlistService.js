import api from './api';

const wishlistService = {
  // Get user wishlist
  getWishlist: async () => {
    const response = await api.get('/wishlist');
    return response;
  },

  // Add to wishlist
  addToWishlist: async (productId) => {
    const response = await api.post('/wishlist', { productId });
    return response;
  },

  // Toggle wishlist item
  toggleWishlist: async (productId) => {
    const response = await api.post('/wishlist/toggle', { productId });
    return response;
  },

  // Remove from wishlist
  removeFromWishlist: async (productId) => {
    const response = await api.delete(`/wishlist/${productId}`);
    return response;
  },

  // Clear wishlist
  clearWishlist: async () => {
    const response = await api.delete('/wishlist');
    return response;
  },
};

export default wishlistService;