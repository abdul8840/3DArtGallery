import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  getRelatedProducts,
  addProductReview,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadFields } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, authorize('admin', 'artist'), uploadFields, createProduct);

router.get('/featured', getFeaturedProducts);

router
  .route('/:slug')
  .get(getProductBySlug);

router
  .route('/id/:id')
  .put(protect, authorize('admin', 'artist'), uploadFields, updateProduct)
  .delete(protect, authorize('admin'), deleteProduct);

router.get('/:id/related', getRelatedProducts);
router.post('/:id/reviews', protect, addProductReview);

export default router;