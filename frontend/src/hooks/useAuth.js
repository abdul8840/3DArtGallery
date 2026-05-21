import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token, isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  return {
    user,
    token,
    isAuthenticated,
    loading,
    isAdmin: user?.role === 'admin',
    isArtist: user?.role === 'artist',
    isUser: user?.role === 'user',
  };
};

export default useAuth;