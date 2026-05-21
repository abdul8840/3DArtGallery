import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '@store/slices/productSlice';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import Loader from '@components/common/Loader';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';
import {
  IoArrowForwardOutline,
  IoSparklesOutline,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
} from 'react-icons/io5';

const Home = () => {
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const features = [
    {
      icon: IoSparklesOutline,
      title: '3D Virtual Gallery',
      description: 'Experience art in an immersive 3D environment with realistic lighting and interactions',
    },
    {
      icon: IoShieldCheckmarkOutline,
      title: 'Authenticated Artworks',
      description: 'All artworks come with certificates of authenticity from verified artists',
    },
    {
      icon: IoRocketOutline,
      title: 'Global Delivery',
      description: 'Free worldwide shipping on all orders over $500 with secure packaging',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1920')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
              Experience Art in
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-gold">
                Virtual Reality
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Step into our immersive 3D gallery and discover exceptional artworks
              from talented artists around the world
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                onClick={() => window.location.href = '/gallery'}
                icon={<IoSparklesOutline />}
              >
                Enter 3D Gallery
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => window.location.href = '/products'}
                className="!text-white !border-white hover:!bg-white hover:!text-gray-900"
              >
                Browse Artworks
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              Why Choose Virtual Gallery
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge technology with exceptional artworks to deliver
              an unparalleled art buying experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card hover className="text-center h-full">
                  <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-2">
                Featured Artworks
              </h2>
              <p className="text-xl text-gray-600">
                Curated collection of exceptional pieces
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" icon={<IoArrowForwardOutline />}>
                View All
              </Button>
            </Link>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" message="Loading featured artworks..." />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 8).map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={`/products/${product.slug}`}>
                    <Card hover padding="none" className="overflow-hidden group">
                      <div className="relative aspect-square overflow-hidden bg-gray-100">
                        <img
                          src={getPrimaryImage(product.images)}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {product.isFeatured && (
                          <div className="absolute top-3 right-3 bg-gradient-gold text-white px-3 py-1 rounded-full text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {product.artist?.name}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product.year}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Start Your Collection?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join thousands of art collectors who trust Virtual Gallery for their
              art acquisitions
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="xl"
                onClick={() => window.location.href = '/register'}
              >
                Create Free Account
              </Button>
              <Button
                size="xl"
                variant="outline"
                onClick={() => window.location.href = '/gallery'}
                className="!text-white !border-white hover:!bg-white hover:!text-gray-900"
              >
                Explore Gallery
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-gold rounded-3xl p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Subscribe to our newsletter for exclusive artworks, artist interviews,
              and gallery updates
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="!bg-white !text-yellow-600 hover:!bg-gray-100"
              >
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;