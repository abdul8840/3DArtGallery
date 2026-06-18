import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { IoCartOutline, IoHeartOutline, IoHeart, IoShareSocialOutline, IoCheckmarkCircle } from 'react-icons/io5';
import { addToCart } from '@store/slices/cartSlice';
import { toggleWishlist } from '@store/slices/wishlistSlice';
import { useWishlist } from '@hooks/useWishlist';
import Button from '@components/common/Button';
import { formatCurrency, getStockLabel } from '@utils/helpers';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const { isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product._id, quantity }));
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product._id));
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: `Check out ${product.title} by ${product.artist?.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Artist */}
      <div>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-3">
          {product.title}
        </h1>
        <p className="text-xl text-gray-600">
          by{' '}
          <span className="font-semibold text-gray-900">
            {product.artist?.name}
          </span>
        </p>
      </div>

      {/* Price & Stock */}
      <div className="flex items-center justify-between py-6 border-y border-gray-200">
        <div>
          <span className="text-4xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="ml-3 text-xl text-gray-400 line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
        <div className="text-right">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
              product.stockStatus === 'in_stock'
                ? 'bg-green-100 text-green-800'
                : product.stockStatus === 'limited'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {getStockLabel(product)}
          </span>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        <DetailItem label="Medium" value={product.medium} />
        <DetailItem label="Year" value={product.year} />
        <DetailItem
          label="Dimensions"
          value={`${product.dimensions?.width} × ${product.dimensions?.height} ${product.dimensions?.unit}`}
        />
        <DetailItem label="Category" value={product.category?.name} />
      </div>

      {/* Features */}
      <div className="bg-gray-50 rounded-xl p-6 space-y-3">
        <Feature text="Certificate of Authenticity included" />
        <Feature text="Free worldwide shipping on orders over $500" />
        <Feature text="30-day money-back guarantee" />
        {product.framed && <Feature text="Professionally framed" />}
      </div>

      {/* Quantity Selector */}
      {product.stockStatus !== 'out_of_stock' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity
          </label>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 text-center border border-gray-300 rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              min="1"
              max={product.stock}
            />
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button
          fullWidth
          size="lg"
          icon={<IoCartOutline />}
          onClick={handleAddToCart}
          disabled={product.stockStatus === 'out_of_stock'}
        >
          {product.stockStatus === 'out_of_stock' ? 'Out of Stock' : 'Add to Cart'}
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            icon={inWishlist ? <IoHeart className="text-red-500" /> : <IoHeartOutline />}
            onClick={handleToggleWishlist}
          >
            {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </Button>
          <Button
            variant="outline"
            fullWidth
            icon={<IoShareSocialOutline />}
            onClick={handleShare}
          >
            Share
          </Button>
        </div>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-xl font-display font-bold text-gray-900 mb-3">
          About this Artwork
        </h3>
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
      </div>

      {/* Artist Bio */}
      {product.artist?.bio && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="text-lg font-display font-bold text-gray-900 mb-3">
            About the Artist
          </h3>
          <p className="text-gray-600 leading-relaxed">{product.artist.bio}</p>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <span className="block text-sm text-gray-500 mb-1">{label}</span>
    <span className="block font-semibold text-gray-900">{value}</span>
  </div>
);

const Feature = ({ text }) => (
  <div className="flex items-center space-x-2">
    <IoCheckmarkCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
    <span className="text-sm text-gray-700">{text}</span>
  </div>
);

export default ProductInfo;