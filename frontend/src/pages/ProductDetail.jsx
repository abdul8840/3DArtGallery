import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  fetchProductBySlug,
  clearCurrentProduct,
} from '@store/slices/productSlice';
import { useAuth } from '@hooks/useAuth';
import ImageGallery from '@components/product/ImageGallery';
import ProductInfo from '@components/product/ProductInfo';
import ReviewList from '@components/product/ReviewList';
import ReviewForm from '@components/product/ReviewForm';
import RelatedProducts from '@components/product/RelatedProducts';
import Loader from '@components/common/Loader';
import Button from '@components/common/Button';
import { IoArrowBack, IoStar } from 'react-icons/io5';

const ProductDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { currentProduct: product, loading } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductBySlug(slug));
    }

    return () => {
      dispatch(clearCurrentProduct());
    };
  }, [dispatch, slug]);

  if (loading) {
    return <Loader fullScreen message="Loading artwork details..." />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-4">
            Artwork Not Found
          </h2>
          <Button onClick={() => navigate('/products')}>
            Browse All Artworks
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.title} by {product.artist?.name} | Virtual Art Gallery</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.images?.[0]?.url} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <IoArrowBack className="w-5 h-5" />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ImageGallery images={product.images} />
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <ProductInfo product={product} />
            </motion.div>
          </div>

          {/* Additional Information Tabs */}
          <div className="mt-20">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button className="border-b-2 border-yellow-500 pb-4 text-gray-900 font-semibold">
                  Reviews ({product.reviews?.length || 0})
                </button>
              </nav>
            </div>

            <div className="py-12">
              {/* Reviews Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  {/* Rating Summary */}
                  {product.ratings?.count > 0 && (
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900 mb-2">
                            {product.ratings.average.toFixed(1)}
                          </div>
                          <div className="flex items-center justify-center mb-1">
                            {[...Array(5)].map((_, i) => (
                              <IoStar
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.round(product.ratings.average)
                                    ? 'text-yellow-500'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">
                            {product.ratings.count} reviews
                          </p>
                        </div>

                        <div className="flex-1">
                          {[5, 4, 3, 2, 1].map((rating) => {
                            const count = product.reviews?.filter(
                              (r) => r.rating === rating
                            ).length || 0;
                            const percentage = product.ratings.count
                              ? (count / product.ratings.count) * 100
                              : 0;

                            return (
                              <div
                                key={rating}
                                className="flex items-center space-x-3 mb-2"
                              >
                                <span className="text-sm text-gray-600 w-8">
                                  {rating}★
                                </span>
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 w-8">
                                  {count}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review List */}
                  <ReviewList reviews={product.reviews} />
                </div>

                {/* Review Form */}
                <div>
                  {isAuthenticated ? (
                    <ReviewForm productId={product._id} />
                  ) : (
                    <div className="bg-gray-50 rounded-xl p-6 text-center">
                      <p className="text-gray-600 mb-4">
                        Sign in to write a review
                      </p>
                      <Button onClick={() => navigate('/login')}>
                        Sign In
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts productId={product._id} />
        </div>
      </div>
    </>
  );
};

export default ProductDetail;