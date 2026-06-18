import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchProducts, setFilters, clearFilters } from '@store/slices/productSlice';
import ProductGrid from '@components/product/ProductGrid';
import ProductFilters from '@components/product/ProductFilters';
import ProductSort from '@components/product/ProductSort';
import ProductSearch from '@components/product/ProductSearch';
import Button from '@components/common/Button';
import { IoGridOutline, IoList, IoFunnelOutline, IoClose } from 'react-icons/io5';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, total, pages, filters } = useSelector((s) => s.product);
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    const urlFilters = {
      search: searchParams.get('search') || '',
      category: searchParams.get('category') || '',
      artist: searchParams.get('artist') || '',
      minPrice: searchParams.get('minPrice') || '',
      maxPrice: searchParams.get('maxPrice') || '',
      sort: searchParams.get('sort') || 'createdAt',
    };
    dispatch(setFilters(urlFilters));
  }, [searchParams, dispatch]);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page: currentPage, limit: 12 }));
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => { if (v) params.set(k, v); });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">

      {/* Hero Banner */}
      <section className="bg-[#0a1628] relative overflow-hidden py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-96 h-96 rounded-full bg-[#163461]/40 blur-3xl" />
          <div className="absolute -bottom-10 right-1/4 w-72 h-72 rounded-full bg-[#2563eb]/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'linear-gradient(#a8c8f5 1px, transparent 1px), linear-gradient(90deg, #a8c8f5 1px, transparent 1px)',
              backgroundSize: '50px 50px',
            }}
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-[#60a5fa] text-xs font-bold tracking-widest uppercase mb-3">Our Collection</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Discover Exceptional Artworks
            </h1>
            <p className="text-[#6fa3e8] text-base max-w-xl mx-auto">
              {total > 0
                ? `Explore our curated collection of ${total.toLocaleString()} artworks from talented artists worldwide`
                : 'Explore our curated collection of artworks from talented artists worldwide'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-4 lg:gap-8">

          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-28">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">

            {/* Toolbar */}
            <div className="mb-6 space-y-3">
              <ProductSearch
                onSearch={(q) => handleFilterChange({ ...filters, search: q })}
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Mobile filter button */}
                  <button
                    onClick={() => setFilterDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] hover:border-[#a8c8f5] rounded-xl text-sm font-semibold text-[#0f2447] transition-all shadow-sm"
                  >
                    <IoFunnelOutline className="w-4 h-4" />
                    Filters
                  </button>

                  <p className="text-sm text-[#64748b]">
                    Showing{' '}
                    <span className="font-bold text-[#0f2447]">{products.length}</span>
                    {' '}of{' '}
                    <span className="font-bold text-[#0f2447]">{total}</span>
                    {' '}results
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <ProductSort value={filters.sort} onChange={(s) => handleFilterChange({ ...filters, sort: s })} />

                  {/* View toggle */}
                  <div className="hidden sm:flex items-center bg-white border border-[#e2e8f0] rounded-xl p-1 gap-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#0f2447] text-white shadow-sm' : 'text-[#64748b] hover:bg-[#f1f5f9]'}`}
                    >
                      <IoGridOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#0f2447] text-white shadow-sm' : 'text-[#64748b] hover:bg-[#f1f5f9]'}`}
                    >
                      <IoList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <ProductGrid products={products} loading={loading} />

            {/* Pagination */}
            {pages > 1 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>

                  {[...Array(pages)].map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === pages || (p >= currentPage - 1 && p <= currentPage + 1)) {
                      return (
                        <button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                            currentPage === p
                              ? 'bg-[#0f2447] text-white shadow-[0_4px_12px_rgba(15,36,71,0.3)]'
                              : 'bg-white border border-[#e2e8f0] text-[#475569] hover:border-[#a8c8f5] hover:text-[#0f2447]'
                          }`}
                        >
                          {p}
                        </button>
                      );
                    }
                    if (p === currentPage - 2 || p === currentPage + 2) {
                      return <span key={p} className="text-[#94a3b8] px-1">…</span>;
                    }
                    return null;
                  })}

                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === pages}
                  >
                    Next
                  </Button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {filterDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setFilterDrawerOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-white z-50 overflow-y-auto shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-[#e2e8f0] sticky top-0 bg-white">
                <h3 className="font-bold text-[#0a1628] text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Filters</h3>
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="p-2 rounded-xl hover:bg-[#f1f5f9] text-[#64748b] transition-colors"
                >
                  <IoClose className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5">
                <ProductFilters
                  filters={filters}
                  onFilterChange={(f) => { handleFilterChange(f); setFilterDrawerOpen(false); }}
                  onClear={() => { handleClearFilters(); setFilterDrawerOpen(false); }}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Products;
