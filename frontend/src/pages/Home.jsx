import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedProducts } from '@store/slices/productSlice';
import { formatCurrency, getPrimaryImage } from '@utils/helpers';
import {
  IoSparklesOutline,
  IoShieldCheckmarkOutline,
  IoRocketOutline,
  IoArrowForwardOutline,
  IoPlayCircleOutline,
  IoStarOutline,
  IoDiamondOutline,
  IoEyeOutline,
} from 'react-icons/io5';

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] } }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

/* ─── Floating orb ─── */
const Orb = ({ className, delay = 0 }) => (
  <motion.div
    className={className}
    animate={{ y: [0, -18, 0], scale: [1, 1.04, 1] }}
    transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
  />
);

/* ─── Feature card data ─── */
const features = [
  {
    icon: IoSparklesOutline,
    title: '3D Virtual Gallery',
    desc: 'Walk through a photorealistic 3D gallery. Experience art with full spatial immersion.',
    color: 'from-[#2563eb] to-[#0f2447]',
    glow: 'rgba(37,99,235,0.3)',
  },
  {
    icon: IoDiamondOutline,
    title: 'Authenticated Originals',
    desc: 'Every artwork ships with a certificate of authenticity directly from the verified artist.',
    color: 'from-[#0f2447] to-[#163461]',
    glow: 'rgba(15,36,71,0.35)',
  },
  {
    icon: IoRocketOutline,
    title: 'Global Delivery',
    desc: 'Complimentary worldwide shipping on all orders over $500 — insured & gallery-packed.',
    color: 'from-[#163461] to-[#2563eb]',
    glow: 'rgba(22,52,97,0.35)',
  },
];

/* ─── Stats ─── */
const stats = [
  { value: '12K+', label: 'Artworks' },
  { value: '840+', label: 'Artists' },
  { value: '56K+', label: 'Collectors' },
  { value: '98%', label: 'Satisfaction' },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { featuredProducts, loading } = useSelector((state) => state.product);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 100]);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">

      {/* ═══════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020b18]">

        {/* Animated background orbs */}
        <Orb
          delay={0}
          className="absolute top-1/4 -left-32 w-125 h-125 rounded-full bg-[#0f2447]/60 blur-3xl pointer-events-none"
        />
        <Orb
          delay={2}
          className="absolute bottom-1/4 -right-32 w-150 h-150 rounded-full bg-[#163461]/50 blur-3xl pointer-events-none"
        />
        <Orb
          delay={4}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none"
        />

        {/* Grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(#a8c8f5 1px, transparent 1px), linear-gradient(90deg, #a8c8f5 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Hero content */}
        <motion.div style={{ y: heroY }} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2d5a9e]/60 bg-[#0f2447]/60 text-[#60a5fa] text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-pulse" />
              Now with AI-powered curation
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Where Art Meets
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a8c8f5 50%, #ffffff 100%)' }}
              >
                Infinity
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg md:text-xl text-[#6fa3e8] max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Step into our immersive 3D gallery. Discover, collect, and own exceptional
              artworks from the world's most talented artists.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                to="/gallery"
                className="group flex items-center gap-2.5 px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-base rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_12px_40px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
              >
                <IoSparklesOutline className="w-5 h-5" />
                Enter 3D Gallery
                <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="group flex items-center gap-2.5 px-8 py-4 text-white border border-[#2d5a9e]/70 hover:border-[#3b82f6] hover:bg-[#0f2447]/60 font-semibold text-base rounded-2xl transition-all duration-300 backdrop-blur-sm"
              >
                <IoEyeOutline className="w-5 h-5" />
                Browse Artworks
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#163461]/40 rounded-2xl overflow-hidden border border-[#1d4480]/40"
            >
              {stats.map(({ value, label }) => (
                <div key={label} className="px-6 py-5 bg-[#020b18]/60 backdrop-blur-sm text-center">
                  <p className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {value}
                  </p>
                  <p className="text-xs text-[#6fa3e8] font-medium tracking-widest uppercase mt-1">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[#475569] text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-[#2563eb] to-transparent" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURES SECTION
      ═══════════════════════════════════════ */}
      <section className="py-28 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-[#2563eb] text-xs font-bold tracking-widest uppercase mb-3">
              Why Virtual Gallery
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl font-bold text-[#0a1628] mb-4"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Art Collecting, Reinvented
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="text-[#64748b] text-lg max-w-xl mx-auto">
              We combine cutting-edge 3D technology with an unrivalled collection to
              deliver a truly exceptional art buying experience.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {features.map(({ icon: Icon, title, desc, color, glow }, i) => (
              <motion.div key={i} variants={fadeUp} custom={i}>
                <div
                  className="group relative h-full rounded-2xl bg-white border border-[#e2e8f0] p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(2,11,24,0.12)] hover:border-[#a8c8f5] card-shine"
                  style={{ '--glow': glow }}
                >
                  <div
                    className={`w-14 h-14 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    style={{ boxShadow: `0 8px 24px ${glow}` }}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0a1628] mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {title}
                  </h3>
                  <p className="text-[#64748b] text-sm leading-relaxed">{desc}</p>

                  {/* Hover corner accent */}
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full bg-linear-to-tl from-[#eef5ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALLERY PREVIEW (3D CTA)
      ═══════════════════════════════════════ */}
      <section className="py-28 bg-[#0a1628] relative overflow-hidden">
        <Orb
          delay={1}
          className="absolute -top-20 right-0 w-125 h-125 rounded-full bg-[#163461]/50 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
            >
              <motion.p variants={fadeUp} className="text-[#60a5fa] text-xs font-bold tracking-widest uppercase mb-3">
                Immersive Experience
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Walk Through
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a8c8f5 100%)' }}
                >
                  Our 3D Gallery
                </span>
              </motion.h2>
              <motion.p variants={fadeUp} custom={2} className="text-[#6fa3e8] text-base leading-relaxed mb-10">
                Use WASD controls to walk through a meticulously crafted virtual gallery.
                View artwork details up close, see lighting interact with each piece, and
                purchase directly from within the experience.
              </motion.p>
              <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/gallery"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold rounded-2xl transition-all duration-300 shadow-[0_8px_24px_rgba(37,99,235,0.4)] hover:shadow-[0_12px_36px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
                >
                  <IoPlayCircleOutline className="w-5 h-5" />
                  Launch Gallery
                  <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              {/* Feature list */}
              <motion.ul variants={fadeUp} custom={4} className="mt-8 space-y-3">
                {['First-person WASD navigation', 'Interactive artwork details', 'Real-time 3D lighting', 'Purchase without leaving the gallery'].map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-[#6fa3e8]">
                    <span className="w-5 h-5 rounded-full bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center shrink-0">
                      <IoShieldCheckmarkOutline className="w-3 h-3 text-[#60a5fa]" />
                    </span>
                    {f}
                  </li>
                ))}
              </motion.ul>
            </motion.div>

            {/* Gallery visual preview */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden border border-[#1d4480]/50 shadow-[0_32px_80px_rgba(2,11,24,0.6)]">
                <div className="aspect-video bg-linear-to-br from-[#0f2447] via-[#163461] to-[#0a1628] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-2xl bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center mx-auto mb-4 animate-pulse">
                      <IoSparklesOutline className="w-10 h-10 text-[#60a5fa]" />
                    </div>
                    <p className="text-[#6fa3e8] text-sm font-medium">3D Gallery Preview</p>
                    <p className="text-[#475569] text-xs mt-1">Click Launch to enter</p>
                  </div>
                </div>
                {/* Corner badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 bg-[#2563eb] rounded-full text-white text-xs font-bold shadow-lg">
                  LIVE
                  <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-white inline-block animate-pulse" />
                </div>
              </div>

              {/* Floating info cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-[#0f2447] border border-[#1d4480] rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(2,11,24,0.5)]"
              >
                <p className="text-[#6fa3e8] text-xs font-medium mb-1">Artworks Available</p>
                <p className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>12,400+</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                className="absolute -top-6 -right-6 bg-[#0f2447] border border-[#1d4480] rounded-2xl px-5 py-4 shadow-[0_8px_32px_rgba(2,11,24,0.5)]"
              >
                <div className="flex items-center gap-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <IoStarOutline key={i} className="w-3 h-3 text-[#60a5fa] fill-[#60a5fa]" />
                  ))}
                </div>
                <p className="text-white text-sm font-semibold">4.9 / 5 rating</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FEATURED ARTWORKS
      ═══════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
          >
            <div>
              <motion.p variants={fadeUp} className="text-[#2563eb] text-xs font-bold tracking-widest uppercase mb-2">
                Curated Collection
              </motion.p>
              <motion.h2
                variants={fadeUp}
                custom={1}
                className="text-4xl md:text-5xl font-bold text-[#0a1628]"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Featured Artworks
              </motion.h2>
            </div>
            <motion.div variants={fadeUp} custom={2}>
              <Link
                to="/products"
                className="group flex items-center gap-2 text-sm font-semibold text-[#0f2447] hover:text-[#2563eb] transition-colors"
              >
                View all artworks
                <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <div className="aspect-square skeleton" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 skeleton rounded" />
                    <div className="h-3 skeleton rounded w-3/4" />
                    <div className="h-4 skeleton rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.slice(0, 8).map((product, i) => (
                <motion.div key={product._id} variants={fadeUp} custom={i}>
                  <Link to={`/products/${product.slug}`} className="group block">
                    <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] bg-white hover:border-[#a8c8f5] hover:shadow-[0_12px_40px_rgba(15,36,71,0.12)] hover:-translate-y-1.5 transition-all duration-300 card-shine">
                      {/* Image */}
                      <div className="relative aspect-square overflow-hidden bg-[#f8fafc]">
                        <img
                          src={getPrimaryImage(product.images)}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {product.isFeatured && (
                          <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#2563eb] text-white text-xs font-bold rounded-full">
                            Featured
                          </div>
                        )}

                        {/* Quick view overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-[#0f2447] text-xs font-bold rounded-full shadow-lg">
                            <IoEyeOutline className="w-4 h-4" />
                            View Details
                          </span>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-bold text-[#0a1628] text-sm leading-tight line-clamp-1 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          {product.title}
                        </h3>
                        <p className="text-[#64748b] text-xs mb-3">{product.artist?.name}</p>
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-[#0f2447] text-base">
                            {formatCurrency(product.price)}
                          </span>
                          <span className="text-[#94a3b8] text-xs">{product.year}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════ */}
      <section className="py-28 bg-[#0a1628] relative overflow-hidden">
        <Orb
          delay={0}
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-[#163461]/40 blur-3xl pointer-events-none"
        />
        <Orb
          delay={2}
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-[#2563eb]/15 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2d5a9e]/60 bg-[#0f2447]/60 text-[#60a5fa] text-xs font-semibold tracking-widest uppercase mb-8 backdrop-blur-sm">
              <IoDiamondOutline className="w-3.5 h-3.5" />
              Join 56,000+ Collectors
            </motion.div>

            <motion.h2
              variants={fadeUp}
              custom={1}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Start Your Collection
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a8c8f5 100%)' }}
              >
                Today
              </span>
            </motion.h2>

            <motion.p variants={fadeUp} custom={2} className="text-[#6fa3e8] text-lg mb-12 max-w-xl mx-auto">
              Join thousands of collectors who trust Virtual Gallery for authentic,
              investment-worthy artworks.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="group flex items-center gap-2.5 px-9 py-4.5 bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-semibold text-base rounded-2xl transition-all duration-300 shadow-[0_8px_32px_rgba(37,99,235,0.45)] hover:shadow-[0_14px_44px_rgba(37,99,235,0.6)] hover:-translate-y-0.5"
              >
                Create Free Account
                <IoArrowForwardOutline className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2.5 px-9 py-4.5 text-white border border-[#2d5a9e]/70 hover:border-[#3b82f6] hover:bg-[#0f2447]/60 font-semibold text-base rounded-2xl transition-all duration-300"
              >
                <IoPlayCircleOutline className="w-5 h-5" />
                Explore Gallery
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
