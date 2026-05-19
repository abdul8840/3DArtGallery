import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlist,
} from '../controllers/wishlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getWishlist).post(protect, addToWishlist).delete(protect, clearWishlist);

router.post('/toggle', protect, toggleWishlist);
router.delete('/:productId', protect, removeFromWishlist);

export default router;