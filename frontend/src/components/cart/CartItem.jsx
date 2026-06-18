import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { IoTrashOutline, IoAdd, IoRemove } from 'react-icons/io5';
import { updateCartItem, removeFromCart } from '@store/slices/cartSlice';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateCartItem({
        productId: item.product._id,
        quantity: newQuantity,
      })
    );
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product._id));
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
        <p className="text-sm text-gray-500">
          {item.product.dimensions?.width} × {item.product.dimensions?.height}{' '}
          {item.product.dimensions?.unit}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
        >
          <IoRemove className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
          className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <IoAdd className="w-4 h-4" />
        </button>
      </div>

      {/* Price */}
      <div className="text-right">
        <p className="font-bold text-gray-900 text-lg">
          {formatCurrency(item.subtotal)}
        </p>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.price)} each
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
      >
        <IoTrashOutline className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CartItem;