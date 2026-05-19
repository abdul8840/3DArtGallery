import Artist from '../models/Artist.js';
import { createUniqueSlug } from '../utils/slugify.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all artists
// @route   GET /api/artists
// @access  Public
export const getArtists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let query = { isActive: true };

    if (req.query.featured === 'true') {
      query.featured = true;
    }

    if (req.query.specialization) {
      query.specialization = req.query.specialization;
    }

    const artists = await Artist.find(query)
      .sort({ featured: -1, totalArtworks: -1 })
      .limit(limit)
      .skip(skip);

    const total = await Artist.countDocuments(query);

    res.status(200).json({
      success: true,
      count: artists.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: artists,
    });
  } catch (error) {
    console.error('Get artists error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single artist
// @route   GET /api/artists/:slug
// @access  Public
export const getArtistBySlug = async (req, res) => {
  try {
    const artist = await Artist.findOne({ slug: req.params.slug }).populate(
      'artworks'
    );

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    res.status(200).json({
      success: true,
      data: artist,
    });
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create artist
// @route   POST /api/artists
// @access  Private/Admin
export const createArtist = async (req, res) => {
  try {
    const { name, bio, birthYear, nationality, specialization, socialMedia } =
      req.body;

    const slug = await createUniqueSlug(Artist, name);

    let avatar = {};
    if (req.file) {
      const result = await uploadToCloudinary(req.file, 'artists');
      avatar = {
        url: result.url,
        publicId: result.publicId,
      };
    }

    const artist = await Artist.create({
      name,
      slug,
      bio,
      avatar,
      birthYear,
      nationality,
      specialization: specialization ? JSON.parse(specialization) : [],
      socialMedia: socialMedia ? JSON.parse(socialMedia) : {},
    });

    res.status(201).json({
      success: true,
      data: artist,
      message: 'Artist created successfully',
    });
  } catch (error) {
    console.error('Create artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update artist
// @route   PUT /api/artists/:id
// @access  Private/Admin
export const updateArtist = async (req, res) => {
  try {
    let artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    if (req.body.name && req.body.name !== artist.name) {
      req.body.slug = await createUniqueSlug(Artist, req.body.name, artist._id);
    }

    if (req.file) {
      if (artist.avatar.publicId) {
        await deleteFromCloudinary(artist.avatar.publicId);
      }
      const result = await uploadToCloudinary(req.file, 'artists');
      req.body.avatar = {
        url: result.url,
        publicId: result.publicId,
      };
    }

    artist = await Artist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: artist,
      message: 'Artist updated successfully',
    });
  } catch (error) {
    console.error('Update artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete artist
// @route   DELETE /api/artists/:id
// @access  Private/Admin
export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);

    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found',
      });
    }

    if (artist.avatar.publicId) {
      await deleteFromCloudinary(artist.avatar.publicId);
    }

    await artist.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Artist deleted successfully',
    });
  } catch (error) {
    console.error('Delete artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};