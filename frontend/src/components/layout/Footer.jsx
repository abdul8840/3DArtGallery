import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
  IoArrowForwardOutline,
} from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Explore: [
      { name: '3D Gallery', path: '/gallery' },
      { name: 'Browse Artworks', path: '/products' },
      { name: 'Featured Artists', path: '/artists' },
      { name: 'Exhibitions', path: '/exhibitions' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns Policy', path: '/returns' },
      { name: 'Track Order', path: '/track-order' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: IoLogoInstagram, url: '#', label: 'Instagram' },
    { icon: IoLogoFacebook, url: '#', label: 'Facebook' },
    { icon: IoLogoTwitter, url: '#', label: 'Twitter' },
    { icon: IoLogoLinkedin, url: '#', label: 'LinkedIn' },
  ];

  const contactItems = [
    { icon: IoMailOutline, text: 'contact@virtualgallery.com' },
    { icon: IoCallOutline, text: '+1 (555) 123-4567' },
    { icon: IoLocationOutline, text: '123 Art Street, New York, NY 10001' },
  ];

  return (
    <footer className="bg-[#020b18] text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#0f2447]/40 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-[#163461]/30 blur-3xl" />
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #2d5a9e, transparent)' }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter Banner */}
        <div className="py-12 border-b border-[#163461]/60">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                Stay in the Loop
              </h3>
              <p className="text-[#6fa3e8] text-sm">
                Exclusive drops, artist spotlights & gallery events — straight to your inbox.
              </p>
            </div>
            <form
              className="flex gap-2 w-full md:w-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 md:w-64 px-4 py-3 bg-[#0f2447] border border-[#2d5a9e]/60 text-white placeholder:text-[#6fa3e8] rounded-xl text-sm focus:outline-none focus:border-[#3b82f6] focus:ring-2 focus:ring-[#3b82f6]/20 transition-all"
              />
              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-[0_4px_12px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_18px_rgba(37,99,235,0.5)] shrink-0"
              >
                Subscribe
                <IoArrowForwardOutline className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="w-11 h-11 rounded-xl bg-linear-to-br from-[#2563eb] to-[#0f2447] flex items-center justify-center shadow-[0_4px_12px_rgba(37,99,235,0.35)] group-hover:shadow-[0_6px_18px_rgba(37,99,235,0.5)] group-hover:scale-105 transition-all duration-300">
                <span className="text-white text-xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>
                  V
                </span>
              </div>
              <div>
                <p className="text-white font-bold text-lg leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Virtual Gallery
                </p>
                <p className="text-[#6fa3e8] text-xs font-medium tracking-widest uppercase">
                  Art Museum
                </p>
              </div>
            </Link>

            <p className="text-[#6fa3e8] text-sm leading-relaxed mb-8 max-w-xs">
              Experience art like never before. Browse, discover, and collect exceptional
              artworks from the world's finest artists in our immersive 3D gallery.
            </p>

            <div className="space-y-3">
              {contactItems.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#6fa3e8]">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2447] border border-[#1d4480] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#3b82f6]" />
                  </div>
                  <span className="hover:text-white transition-colors cursor-default">{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-bold text-sm tracking-widest uppercase mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="group flex items-center gap-1.5 text-sm text-[#6fa3e8] hover:text-white transition-colors duration-200"
                    >
                      <span className="w-0 group-hover:w-3 h-px bg-[#3b82f6] transition-all duration-200 shrink-0" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-[#163461]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#475569] text-sm">
            © {currentYear}{' '}
            <span className="text-[#6fa3e8]">Virtual Art Gallery</span>. All rights reserved.
          </p>

          {/* Social */}
          <div className="flex items-center gap-2">
            {socialLinks.map(({ icon: Icon, url, label }) => (
              <a
                key={label}
                href={url}
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-[#0f2447] border border-[#1d4480] flex items-center justify-center text-[#6fa3e8] hover:text-white hover:bg-[#2563eb] hover:border-[#2563eb] transition-all duration-200 hover:shadow-[0_4px_12px_rgba(37,99,235,0.35)] hover:-translate-y-0.5"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
