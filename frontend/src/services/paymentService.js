import api from './api';

const paymentService = {
  // Get Stripe config
  getStripeConfig: async () => {
    const response = await api.get('/payment/config');
    return response;
  },

  // Create payment intent
  createPaymentIntent: async (amount, orderId) => {
    const response = await api.post('/payment/create-intent', {
      amount,
      orderId,
    });
    return response;
  },

  // Confirm payment
  confirmPayment: async (paymentIntentId, orderId) => {
    const response = await api.post('/payment/confirm', {
      paymentIntentId,
      orderId,
    });
    return response;
  },
};

export default paymentService;