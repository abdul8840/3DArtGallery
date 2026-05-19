import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity cannot be less than 1'],
          default: 1,
        },
        price: {
          type: Number,
          required: true,
        },
        subtotal: {
          type: Number,
          required: true,
        },
      },
    ],
    totalItems: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    appliedCoupon: {
      code: String,
      discount: Number,
      discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
      },
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate totals before saving
cartSchema.pre('save', function (next) {
  this.totalItems = this.items.reduce((acc, item) => acc + item.quantity, 0);
  this.totalPrice = this.items.reduce((acc, item) => acc + item.subtotal, 0);

  // Apply coupon if exists
  if (this.appliedCoupon) {
    if (this.appliedCoupon.discountType === 'percentage') {
      this.finalPrice =
        this.totalPrice - (this.totalPrice * this.appliedCoupon.discount) / 100;
    } else {
      this.finalPrice = this.totalPrice - this.appliedCoupon.discount;
    }
  } else {
    this.finalPrice = this.totalPrice;
  }

  next();
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;