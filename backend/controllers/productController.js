import Product from '../models/Product.js';
import Category from '../models/Category.js';
import Artist from '../models/Artist.js';
import { createUniqueSlug } from '../utils/slugify.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    // Build query
    let query = { isActive: true };

    // Category filter
    if (req.query.category) {
      query.category = req.query.category;
    }

    // Artist filter
    if (req.query.artist) {
      query.artist = req.query.artist;
    }

    // Price range filter
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = parseFloat(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = parseFloat(req.query.maxPrice);
    }

    // Year filter
    if (req.query.year) {
      query.year = parseInt(req.query.year);
    }

    // Stock status filter
    if (req.query.stockStatus) {
      query.stockStatus = req.query.stockStatus;
    }

    // Search filter
    if (req.query.search) {
      query.$text = { $search: req.query.search };
    }

    // Featured filter
    if (req.query.featured === 'true') {
      query.isFeatured = true;
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // Default: newest first

    if (req.query.sort) {
      switch (req.query.sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'title_asc':
          sortOption = { title: 1 };
          break;
        case 'title_desc':
          sortOption = { title: -1 };
          break;
        case 'popular':
          sortOption = { views: -1, sold: -1 };
          break;
        case 'rating':
          sortOption = { 'ratings.average': -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    }

    const products = await Product.find(query)
      .populate('artist', 'name slug avatar')
      .populate('category', 'name slug')
      .sort(sortOption)
      .limit(limit)
      .skip(skip)
      .lean();

    const total = await Product.countDocuments(query);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      data: products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get single product by slug
// @route   GET /api/products/:slug
// @access  Public
export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate('artist')
      .populate('category')
      .populate('reviews.user', 'name avatar');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Increment views
    product.views += 1;
    await product.save();

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      artist,
      category,
      description,
      price,
      dimensions,
      medium,
      year,
      stock,
      meshName,
      tags,
    } = req.body;

    // Generate unique slug
    const slug = await createUniqueSlug(Product, title);

    // Handle image uploads
    let images = [];
    if (req.files && req.files.images) {
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file, 'artworks');
        images.push({
          url: result.url,
          publicId: result.publicId,
          alt: title,
          isPrimary: images.length === 0,
        });
      }
    }

    const product = await Product.create({
      title,
      slug,
      artist,
      category,
      description,
      price,
      images,
      dimensions: JSON.parse(dimensions),
      medium,
      year,
      stock,
      meshName,
      tags: tags ? JSON.parse(tags) : [],
    });

    // Update artist's total artworks
    await Artist.findByIdAndUpdate(artist, {
      $inc: { totalArtworks: 1 },
    });

    // Update category's product count
    await Category.findByIdAndUpdate(category, {
      $inc: { productCount: 1 },
    });

    const populatedProduct = await Product.findById(product._id)
      .populate('artist')
      .populate('category');

    res.status(201).json({
      success: true,
      data: populatedProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Handle new image uploads
    if (req.files && req.files.images) {
      const newImages = [];
      for (const file of req.files.images) {
        const result = await uploadToCloudinary(file, 'artworks');
        newImages.push({
          url: result.url,
          publicId: result.publicId,
          alt: req.body.title || product.title,
        });
      }
      req.body.images = [...product.images, ...newImages];
    }

    // Update slug if title changed
    if (req.body.title && req.body.title !== product.title) {
      req.body.slug = await createUniqueSlug(Product, req.body.title, product._id);
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate('artist')
      .populate('category');

    res.status(200).json({
      success: true,
      data: product,
      message: 'Product updated successfully',
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete images from Cloudinary
    for (const image of product.images) {
      if (image.publicId) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    // Update artist's total artworks
    await Artist.findByIdAndUpdate(product.artist, {
      $inc: { totalArtworks: -1 },
    });

    // Update category's product count
    await Category.findByIdAndUpdate(product.category, {
      $inc: { productCount: -1 },
    });

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ isFeatured: true, isActive: true })
      .populate('artist', 'name slug')
      .populate('category', 'name slug')
      .limit(8)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    const relatedProducts = await Product.find({
      _id: { $ne: product._id },
      $or: [
        { category: product.category },
        { artist: product.artist },
        { tags: { $in: product.tags } },
      ],
      isActive: true,
    })
      .populate('artist', 'name slug')
      .populate('category', 'name slug')
      .limit(6)
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts,
    });
  } catch (error) {
    console.error('Get related products error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Add product review
// @route   POST /api/products/:id/reviews
// @access  Private
export const addProductReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: 'Product already reviewed',
      });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    product.reviews.push(review);
    product.ratings.count = product.reviews.length;
    product.ratings.average =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      success: true,
      message: 'Review added successfully',
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};