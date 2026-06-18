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
import Gallery3D from '@pages/Gallery3D';
import Products from '@pages/Products';
import ProductDetail from '@pages/ProductDetail';
import Cart from '@pages/Cart';
import Wishlist from '@pages/Wishlist';
import Checkout from '@pages/Checkout';
import PaymentSuccess from '@pages/PaymentSuccess';
import PaymentFailed from '@pages/PaymentFailed';
import Orders from '@pages/Orders';
import OrderDetail from '@pages/OrderDetail';
import Profile from '@pages/Profile';
import Dashboard from '@pages/admin/Dashboard';
import NotFound from '@pages/NotFound';

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
  const is3DGallery = location.pathname === '/gallery';
  const isPaymentPage = ['/payment-success', '/payment-failed'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!isAuthPage && !is3DGallery && !isPaymentPage && <Header />}
      <main className={!isAuthPage && !is3DGallery && !isPaymentPage ? 'flex-1 pt-20' : 'flex-1'}>
        {children}
      </main>
      {!isAuthPage && !is3DGallery && !isPaymentPage && <Footer />}
    </div>
  );
};

// Main App Component
function AppContent() {
  return (
    <>
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
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-failed" element={<PaymentFailed />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/orders/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetail />
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

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute adminOnly>
                    <Dashboard />
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
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </>
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