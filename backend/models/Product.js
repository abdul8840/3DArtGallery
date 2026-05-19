import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Artwork title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',
      required: [true, 'Artist is required'],
      index: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    originalPrice: {
      type: Number,
      min: [0, 'Original price cannot be negative'],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: String,
        alt: String,
        isPrimary: {
          type: Boolean,
          default: false,
        },
      },
    ],
    dimensions: {
      width: {
        type: Number,
        required: true,
      },
      height: {
        type: Number,
        required: true,
      },
      depth: Number,
      unit: {
        type: String,
        enum: ['cm', 'in', 'm', 'mm'],
        default: 'cm',
      },
    },
    medium: {
      type: String,
      required: [true, 'Medium is required'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: [1800, 'Year must be after 1800'],
      max: [new Date().getFullYear(), 'Year cannot be in the future'],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, 'Stock cannot be negative'],
      default: 1,
    },
    stockStatus: {
      type: String,
      enum: ['in_stock', 'out_of_stock', 'limited', 'sold', 'reserved'],
      default: 'in_stock',
    },
    isLimitedEdition: {
      type: Boolean,
      default: false,
    },
    editionNumber: {
      current: Number,
      total: Number,
    },
    meshName: {
      type: String,
      required: [true, 'Mesh name is required for 3D gallery'],
      unique: true,
      trim: true,
      comment: 'Name of the painting mesh in Blender (e.g., painting_1)',
    },
    position3D: {
      x: { type: Number, default: 0 },
      y: { type: Number, default: 0 },
      z: { type: Number, default: 0 },
      rotation: { type: Number, default: 0 },
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    condition: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'restored'],
      default: 'excellent',
    },
    framed: {
      type: Boolean,
      default: false,
    },
    certificate: {
      hasAuthenticity: {
        type: Boolean,
        default: false,
      },
      issuer: String,
      certificateUrl: String,
    },
    shipping: {
      isFreeShipping: {
        type: Boolean,
        default: false,
      },
      weight: Number,
      dimensions: {
        length: Number,
        width: Number,
        height: Number,
      },
      deliveryTime: String,
    },
    ratings: {
      average: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
        name: String,
        rating: {
          type: Number,
          min: 1,
          max: 5,
        },
        comment: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    metaTitle: String,
    metaDescription: String,
    metaKeywords: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for search optimization
productSchema.index({ title: 'text', description: 'text', tags: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: -1 });

// Create slug before saving
productSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') + '-' + Date.now();
  }
  
  // Update stock status based on stock
  if (this.isModified('stock')) {
    if (this.stock === 0) {
      this.stockStatus = 'out_of_stock';
    } else if (this.stock <= 3) {
      this.stockStatus = 'limited';
    } else {
      this.stockStatus = 'in_stock';
    }
  }
  
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;