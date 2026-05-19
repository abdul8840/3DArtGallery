import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).delete(protect, clearCart);

router.post('/items', protect, addToCart);
router
  .route('/items/:productId')
  .put(protect, updateCartItem)
  .delete(protect, removeFromCart);

router.post('/coupon', protect, applyCoupon);
router.delete('/coupon', protect, removeCoupon);

export default router;