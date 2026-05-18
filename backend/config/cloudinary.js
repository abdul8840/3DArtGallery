import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const artworkStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artverse/artworks',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 2000, height: 2000, crop: 'limit', quality: 'auto:best' },
    ],
    format: 'webp',
  },
});

const thumbnailStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artverse/thumbnails',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 800, height: 800, crop: 'fill', quality: 'auto:good' },
    ],
    format: 'webp',
  },
});

const assetStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artverse/assets',
    resource_type: 'raw',
    allowed_formats: ['glb', 'gltf', 'hdr', 'mp3', 'ogg'],
  },
});

const avatarStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'artverse/avatars',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [
      { width: 400, height: 400, crop: 'fill', gravity: 'face', quality: 'auto' },
    ],
    format: 'webp',
  },
});

export const uploadArtwork = multer({
  storage: artworkStorage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  },
});

export const uploadThumbnail = multer({
  storage: thumbnailStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

export const uploadAsset = multer({
  storage: assetStorage,
  limits: { fileSize: 500 * 1024 * 1024 },
});

export const uploadAvatar = multer({
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadMultipleArtworks = multer({
  storage: artworkStorage,
  limits: { fileSize: 50 * 1024 * 1024, files: 10 },
});

export { cloudinary };