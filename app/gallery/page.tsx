// app/gallery/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import GalleryContent from '@/components/Gallerypage'; // Renamed import to avoid conflict

export default function GalleryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <main className="bg-[#e8e4df] min-h-screen">
      <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

      {/* Now using GalleryContent instead of GalleryPage */}
      <GalleryContent />
      
      <Footer />
    </main>
  );
}