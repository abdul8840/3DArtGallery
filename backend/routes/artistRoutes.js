import express from 'express';
import {
  getArtists,
  getArtistBySlug,
  createArtist,
  updateArtist,
  deleteArtist,
} from '../controllers/artistController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { uploadSingle } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router
  .route('/')
  .get(getArtists)
  .post(protect, authorize('admin'), uploadSingle, createArtist);

router.route('/:slug').get(getArtistBySlug);

router
  .route('/id/:id')
  .put(protect, authorize('admin'), uploadSingle, updateArtist)
  .delete(protect, authorize('admin'), deleteArtist);

export default router;