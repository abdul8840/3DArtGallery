import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: [
        { path: 'artist', select: 'name slug' },
        { path: 'category', select: 'name slug' },
      ],
    });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      data: wishlist,
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Add item to wishlist
// @route   POST /api/wishlist
// @access  Private
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check if product exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    // Check if item already exists
    const exists = wishlist.items.some(
      (item) => item.product.toString() === productId
    );

    if (exists) {
      return res.status(400).json({
        success: false,
        message: 'Item already in wishlist',
      });
    }

    wishlist.items.push({ product: productId });
    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: [
        { path: 'artist', select: 'name slug' },
        { path: 'category', select: 'name slug' },
      ],
    });

    res.status(200).json({
      success: true,
      data: wishlist,
      message: 'Item added to wishlist',
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Remove item from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found',
      });
    }

    wishlist.items = wishlist.items.filter(
      (item) => item.product.toString() !== productId
    );

    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: [
        { path: 'artist', select: 'name slug' },
        { path: 'category', select: 'name slug' },
      ],
    });

    res.status(200).json({
      success: true,
      data: wishlist,
      message: 'Item removed from wishlist',
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Clear wishlist
// @route   DELETE /api/wishlist
// @access  Private
export const clearWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found',
      });
    }

    wishlist.items = [];
    await wishlist.save();

    res.status(200).json({
      success: true,
      data: wishlist,
      message: 'Wishlist cleared',
    });
  } catch (error) {
    console.error('Clear wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

// @desc    Toggle wishlist item
// @route   POST /api/wishlist/toggle
// @access  Private
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, items: [] });
    }

    const itemIndex = wishlist.items.findIndex(
      (item) => item.product.toString() === productId
    );

    let message;

    if (itemIndex > -1) {
      wishlist.items.splice(itemIndex, 1);
      message = 'Item removed from wishlist';
    } else {
      wishlist.items.push({ product: productId });
      message = 'Item added to wishlist';
    }

    await wishlist.save();

    wishlist = await Wishlist.findOne({ user: req.user._id }).populate({
      path: 'items.product',
      populate: [
        { path: 'artist', select: 'name slug' },
        { path: 'category', select: 'name slug' },
      ],
    });

    res.status(200).json({
      success: true,
      data: wishlist,
      message,
    });
  } catch (error) {
    console.error('Toggle wishlist error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};