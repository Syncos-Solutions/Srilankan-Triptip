'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// ============================================================================
// ICON COMPONENTS
// ============================================================================
const HamburgerIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon: React.FC = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const InstagramIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YouTubeIcon: React.FC = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const ChevronRightIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ============================================================================
// TYPES & INTERFACES
// ============================================================================
interface NavbarProps {
  isIntro: boolean;
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

// ============================================================================
// MENU ITEMS - Updated Navigation
// ============================================================================
const menuItems = [
  { 
    label: 'Home', 
    href: '/', 
    description: 'Discover the pearl of the Indian Ocean'
  },
  { 
    label: 'About', 
    href: '/about', 
    description: 'Learn about our story and mission'
  },
  { 
    label: 'Tours', 
    href: '/tours', 
    description: 'Curated experiences across Sri Lanka'
  },
  { 
    label: 'Taxi', 
    href: '/taxi', 
    description: 'Comfortable & reliable transportation'
  },
  { 
    label: 'Custom Planning', 
    href: '/custom-planning', 
    description: 'Tailor-made journeys just for you'
  },
  { 
    label: 'Gallery', 
    href: '/gallery', 
    description: 'Visual stories from our adventures'
  },
  { 
    label: 'Blog', 
    href: '/blog', 
    description: 'Travel tips and destination guides'
  },
  { 
    label: 'Contact Us', 
    href: '/contact', 
    description: 'Get in touch with our team'
  },
];

// ============================================================================
// NAVBAR COMPONENT - Enhanced
// ============================================================================
const NavbarTop: React.FC<{
  isIntro: boolean;
  onMenuOpen: () => void;
}> = ({ isIntro, onMenuOpen }) => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
      <Link
        href="/"
        aria-label="Homepage"
        className={`
          transition-all duration-700 ease-in-out
          ${isIntro ? 'text-white' : 'text-gray-900'}
          hover:opacity-80 transform hover:scale-105
        `}
      >
        <Image 
          src="./SLtriptipLogo.svg" 
          className={`
            border transition-all duration-500
            ${isIntro 
              ? 'border-white/30 hover:border-white/60' 
              : 'border-gray-300 hover:border-[#5e17eb]'
            }
            rounded-sm
          `}
          alt="SL Triptip Logo" 
          width={100} 
          height={50} 
        />
      </Link>

      <button
        onClick={onMenuOpen}
        aria-label="Open navigation menu"
        className={`
          p-2 -mr-2 rounded-lg
          transition-all duration-700 ease-in-out
          ${isIntro 
            ? 'text-white hover:text-white/70 hover:bg-white/10' 
            : 'text-gray-900 hover:text-[#5e17eb] hover:bg-[#5e17eb]/5'
          }
        `}
      >
        <HamburgerIcon />
      </button>
    </nav>
  );
};

// ============================================================================
// MENU OVERLAY COMPONENT - Premium Redesign
// ============================================================================
const MenuOverlay: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop with blur */}
      <div
        className={`
          fixed inset-0 z-50 bg-white/95 backdrop-blur-md
          transition-all duration-500 ease-out
          ${isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
        onClick={onClose}
      />

      {/* Menu Content */}
      <div
        className={`
          fixed inset-0 z-50 
          flex flex-col
          transition-all duration-500 ease-out
          pointer-events-none
          ${isOpen 
            ? 'opacity-100 visible' 
            : 'opacity-0 invisible'
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8 pointer-events-auto">
          <Link
            href="/"
            aria-label="Homepage"
            onClick={onClose}
            className="text-gray-900 hover:opacity-80 transition-all duration-300 transform hover:scale-105"
          >
            <Image 
              src="./SLtriptipLogo.svg" 
              alt="SL Triptip Logo" 
              width={100} 
              height={50}
              className="border border-gray-300 hover:border-[#5e17eb] transition-colors duration-300 rounded-sm"
            />
          </Link>

          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 text-gray-900 hover:text-[#5e17eb] hover:bg-[#5e17eb]/5 transition-all duration-300 rounded-lg"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Main Menu Content */}
        <div className="flex-1 overflow-y-auto pointer-events-auto">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 lg:py-12">
            {/* Desktop: Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column - Navigation */}
              <div className="lg:col-span-7">
                <div className="space-y-1 sm:space-y-2">
                  {menuItems.map((item, index) => (
                    <div
                      key={item.label}
                      style={{ 
                        transitionDelay: isOpen ? `${index * 50 + 100}ms` : '0ms' 
                      }}
                      className={`
                        transition-all duration-500 ease-out
                        ${isOpen 
                          ? 'opacity-100 translate-x-0' 
                          : 'opacity-0 -translate-x-8'
                        }
                      `}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="group block py-3 sm:py-4 border-b border-gray-200 hover:border-[#5e17eb]/30 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="text-2xl sm:text-3xl lg:text-3xl xl:text-3xl font-light text-gray-900 group-hover:text-[#5e17eb] transition-colors duration-300 tracking-tight">
                              {item.label}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1 sm:mt-2 group-hover:text-gray-700 transition-colors duration-300">
                              {item.description}
                            </p>
                          </div>
                          <div className="ml-4 text-gray-400 group-hover:text-[#5e17eb] transform group-hover:translate-x-2 transition-all duration-300">
                            <ChevronRightIcon />
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - Featured Content */}
              <div className="lg:col-span-5">
                <div
                  style={{ 
                    transitionDelay: isOpen ? '400ms' : '0ms' 
                  }}
                  className={`
                    sticky top-8 space-y-8
                    transition-all duration-700 ease-out
                    ${isOpen 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-8'
                    }
                  `}
                >
                  {/* Featured Card */}
                  <div className="bg-gradient-to-br from-[#f4f4f4] to-white p-8  border border-gray-200 hover:border-[#5e17eb]/50 transition-all duration-500 hover:shadow-xl">
                    <div className="space-y-4">
                      <div className="inline-block px-3 py-1 bg-[#5e17eb]/10 ">
                        <span className="text-xs font-semibold text-[#5e17eb] uppercase tracking-wider">
                          Special Offer
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900">
                        Start Your Journey Today
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        Experience the magic of Sri Lanka with our expertly curated tours. 
                        Book now and get exclusive discounts on your first adventure.
                      </p>
                      <Link
                        href="/tours"
                        onClick={onClose}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#5e17eb] text-white  hover:bg-[#1800ad] transition-all duration-300 hover:shadow-lg hover:scale-105 transform"
                      >
                        <span className="font-semibold text-sm">Explore Tours</span>
                        <ArrowIcon className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-6">
                    <div>
                      <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Get in Touch
                      </h5>
                      <div className="space-y-2">
                        <a 
                          href="mailto:info@sltriptip.com" 
                          className="block text-sm text-gray-700 hover:text-[#5e17eb] transition-colors duration-300"
                        >
                          info@srilankantriptip.com
                        </a>
                        <a 
                          href="tel:+94123456789" 
                          className="block text-sm text-gray-700 hover:text-[#5e17eb] transition-colors duration-300"
                        >
                          +94 12 345 6789
                        </a>
                      </div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                        Follow Our Journey
                      </h5>
                      <div className="flex gap-3">
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Follow us on Instagram"
                          className="w-10 h-10  border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:bg-[#5e17eb]/5 transition-all duration-300 hover:scale-110 transform"
                        >
                          <InstagramIcon />
                        </a>
                        <a
                          href="https://facebook.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Follow us on Facebook"
                          className="w-10 h-10  border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#1800ad] hover:text-[#1800ad] hover:bg-[#1800ad]/5 transition-all duration-300 hover:scale-110 transform"
                        >
                          <FacebookIcon />
                        </a>
                        <a
                          href="https://youtube.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Subscribe on YouTube"
                          className="w-10 h-10  border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#5e17eb] hover:text-[#5e17eb] hover:bg-[#5e17eb]/5 transition-all duration-300 hover:scale-110 transform"
                        >
                          <YouTubeIcon />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          style={{ 
            transitionDelay: isOpen ? '500ms' : '0ms' 
          }}
          className={`
            border-t border-gray-200 px-5 py-4 sm:px-8 sm:py-5 lg:px-12 pointer-events-auto
            transition-all duration-500 ease-out
            ${isOpen 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
            }
          `}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-gray-500">
              © 2026 Srilankan Triptip. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs">
              <Link 
                href="/privacy" 
                onClick={onClose}
                className="text-gray-500 hover:text-[#5e17eb] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                onClick={onClose}
                className="text-gray-500 hover:text-[#5e17eb] transition-colors duration-300"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================================
// MAIN NAVBAR EXPORT
// ============================================================================
const Navbar: React.FC<NavbarProps> = ({
  isIntro,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
}) => {
  return (
    <>
      <NavbarTop isIntro={isIntro} onMenuOpen={onMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} onClose={onMenuClose} />
    </>
  );
};

export default Navbar;