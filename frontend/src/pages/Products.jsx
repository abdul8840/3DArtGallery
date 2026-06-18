import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchProducts, setFilters, clearFilters } from '@store/slices/productSlice';
import ProductGrid from '@components/product/ProductGrid';
import ProductFilters from '@components/product/ProductFilters';
import ProductSort from '@components/product/ProductSort';
import ProductSearch from '@components/product/ProductSearch';
import Button from '@components/common/Button';
import { IoGridOutline, IoList } from 'react-icons/io5';

const Products = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, loading, total, page, pages, filters } = useSelector(
    (state) => state.product
  );
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);

  // Initialize filters from URL params
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

  // Fetch products when filters change
  useEffect(() => {
    const params = {
      ...filters,
      page: currentPage,
      limit: 12,
    };
    dispatch(fetchProducts(params));
  }, [dispatch, filters, currentPage]);

  const handleFilterChange = (newFilters) => {
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
    
    // Update URL params
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    setCurrentPage(1);
    setSearchParams({});
  };

  const handleSearch = (query) => {
    handleFilterChange({ ...filters, search: query });
  };

  const handleSortChange = (sort) => {
    handleFilterChange({ ...filters, sort });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>

      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Discover Exceptional Artworks
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Explore our curated collection of {total} artworks from talented
                artists around the world
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-4 lg:gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClear={handleClearFilters}
              />
            </div>

            {/* Products Section */}
            <div className="lg:col-span-3">
              {/* Search & Controls */}
              <div className="mb-6 space-y-4">
                <ProductSearch onSearch={handleSearch} />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Results Count */}
                  <p className="text-gray-600">
                    Showing{' '}
                    <span className="font-semibold">
                      {products.length} of {total}
                    </span>{' '}
                    results
                  </p>

                  {/* Sort & View Mode */}
                  <div className="flex items-center gap-3">
                    <ProductSort value={filters.sort} onChange={handleSortChange} />

                    {/* View Mode Toggle */}
                    <div className="hidden sm:flex items-center border border-gray-300 rounded-lg p-1">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${
                          viewMode === 'grid'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IoGridOutline className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${
                          viewMode === 'list'
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <IoList className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid */}
              <ProductGrid products={products} loading={loading} />

              {/* Pagination */}
              {pages > 1 && (
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    {[...Array(pages)].map((_, index) => {
                      const pageNumber = index + 1;
                      // Show first page, last page, current page, and pages around current
                      if (
                        pageNumber === 1 ||
                        pageNumber === pages ||
                        (pageNumber >= currentPage - 1 &&
                          pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 rounded-lg font-medium transition-all ${
                              currentPage === pageNumber
                                ? 'bg-gradient-gold text-white'
                                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber}>...</span>;
                      }
                      return null;
                    })}

                    <Button
                      variant="outline"
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
      </div>
    </>
  );
};

export default Products;