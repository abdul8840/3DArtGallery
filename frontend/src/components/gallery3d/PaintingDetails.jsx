import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoCartOutline, IoHeartOutline, IoShareSocialOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/slices/cartSlice';
import { toggleWishlist } from '@store/slices/wishlistSlice';
import Button from '@components/common/Button';
import { formatCurrency } from '@utils/helpers';

const PaintingDetails = ({ product, onClose, isOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!product) return null;

  const handleAddToCart = async () => {
    await dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleToggleWishlist = async () => {
    await dispatch(toggleWishlist(product._id));
  };

  const handleViewDetails = () => {
    navigate(`/products/${product.slug}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full md:w-[500px] z-50 pointer-events-auto"
        >
          {/* Overlay for mobile */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <div className="absolute right-0 top-0 h-full w-full md:w-[500px] bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-xl font-display font-bold">Artwork Details</h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoClose className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Image */}
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
                <img
                  src={product.images?.[0]?.url || '/placeholder.jpg'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Artist */}
              <div>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg text-gray-600">
                  by {product.artist?.name}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between py-4 border-y border-gray-200">
                <span className="text-3xl font-bold text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {product.stockStatus === 'in_stock' ? 'In Stock' : 'Limited'}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3">
                <DetailRow label="Medium" value={product.medium} />
                <DetailRow label="Year" value={product.year} />
                <DetailRow
                  label="Dimensions"
                  value={`${product.dimensions?.width} × ${product.dimensions?.height} ${product.dimensions?.unit}`}
                />
                <DetailRow label="Category" value={product.category?.name} />
              </div>

              {/* Description */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <Button
                  fullWidth
                  size="lg"
                  icon={<IoCartOutline />}
                  onClick={handleAddToCart}
                  disabled={product.stockStatus === 'out_of_stock'}
                >
                  Add to Cart
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    icon={<IoHeartOutline />}
                    onClick={handleToggleWishlist}
                  >
                    Wishlist
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    icon={<IoShareSocialOutline />}
                  >
                    Share
                  </Button>
                </div>

                <Button
                  variant="ghost"
                  fullWidth
                  onClick={handleViewDetails}
                >
                  View Full Details
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between">
    <span className="text-gray-600">{label}</span>
    <span className="font-semibold text-gray-900">{value}</span>
  </div>
);

export default PaintingDetails;