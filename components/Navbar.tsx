// components/Navbar.tsx
'use client';

import React from 'react';
import Link from 'next/link';

// Logo Icon Component
const LogoIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
  >
    <circle cx="14" cy="22" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="14" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="30" cy="22" r="9" stroke="currentColor" strokeWidth="2" />
    <circle cx="22" cy="30" r="9" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// Hamburger Icon Component
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

// Close Icon Component
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

// Menu Items
const menuItems = [
  { label: 'HOME', href: '/', isAccent: false },
  { label: 'TRIPS', href: '/trips', isAccent: false },
  { label: 'STORIES', href: '/stories', isAccent: false },
  { label: 'CONTACT US', href: '/contact', isAccent: false },
  { label: 'BUY TEMPLATE', href: '/buy', isAccent: true },
];

// Types

export interface NavbarProps {
  isIntro: boolean;
  isMenuOpen: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}


const Navbar: React.FC<NavbarProps> = ({
  isIntro,
  isMenuOpen,
  onMenuOpen,
  onMenuClose,
}) => {
  return (
    <>
      {/* Main Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
        <Link
          href="/"
          aria-label="Homepage"
          className={`
            transition-colors duration-700 ease-in-out
            ${isIntro ? 'text-white' : 'text-gray-900'}
            hover:opacity-80
          `}
        >
          <LogoIcon />
        </Link>

        <button
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          className={`
            p-2 -mr-2 transition-colors duration-700 ease-in-out
            ${isIntro ? 'text-white hover:text-white/70' : 'text-gray-900 hover:text-gray-500'}
          `}
        >
          <HamburgerIcon />
        </button>
      </nav>

      {/* Full-screen Menu Overlay */}
      <div
        className={`
          fixed inset-0 z-50 bg-white
          flex flex-col
          transition-all duration-500 ease-in-out
          ${isMenuOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-4'
          }
        `}
      >
        {/* Overlay Header */}
        <div className="flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 lg:px-12 lg:py-8">
          <Link
            href="/"
            aria-label="Homepage"
            onClick={onMenuClose}
            className="text-gray-900 hover:opacity-80 transition-opacity"
          >
            <LogoIcon />
          </Link>

          <button
            onClick={onMenuClose}
            aria-label="Close navigation menu"
            className="p-2 -mr-2 text-gray-900 hover:text-gray-500 transition-colors"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Centered Menu Items */}
        <div className="flex-1 flex items-center justify-center">
          <ul className="flex flex-col items-center gap-5 sm:gap-6 lg:gap-8">
            {menuItems.map((item, index) => (
              <li
                key={item.label}
                style={{
                  transitionDelay: isMenuOpen ? `${index * 75}ms` : '0ms',
                }}
                className={`
                  transition-all duration-500 ease-out
                  ${isMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                  }
                `}
              >
                <Link
                  href={item.href}
                  onClick={onMenuClose}
                  className={`
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                    font-bold tracking-wide
                    transition-colors duration-300
                    ${item.isAccent
                      ? 'text-[#ff5b3b] hover:text-[#e04a2d]'
                      : 'text-gray-900 hover:text-gray-400'
                    }
                  `}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;