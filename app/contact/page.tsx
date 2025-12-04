"use client";
// app/contact/page.tsx
import ContactSection from '@/components/ContactSection';
import OurTeamSection from '@/components/OurTeamSection';
import FaqSection from '@/components/FaqSection';
import AdventureFooter from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#e8e4df] min-h-screen">
        <Navbar isIntro={false} />

        <ContactSection />
        <OurTeamSection />
        <FaqSection />
        <AdventureFooter />
      </main>
    </>
  );
}