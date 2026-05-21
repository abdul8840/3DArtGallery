import { useSelector } from 'react-redux';

export const useWishlist = () => {
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  const wishlistItems = wishlist?.items || [];
  const wishlistCount = wishlistItems.length;

  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.product._id === productId);
  };

  return {
    wishlist,
    wishlistItems,
    wishlistCount,
    isInWishlist,
    loading,
  };
};

export default useWishlist;