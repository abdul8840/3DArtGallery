import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '@store/store';
import { useAuth } from '@hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getMe } from '@store/slices/authSlice';
import { fetchCart } from '@store/slices/cartSlice';
import { fetchWishlist } from '@store/slices/wishlistSlice';

// Layout Components
import Header from '@components/layout/Header';
import Footer from '@components/layout/Footer';

// Auth Components
import ProtectedRoute from '@components/auth/ProtectedRoute';

// Pages
import Home from '@pages/Home';
import Login from '@pages/Login';
import Register from '@pages/Register';
import NotFound from '@pages/NotFound';

// Placeholder pages (will be built in Step 3 & 4)
const Gallery3D = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">3D Gallery - Coming in Step 3</h1></div>;
const Products = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Products - Coming in Step 3</h1></div>;
const ProductDetail = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Product Detail - Coming in Step 3</h1></div>;
const Cart = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Cart - Coming in Step 3</h1></div>;
const Checkout = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Checkout - Coming in Step 4</h1></div>;
const Orders = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Orders - Coming in Step 4</h1></div>;
const Wishlist = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Wishlist - Coming in Step 3</h1></div>;
const Profile = () => <div className="min-h-screen flex items-center justify-center"><h1 className="text-4xl font-display">Profile - Coming in Step 4</h1></div>;

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// App initializer component
const AppInitializer = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getMe());
      dispatch(fetchCart());
      dispatch(fetchWishlist());
    }
  }, [isAuthenticated, dispatch]);

  return children;
};

// Main App Layout
const AppLayout = ({ children }) => {
  const location = useLocation();
  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && <Header />}
      <main className={!isAuthPage ? 'flex-1 pt-20' : 'flex-1'}>
        {children}
      </main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

// Main App Component
function AppContent() {
  return (
    <Router>
      <ScrollToTop />
      <AppInitializer>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/gallery" element={<Gallery3D />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetail />} />

            {/* Protected Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </AppInitializer>

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1a1a1a',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            borderRadius: '12px',
            padding: '16px',
          },
        }}
      />
    </Router>
  );
}

// Root App with Redux Provider
function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;