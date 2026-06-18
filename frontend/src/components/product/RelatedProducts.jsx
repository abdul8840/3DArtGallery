import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRelatedProducts } from '@store/slices/productSlice';
import ProductCard from './ProductCard';
import Loader from '@components/common/Loader';

const RelatedProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const { relatedProducts, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (productId) {
      dispatch(fetchRelatedProducts(productId));
    }
  }, [dispatch, productId]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="md" />
      </div>
    );
  }

  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <h2 className="text-3xl font-display font-bold text-gray-900 mb-8">
        You May Also Like
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;