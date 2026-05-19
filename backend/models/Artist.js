import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Artist name is required'],
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    bio: {
      type: String,
      required: [true, 'Artist bio is required'],
      maxlength: [2000, 'Bio cannot exceed 2000 characters'],
    },
    avatar: {
      url: {
        type: String,
        default: 'https://via.placeholder.com/300',
      },
      publicId: String,
    },
    birthYear: {
      type: Number,
      min: 1800,
      max: new Date().getFullYear(),
    },
    nationality: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    socialMedia: {
      instagram: String,
      twitter: String,
      facebook: String,
      linkedin: String,
    },
    specialization: [
      {
        type: String,
        enum: [
          'Abstract',
          'Portrait',
          'Landscape',
          'Contemporary',
          'Modern',
          'Classical',
          'Digital',
          'Photography',
          'Sculpture',
          'Mixed Media',
        ],
      },
    ],
    exhibitions: [
      {
        title: String,
        venue: String,
        year: Number,
        city: String,
        country: String,
      },
    ],
    awards: [
      {
        title: String,
        year: Number,
        organization: String,
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    totalArtworks: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual populate artworks
artistSchema.virtual('artworks', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'artist',
});

// Create slug before saving
artistSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;