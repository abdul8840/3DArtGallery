import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchWishlist, clearWishlist } from '@store/slices/wishlistSlice';
import WishlistItem from '@components/wishlist/WishlistItem';
import Button from '@components/common/Button';
import Loader from '@components/common/Loader';
import { IoHeartOutline } from 'react-icons/io5';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      dispatch(clearWishlist());
    }
  };

  if (loading) {
    return <Loader fullScreen message="Loading your wishlist..." />;
  }

  const wishlistItems = wishlist?.items || [];

  return (
    <>

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-display font-bold text-gray-900">
                My Wishlist
              </h1>
              {wishlistItems.length > 0 && (
                <button
                  onClick={handleClearWishlist}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
            {wishlistItems.length > 0 && (
              <p className="text-gray-600 mt-2">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
              </p>
            )}
          </div>

          {/* Empty Wishlist */}
          {wishlistItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <IoHeartOutline className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
                Your Wishlist is Empty
              </h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Start adding artworks to your wishlist by clicking the heart icon
                on any artwork you love!
              </p>
              <Link to="/products">
                <Button size="lg">Browse Artworks</Button>
              </Link>
            </motion.div>
          ) : (
            /* Wishlist Items */
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="divide-y divide-gray-200">
                {wishlistItems.map((item) => (
                  <WishlistItem key={item.product._id} item={item} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;