'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────
// Intersection Observer Hook
// ─────────────────────────────────────────────
const useInView = (threshold = 0.1) => {
  const [inView, setInView] = useState(false);
  const [fired, setFired] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          setInView(true);
          setFired(true);
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [fired, threshold]);

  return { ref, inView };
};

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const contactMethods = [
  {
    label: 'Call Us',
    value: '+94 77 123 4567',
    sub: 'Available 24/7 for Taxi & Urgent Inquiries',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.95-5.066-4.12-7.016-7.016l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    value: 'journeys@triptip.lk',
    sub: 'For bespoke tour planning & general queries',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Headquarters',
    value: 'Colombo, Sri Lanka',
    sub: '145 Galle Road, Colombo 03',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="square" strokeLinejoin="miter" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="square" strokeLinejoin="miter" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────
// Contact Section Component
// ─────────────────────────────────────────────
const ContactSection: React.FC = () => {
  const heroRef = useInView(0.1);
  const contentRef = useInView(0.1);
  const closingRef = useInView(0.1);

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-[#f4f4f4] overflow-hidden"
      style={{ fontFamily: "'DM Sans', 'Syne', sans-serif" }}
    >
      {/* ── HERO BAND ───────────────────────────── */}
      <div
        ref={heroRef.ref as React.RefObject<HTMLDivElement>}
        className="relative bg-[#e8e4df] px-6 sm:px-10 lg:px-20 pt-24 pb-16 lg:pb-24"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none select-none absolute right-0 top-10 text-[clamp(100px,16vw,200px)] font-black leading-none text-[#f4f4f4] tracking-tighter z-0"
          style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
        >
          CONNECT
        </span>

        <div className="relative z-10 max-w-[1400px] mx-auto">
          <div
            className={`flex items-center gap-3 mb-8 transition-all duration-700 ease-out ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span
              className="text-xs font-bold tracking-[0.35em] uppercase text-[#5e17eb]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Start The Conversation
            </span>
            <div className="h-px w-14 bg-[#5e17eb]" />
          </div>

          <h2
            id="contact-heading"
            className={`text-[clamp(40px,6.5vw,96px)] font-black leading-[0.93] tracking-tighter text-gray-900 mb-0 transition-all duration-700 ease-out delay-100 ${
              heroRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
          >
            Let&apos;s Architect Your
            <br />
            <span
              className="relative inline-block"
              style={{
                background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Sri Lankan Journey.
            </span>
          </h2>
        </div>
      </div>

      {/* ── SPLIT CONTENT BAND (INFO + FORM) ────── */}
      <div
        ref={contentRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#ffffff] px-6 sm:px-10 lg:px-20 py-20 lg:py-32 relative"
      >
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-16 lg:gap-24">
          
          {/* LEFT: Contact Information */}
          <div className="relative z-10">
            <h3
              className={`text-2xl lg:text-3xl font-black text-gray-900 tracking-tight mb-6 transition-all duration-700 ease-out ${
                contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ fontFamily: "'Syne', 'DM Sans', sans-serif" }}
            >
              Reach Out Directly
            </h3>
            <p className={`text-gray-500 font-light leading-relaxed mb-12 max-w-md transition-all duration-700 ease-out delay-100 ${
                contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              Whether you need an immediate airport transfer, wish to customize a 14-day island expedition, or simply want to ask a question, our local experts are at your disposal.
            </p>

            <div className="space-y-10">
              {contactMethods.map((method, idx) => (
                <div
                  key={method.label}
                  className={`flex items-start gap-6 group transition-all duration-700 ease-out ${
                    contentRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                  }`}
                  style={{ transitionDelay: `${200 + idx * 100}ms` }}
                >
                  <div className="p-4 bg-[#f4f4f4] text-[#1800ad] transition-colors duration-300 group-hover:bg-[#5e17eb] group-hover:text-white">
                    {method.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
                      {method.label}
                    </h4>
                    <p className="text-xl font-bold text-gray-900 mb-1 tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
                      {method.value}
                    </p>
                    <p className="text-sm text-gray-500 font-light">{method.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className={`mt-16 pt-10 border-t border-[#e8e4df] flex items-center gap-6 transition-all duration-700 ease-out delay-500 ${
                contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">Follow Us</span>
              {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
                <a key={social} href="#" className="text-sm text-gray-500 hover:text-[#5e17eb] transition-colors duration-300 relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-[#5e17eb] hover:after:w-full after:transition-all after:duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT: Premium Form */}
          <div className={`bg-[#f9f9f9] p-8 sm:p-12 lg:p-16 relative transition-all duration-1000 ease-out delay-300 ${
              contentRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="absolute top-0 left-0 w-full h-1" style={{ background: 'linear-gradient(to right, #5e17eb, #1800ad)' }} />
            
            <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              Send an Inquiry
            </h3>
            <p className="text-sm text-gray-500 mb-10 font-light">We typically reply within 2-4 hours.</p>

            {formStatus === 'success' ? (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#ede9ff] text-[#5e17eb] flex items-center justify-center mb-6">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Request Received</h4>
                <p className="text-gray-500 font-light">Thank you. One of our travel architects will be in touch with you shortly.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-xs font-bold tracking-widest uppercase text-[#5e17eb] hover:text-[#1800ad] transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="relative group">
                    <label htmlFor="name" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-transparent transition-all placeholder-gray-300 font-light"
                      placeholder="John Doe"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
                  </div>

                  <div className="relative group">
                    <label htmlFor="email" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-transparent transition-all placeholder-gray-300 font-light"
                      placeholder="john@example.com"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
                  </div>
                </div>

                <div className="relative group">
                  <label htmlFor="service" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
                    I am interested in...
                  </label>
                  <select
                    id="service"
                    required
                    defaultValue=""
                    className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-transparent transition-all font-light appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-gray-300">Select a service</option>
                    <option value="taxi">Premium Taxi / Transfer</option>
                    <option value="tour">Signature Pre-planned Tour</option>
                    <option value="custom">Custom Bespoke Journey</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                  <div className="absolute right-0 top-8 pointer-events-none text-gray-400 group-focus-within:text-[#5e17eb] transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
                </div>

                <div className="relative group">
                  <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-2 transition-colors group-focus-within:text-[#5e17eb]">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-gray-300 py-2 text-gray-900 focus:outline-none focus:border-transparent transition-all placeholder-gray-300 font-light resize-none"
                    placeholder="Tell us about your dates, group size, and what you'd love to experience..."
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#5e17eb] to-[#1800ad] transition-all duration-500 group-focus-within:w-full" />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="group relative w-full inline-flex items-center justify-center gap-3 px-8 py-5 text-sm font-bold tracking-widest uppercase text-white transition-all duration-300 overflow-hidden disabled:opacity-70"
                  >
                    <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105" style={{ background: 'linear-gradient(135deg, #5e17eb 0%, #1800ad 100%)' }} />
                    <span className="relative z-10 flex items-center gap-3">
                      {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                      {formStatus !== 'submitting' && (
                        <svg
                          className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="square" strokeLinejoin="miter" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ── REDESIGNED EDITORIAL CLOSING BAND ────── */}
      <div 
        ref={closingRef.ref as React.RefObject<HTMLDivElement>}
        className="bg-[#f4f4f4] px-6 sm:px-10 lg:px-20 py-24 lg:py-40 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
          {/* Left Text / Poetic Statement */}
          <div className="flex-1 max-w-2xl relative z-10">
            <div 
              className={`transition-all duration-1000 ease-out ${
                closingRef.inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Small accent line */}
              <div className="w-12 h-px bg-[#1800ad] mb-10" />
              
              <h2 
                className="text-[clamp(32px,5vw,64px)] font-black text-gray-900 leading-[1.1] tracking-tight mb-8"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Every great story <br />
                starts with a simple <br />
                <span className="italic font-light text-gray-500">hello.</span>
              </h2>
              
              <p className="text-gray-500 font-light leading-relaxed text-lg mb-12 max-w-md">
                We don&apos;t just map out routes; we curate the moments that turn into lifelong memories. Your quiet sunset over the Indian Ocean is waiting.
              </p>

              {/* Minimalist Signature */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300">
                  <span className="text-[#5e17eb] font-black text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>TT</span>
                </div>
                <div>
                  <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-900">Sri Lankan TripTip</p>
                  <p className="text-xs text-gray-400 font-light">The Island&apos;s Finest Curators</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image / Museum-Style Crop */}
          <div className="flex-1 w-full flex justify-center lg:justify-end relative">
            <div 
              className={`relative w-full max-w-[460px] aspect-[3/4] transition-all duration-1000 ease-out delay-200 ${
                closingRef.inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'
              }`}
            >
              {/* Offset decorative frame */}
              <div className="absolute -inset-4 border border-[#e8e4df] z-0 hidden sm:block" />
              
              {/* Image Container */}
              <div className="w-full h-full overflow-hidden relative z-10 bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=1200&q=80" 
                  alt="Serene Sri Lankan Beach at Dusk"
                  className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out hover:scale-105"
                />
                
                {/* Subtle calm tint (not a heavy dark overlay) */}
                <div className="absolute inset-0 bg-[#5e17eb]/5 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Rotating Premium Brand Seal */}
              <div className="absolute -bottom-10 -left-10 z-20 w-32 h-32 bg-[#ffffff] rounded-full shadow-2xl flex items-center justify-center p-2">
                <div className="w-full h-full relative animate-[spin_15s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-gray-900">
                    <path
                      id="circlePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[10.5px] font-bold tracking-[0.25em] uppercase" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      <textPath href="#circlePath" startOffset="0%">
                        • TRUSTED JOURNEYS • PREMIUM TOURS
                      </textPath>
                    </text>
                  </svg>
                </div>
                {/* Center dot for the seal */}
                <div className="absolute w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #5e17eb, #1800ad)' }} />
              </div>
            </div>
            
            {/* Background dot grid pattern for depth */}
            <div
              aria-hidden="true"
              className="absolute top-[-10%] right-[-5%] w-32 h-32 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, #5e17eb 1.5px, transparent 1.5px)',
                backgroundSize: '12px 12px',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;