import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { IoHeartOutline, IoHeart, IoCartOutline } from 'react-icons/io5';
import { addToCart } from '@store/slices/cartSlice';
import { toggleWishlist } from '@store/slices/wishlistSlice';
import { useWishlist } from '@hooks/useWishlist';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';

const ProductCard = ({ product, index = 0 }) => {
  const dispatch = useDispatch();
  const { isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    dispatch(toggleWishlist(product._id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card hover padding="none" className="overflow-hidden group h-full flex flex-col">
        {/* Image */}
        <Link to={`/products/${product.slug}`} className="relative block">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <img
              src={getPrimaryImage(product.images)}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isFeatured && (
                <span className="bg-gradient-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured
                </span>
              )}
              {product.stockStatus === 'limited' && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Limited
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
            >
              {inWishlist ? (
                <IoHeart className="w-5 h-5 text-red-500" />
              ) : (
                <IoHeartOutline className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <Button
                fullWidth
                size="sm"
                icon={<IoCartOutline />}
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
              >
                Quick Add
              </Button>
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-display font-semibold text-lg text-gray-900 mb-1 line-clamp-1 hover:text-yellow-600 transition-colors">
              {product.title}
            </h3>
          </Link>
          
          <p className="text-sm text-gray-600 mb-3">
            {product.artist?.name}
          </p>

          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl font-bold text-gray-900">
                {formatCurrency(product.price)}
              </span>
              <span className="text-xs text-gray-500">
                {product.year}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{product.medium}</span>
              <span>
                {product.dimensions?.width} × {product.dimensions?.height} {product.dimensions?.unit}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;