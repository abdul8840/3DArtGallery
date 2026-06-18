import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoChevronDown } from 'react-icons/io5';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

const ProductFilters = ({ filters, onFilterChange, onClear }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const categories = [
    'Abstract',
    'Portrait',
    'Landscape',
    'Contemporary',
    'Modern',
    'Classical',
  ];

  const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1000', min: 500, max: 1000 },
    { label: '$1000 - $5000', min: 1000, max: 5000 },
    { label: '$5000+', min: 5000, max: 999999 },
  ];

  const handleApply = () => {
    onFilterChange(localFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setLocalFilters({
      search: '',
      category: '',
      minPrice: '',
      maxPrice: '',
      sort: 'createdAt',
    });
    onClear();
    setIsOpen(false);
  };

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-6 mb-6 last:border-0">
      <h3 className="font-semibold text-gray-900 mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <Button
          fullWidth
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          icon={<IoChevronDown className={isOpen ? 'rotate-180' : ''} />}
        >
          Filters {Object.values(filters).filter(Boolean).length > 0 && `(${Object.values(filters).filter(Boolean).length})`}
        </Button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-display font-bold">Filters</h2>
            {Object.values(filters).filter(Boolean).length > 0 && (
              <button
                onClick={handleClear}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Category Filter */}
          <FilterSection title="Category">
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={localFilters.category === category}
                    onChange={(e) =>
                      setLocalFilters({ ...localFilters, category: e.target.value })
                    }
                    className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                  />
                  <span className="ml-3 text-gray-700 group-hover:text-gray-900">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>

          {/* Price Range */}
          <FilterSection title="Price Range">
            <div className="space-y-2 mb-4">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() =>
                    setLocalFilters({
                      ...localFilters,
                      minPrice: range.min,
                      maxPrice: range.max,
                    })
                  }
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                    localFilters.minPrice === range.min
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min"
                value={localFilters.minPrice}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, minPrice: e.target.value })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={localFilters.maxPrice}
                onChange={(e) =>
                  setLocalFilters({ ...localFilters, maxPrice: e.target.value })
                }
              />
            </div>
          </FilterSection>

          <Button fullWidth onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[80vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-display font-bold">Filters</h2>
                  <button onClick={() => setIsOpen(false)}>
                    <IoClose className="w-6 h-6" />
                  </button>
                </div>

                {/* Same filter content as desktop */}
                <FilterSection title="Category">
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={localFilters.category === category}
                          onChange={(e) =>
                            setLocalFilters({
                              ...localFilters,
                              category: e.target.value,
                            })
                          }
                          className="w-4 h-4 text-yellow-600 border-gray-300 focus:ring-yellow-500"
                        />
                        <span className="ml-3 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>

                <FilterSection title="Price Range">
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={localFilters.minPrice}
                      onChange={(e) =>
                        setLocalFilters({
                          ...localFilters,
                          minPrice: e.target.value,
                        })
                      }
                    />
                    <Input
                      type="number"
                      placeholder="Max"
                      value={localFilters.maxPrice}
                      onChange={(e) =>
                        setLocalFilters({
                          ...localFilters,
                          maxPrice: e.target.value,
                        })
                      }
                    />
                  </div>
                </FilterSection>

                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" fullWidth onClick={handleClear}>
                    Clear
                  </Button>
                  <Button fullWidth onClick={handleApply}>
                    Apply
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilters;