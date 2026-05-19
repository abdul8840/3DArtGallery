import express from 'express';
import {
  getCategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadSingle } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getCategories)
  .post(protect, authorize('admin'), uploadSingle, createCategory);

router.route('/:slug').get(getCategoryBySlug);

router
  .route('/id/:id')
  .put(protect, authorize('admin'), uploadSingle, updateCategory)
  .delete(protect, authorize('admin'), deleteCategory);

export default router;