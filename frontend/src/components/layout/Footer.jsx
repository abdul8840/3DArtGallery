import React from 'react';
import { Link } from 'react-router-dom';
import {
  IoLogoInstagram,
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoMailOutline,
  IoCallOutline,
  IoLocationOutline,
} from 'react-icons/io5';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', path: '/about' },
      { name: 'Our Artists', path: '/artists' },
      { name: 'Exhibitions', path: '/exhibitions' },
      { name: 'Press', path: '/press' },
      { name: 'Careers', path: '/careers' },
    ],
    Support: [
      { name: 'Help Center', path: '/help' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'Track Order', path: '/track-order' },
      { name: 'FAQs', path: '/faqs' },
    ],
    Legal: [
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' },
      { name: 'Cookie Policy', path: '/cookies' },
      { name: 'Accessibility', path: '/accessibility' },
    ],
  };

  const socialLinks = [
    { icon: IoLogoInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: IoLogoFacebook, url: 'https://facebook.com', label: 'Facebook' },
    { icon: IoLogoTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: IoLogoLinkedin, url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-gold rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl font-display font-bold">
                  V
                </span>
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-white">
                  Virtual Gallery
                </h2>
                <p className="text-sm text-gray-400">Art Museum</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Experience art like never before in our immersive 3D virtual gallery.
              Discover, collect, and own exceptional artworks from talented artists
              around the world.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <IoMailOutline className="w-5 h-5 text-yellow-500" />
                <span>contact@virtualgallery.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <IoCallOutline className="w-5 h-5 text-yellow-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <IoLocationOutline className="w-5 h-5 text-yellow-500" />
                <span>123 Art Street, New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="hover:text-yellow-500 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {currentYear} Virtual Art Gallery. All rights reserved.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 bg-gray-800 rounded-lg hover:bg-yellow-500 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;