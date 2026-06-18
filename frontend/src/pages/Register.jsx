import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import RegisterForm from '@components/auth/RegisterForm';
import { IoSparklesOutline, IoDiamondOutline, IoShieldCheckmarkOutline } from 'react-icons/io5';

const perks = [
  { icon: IoSparklesOutline, text: 'Immersive 3D virtual gallery experience' },
  { icon: IoDiamondOutline, text: 'Exclusive access to limited-edition artworks' },
  { icon: IoShieldCheckmarkOutline, text: 'Certified originals from verified artists' },
];

const Register = () => (
  <div className="min-h-screen flex bg-white">
    {/* Left panel — navy brand */}
    <div className="hidden lg:flex lg:w-1/2 relative bg-[#020b18] flex-col items-center justify-center p-16 overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#163461]/50 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#2563eb]/15 blur-3xl pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#a8c8f5 1px, transparent 1px), linear-gradient(90deg, #a8c8f5 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 text-center max-w-md"
      >
        <Link to="/" className="inline-flex items-center gap-3 mb-12 group">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-[#2563eb] to-[#0f2447] flex items-center justify-center shadow-[0_8px_24px_rgba(37,99,235,0.4)] group-hover:scale-105 transition-all duration-300">
            <span className="text-white text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>V</span>
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Virtual Gallery</p>
            <p className="text-[#6fa3e8] text-xs tracking-widest uppercase">Art Museum</p>
          </div>
        </Link>

        <h2 className="text-4xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Join 56,000+
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{ backgroundImage: 'linear-gradient(135deg, #60a5fa 0%, #a8c8f5 100%)' }}
          >
            Art Collectors
          </span>
        </h2>
        <p className="text-[#6fa3e8] text-sm leading-relaxed mb-10">
          Create your free account and start building your world-class art collection today.
        </p>

        <ul className="space-y-4 text-left">
          {perks.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 text-sm text-[#6fa3e8]">
              <span className="w-8 h-8 rounded-xl bg-[#2563eb]/20 border border-[#2563eb]/40 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[#60a5fa]" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>

    {/* Right panel — form */}
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-16 bg-white overflow-y-auto">
      <Link to="/" className="lg:hidden flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-linear-to-br from-[#2563eb] to-[#0f2447] flex items-center justify-center shadow-md">
          <span className="text-white text-lg font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>V</span>
        </div>
        <span className="text-[#0a1628] font-bold text-lg" style={{ fontFamily: 'Playfair Display, serif' }}>Virtual Gallery</span>
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <RegisterForm />
      </motion.div>
    </div>
  </div>
);

export default Register;
