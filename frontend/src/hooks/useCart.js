import { useSelector } from 'react-redux';

export const useCart = () => {
  const { cart, loading } = useSelector((state) => state.cart);

  const cartItemCount = cart?.totalItems || 0;
  const cartTotal = cart?.finalPrice || 0;
  const cartItems = cart?.items || [];

  return {
    cart,
    cartItems,
    cartItemCount,
    cartTotal,
    loading,
  };
};

export default useCart;