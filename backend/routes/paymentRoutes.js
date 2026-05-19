import express from 'express';
import {
  createPaymentIntent,
  confirmPayment,
  stripeWebhook,
  getStripeConfig,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/config', getStripeConfig);
router.post('/create-intent', protect, createPaymentIntent);
router.post('/confirm', protect, confirmPayment);

// Webhook route (no auth needed, Stripe will sign the request)
router.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  stripeWebhook
);

export default router;