import api from './api';

const productService = {
  // Get all products with filters
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response;
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/products/featured');
    return response;
  },

  // Get product by slug
  getProductBySlug: async (slug) => {
    const response = await api.get(`/products/${slug}`);
    return response;
  },

  // Get related products
  getRelatedProducts: async (productId) => {
    const response = await api.get(`/products/${productId}/related`);
    return response;
  },

  // Add product review
  addReview: async (productId, reviewData) => {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response;
  },

  // Create product (Admin)
  createProduct: async (formData) => {
    const response = await api.post('/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  },

  // Update product (Admin)
  updateProduct: async (productId, formData) => {
    const response = await api.put(`/products/id/${productId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  },

  // Delete product (Admin)
  deleteProduct: async (productId) => {
    const response = await api.delete(`/products/id/${productId}`);
    return response;
  },
};

export default productService;