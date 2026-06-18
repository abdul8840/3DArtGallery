import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { IoHeartOutline, IoHeart, IoCartOutline, IoEyeOutline } from 'react-icons/io5';
import { addToCart } from '@store/slices/cartSlice';
import { toggleWishlist } from '@store/slices/wishlistSlice';
import { useWishlist } from '@hooks/useWishlist';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';

const ProductCard = ({ product, index = 0 }) => {
  const dispatch = useDispatch();
  const { isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ productId: product._id, quantity: 1 }));
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product._id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="h-full"
    >
      <Link to={`/products/${product.slug}`} className="group block h-full">
        <div className="h-full flex flex-col rounded-2xl overflow-hidden bg-white border border-[#e2e8f0] hover:border-[#a8c8f5] hover:shadow-[0_16px_48px_rgba(15,36,71,0.14)] hover:-translate-y-1.5 transition-all duration-300 card-shine">

          {/* Image area */}
          <div className="relative overflow-hidden bg-[#f8fafc]">
            <div className="aspect-square overflow-hidden">
              <img
                src={getPrimaryImage(product.images)}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600"
                loading="lazy"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isFeatured && (
                <span className="px-2.5 py-1 bg-[#2563eb] text-white text-[10px] font-bold rounded-full tracking-wide shadow-sm">
                  Featured
                </span>
              )}
              {product.stockStatus === 'limited' && (
                <span className="px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold rounded-full tracking-wide shadow-sm">
                  Limited
                </span>
              )}
              {product.stockStatus === 'out_of_stock' && (
                <span className="px-2.5 py-1 bg-[#475569] text-white text-[10px] font-bold rounded-full tracking-wide shadow-sm">
                  Sold Out
                </span>
              )}
            </div>

            {/* Wishlist button */}
            <button
              onClick={handleToggleWishlist}
              className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 hover:scale-110 transition-all duration-200"
              aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              {inWishlist
                ? <IoHeart className="w-4 h-4 text-red-500" />
                : <IoHeartOutline className="w-4 h-4 text-[#0f2447]" />
              }
            </button>

            {/* Bottom action row */}
            <div className="absolute bottom-0 left-0 right-0 p-3 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                disabled={product.stockStatus === 'out_of_stock'}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#0f2447]/90 backdrop-blur-sm text-white text-xs font-bold rounded-xl hover:bg-[#0f2447] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <IoCartOutline className="w-4 h-4" />
                Add to Cart
              </button>
              <div className="flex items-center justify-center w-9 h-9 bg-white/90 backdrop-blur-sm rounded-xl shadow-md">
                <IoEyeOutline className="w-4 h-4 text-[#0f2447]" />
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-4 flex-1 flex flex-col">
            <h3
              className="font-bold text-[#0a1628] text-sm leading-snug line-clamp-2 mb-1 group-hover:text-[#2563eb] transition-colors"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {product.title}
            </h3>

            <p className="text-[#64748b] text-xs mb-3">{product.artist?.name}</p>

            <div className="mt-auto space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0f2447] text-base">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-[#94a3b8] text-xs">{product.year}</span>
              </div>
              {product.medium && (
                <p className="text-[#94a3b8] text-xs truncate">{product.medium}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
