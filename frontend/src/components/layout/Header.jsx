import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IoCartOutline,
  IoHeartOutline,
  IoHeart,
  IoPersonOutline,
  IoSearchOutline,
  IoMenuOutline,
  IoClose,
  IoLogOutOutline,
  IoGridOutline,
  IoReceiptOutline,
  IoChevronDownOutline,
} from 'react-icons/io5';
import { useAuth } from '@hooks/useAuth';
import { useCart } from '@hooks/useCart';
import { useWishlist } from '@hooks/useWishlist';
import { logout } from '@store/slices/authSlice';
import clsx from 'clsx';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useAuth();
  const { cartItemCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 50);
    }
  }, [searchOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: '3D Gallery', path: '/gallery' },
    { name: 'Artworks', path: '/products' },
  ];

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
        scrolled
          ? 'bg-[#0a1628]/97 backdrop-blur-xl shadow-[0_4px_24px_rgba(2,11,24,0.4)] border-b border-[#163461]/60'
          : 'bg-[#0a1628]/85 backdrop-blur-md border-b border-[#163461]/30'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-11 h-11 rounded-xl bg-linear-to-br from-[#2563eb] to-[#0f2447] flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.4)] group-hover:shadow-[0_6px_20px_rgba(37,99,235,0.55)] group-hover:scale-105 transition-all duration-300">
              <span className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                V
              </span>
              <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="hidden sm:block">
              <p className="text-white font-bold text-base leading-tight tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                Virtual Gallery
              </p>
              <p className="text-[#6fa3e8] text-xs font-medium tracking-widest uppercase">
                Art Museum
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={clsx(
                  'relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200',
                  isActive(link.path)
                    ? 'text-white bg-[#163461]'
                    : 'text-[#a8c8f5] hover:text-white hover:bg-[#163461]/60'
                )}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#3b82f6]"
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1">

            {/* Search toggle */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
              aria-label="Search"
            >
              <IoSearchOutline className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link
                to="/wishlist"
                className="relative p-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
                aria-label="Wishlist"
              >
                {wishlistCount > 0 ? (
                  <IoHeart className="w-5 h-5 text-red-400" />
                ) : (
                  <IoHeartOutline className="w-5 h-5" />
                )}
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1 shadow-sm"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
              aria-label="Cart"
            >
              <IoCartOutline className="w-5 h-5" />
              {cartItemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-[#2563eb] text-white text-[10px] font-bold rounded-full min-w-4.5 h-4.5 flex items-center justify-center px-1 shadow-sm"
                >
                  {cartItemCount}
                </motion.span>
              )}
            </Link>

            {/* User Menu (Desktop) */}
            {isAuthenticated ? (
              <div className="hidden lg:block relative" ref={userMenuRef}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 pl-2 pr-3 py-2 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
                >
                  <div className="w-7 h-7 rounded-lg bg-[#2563eb] flex items-center justify-center text-white text-xs font-bold shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="text-sm font-semibold max-w-20 truncate">{user?.name}</span>
                  <IoChevronDownOutline
                    className={clsx('w-3.5 h-3.5 transition-transform duration-200', userMenuOpen && 'rotate-180')}
                  />
                </button>

                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-[#0f2447] rounded-2xl shadow-[0_16px_48px_rgba(2,11,24,0.5)] border border-[#1d4480] overflow-hidden"
                    >
                      <div className="p-2">
                        <Link
                          to="/profile"
                          className="flex items-center gap-3 px-3 py-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461] rounded-xl text-sm font-medium transition-all duration-150"
                        >
                          <IoPersonOutline className="w-4 h-4" />
                          My Profile
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 px-3 py-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461] rounded-xl text-sm font-medium transition-all duration-150"
                        >
                          <IoReceiptOutline className="w-4 h-4" />
                          My Orders
                        </Link>
                        {user?.role === 'admin' && (
                          <Link
                            to="/admin/dashboard"
                            className="flex items-center gap-3 px-3 py-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461] rounded-xl text-sm font-medium transition-all duration-150"
                          >
                            <IoGridOutline className="w-4 h-4" />
                            Dashboard
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-[#163461] p-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all duration-150"
                        >
                          <IoLogOutOutline className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-sm font-semibold text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="px-4 py-2 text-sm font-semibold text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.5)]"
                >
                  Get Started
                </button>
              </div>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/70 rounded-xl transition-all duration-200"
              aria-label="Menu"
            >
              {mobileOpen ? <IoClose className="w-5 h-5" /> : <IoMenuOutline className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-[#163461]/50"
            >
              <form onSubmit={handleSearch} className="py-4">
                <div className="relative">
                  <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6fa3e8]" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search artworks, artists, styles..."
                    className="w-full bg-[#163461]/60 border border-[#2d5a9e]/50 text-white placeholder:text-[#6fa3e8] pl-12 pr-12 py-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#3b82f6]/50 focus:border-[#3b82f6]/50 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-[#6fa3e8] hover:text-white rounded-lg hover:bg-[#163461] transition-all"
                  >
                    <IoClose className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden border-t border-[#163461]/50 bg-[#0a1628]"
          >
            <div className="px-4 py-5 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className={clsx(
                      'flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200',
                      isActive(link.path)
                        ? 'bg-[#163461] text-white'
                        : 'text-[#a8c8f5] hover:bg-[#163461]/60 hover:text-white'
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="pt-3 border-t border-[#163461]/50 space-y-1">
                {isAuthenticated ? (
                  <>
                    <div className="px-4 py-3 flex items-center gap-3 mb-1">
                      <div className="w-9 h-9 rounded-xl bg-[#2563eb] flex items-center justify-center text-white font-bold text-sm">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="text-white font-semibold text-sm">{user?.name}</p>
                        <p className="text-[#6fa3e8] text-xs">{user?.email}</p>
                      </div>
                    </div>
                    {[
                      { label: 'My Profile', path: '/profile', icon: IoPersonOutline },
                      { label: 'My Orders', path: '/orders', icon: IoReceiptOutline },
                    ].map(({ label, path, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        className="flex items-center gap-3 px-4 py-3 text-[#a8c8f5] hover:text-white hover:bg-[#163461]/60 rounded-xl text-sm font-medium transition-all"
                      >
                        <Icon className="w-4 h-4" />
                        {label}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all"
                    >
                      <IoLogOutOutline className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-1">
                    <Link
                      to="/login"
                      className="flex items-center justify-center px-4 py-3 text-[#a8c8f5] border border-[#2d5a9e] rounded-xl text-sm font-semibold hover:bg-[#163461] hover:text-white transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-4 py-3 text-white bg-[#2563eb] hover:bg-[#1d4ed8] rounded-xl text-sm font-semibold transition-all shadow-[0_4px_12px_rgba(37,99,235,0.35)]"
                    >
                      Get Started — It's Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
