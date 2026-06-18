import React, { useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { debounce } from '@utils/helpers';

const ProductSearch = ({ onSearch, placeholder = "Search artworks..." }) => {
  const [query, setQuery] = useState('');

  const debouncedSearch = React.useMemo(
    () => debounce((value) => onSearch(value), 500),
    [onSearch]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <div className="relative flex-1 max-w-md">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
      />
      <IoSearchOutline className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
};

export default ProductSearch;