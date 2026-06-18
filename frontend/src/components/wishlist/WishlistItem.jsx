import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoTrashOutline, IoCartOutline } from 'react-icons/io5';
import { removeFromWishlist } from '@store/slices/wishlistSlice';
import { addToCart } from '@store/slices/cartSlice';
import Button from '@components/common/Button';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';

const WishlistItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromWishlist(item.product._id));
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: item.product._id, quantity: 1 }));
  };

  return (
    <div className="flex items-center gap-4 py-6 border-b border-gray-200 last:border-0">
      {/* Image */}
      <Link
        to={`/products/${item.product.slug}`}
        className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
      >
        <img
          src={getPrimaryImage(item.product.images)}
          alt={item.product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform"
        />
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/products/${item.product.slug}`}
          className="block font-semibold text-gray-900 hover:text-yellow-600 transition-colors mb-1"
        >
          {item.product.title}
        </Link>
        <p className="text-sm text-gray-600 mb-2">
          {item.product.artist?.name}
        </p>
        <p className="text-lg font-bold text-gray-900">
          {formatCurrency(item.product.price)}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          icon={<IoCartOutline />}
          onClick={handleAddToCart}
          disabled={item.product.stockStatus === 'out_of_stock'}
        >
          Add to Cart
        </Button>
        <button
          onClick={handleRemove}
          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <IoTrashOutline className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WishlistItem;