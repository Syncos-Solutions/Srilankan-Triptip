"use client";
// app/contact/page.tsx
import ContactSection from '@/components/ContactSection';

import FaqSection from '@/components/FaqSection';
import AdventureFooter from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useEffect, useState } from 'react';

export default function ContactPage() {
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
    <>
      <main className="bg-[#e8e4df] min-h-screen">
        <Navbar
        isIntro={false}
        isMenuOpen={isMenuOpen}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
      />

        <ContactSection />
        
        <FaqSection />
        <AdventureFooter />
      </main>
    </>
  );
}