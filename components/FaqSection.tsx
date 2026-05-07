// components/FaqSection.tsx
'use client';

import React, { useState } from 'react';

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: 'general',
    title: 'General',
    items: [
      {
        id: 'what-is-triptip',
        question: 'What exactly is Sri Lankan TripTip?',
        answer:
          'Sri Lankan TripTip is a Colombo-based travel company founded in 2012 with one mission — to show the world a Sri Lanka that most visitors never reach. We offer three core services: premium airport & intercity taxi transfers, expertly curated tour packages across the island, and fully bespoke custom travel planning built around you. Every service is delivered by real people who love this country deeply.',
      },
      {
        id: 'why-choose-triptip',
        question: 'Why choose Sri Lankan TripTip over other travel agencies?',
        answer:
          'We are not a call centre, a booking engine, or a template-driven agency. Every quote, itinerary and recommendation is reviewed and personalised by a Sri Lankan specialist who has been on the ground. We have spent over 12 years curating hidden addresses, rare experiences, and trusted local contacts that sit well beneath the surface of guidebooks. Our 5-star standard, set in year one, has never wavered.',
      },
      {
        id: 'destinations-covered',
        question: 'Which destinations and regions of Sri Lanka do you cover?',
        answer:
          'We cover the entire island — from the Jaffna peninsula in the north to the deep south at Tangalle and beyond. Key regions include Colombo, Kandy, Ella, Sigiriya, Galle Fort, Mirissa, Nuwara Eliya, Yala, Anuradhapura, Trincomalee, Knuckles, Arugam Bay, and the Knuckles Range. If a place exists in Sri Lanka, we can take you there.',
      },
      {
        id: 'languages',
        question: 'What languages does your team speak?',
        answer:
          'Our guides and drivers communicate fluently in English, Sinhala, and Tamil. For international guests, our senior planning team is available in English around the clock. We pride ourselves on clear, warm, and jargon-free communication from the moment you first enquire.',
      },
      {
        id: 'best-time-visit',
        question: 'When is the best time to visit Sri Lanka?',
        answer:
          'Sri Lanka is a year-round destination because the island has two monsoon seasons affecting different coasts at different times. The west and south coasts (Galle, Mirissa, Colombo) are ideal from November to April. The east coast (Arugam Bay, Trincomalee) shines from May to September. The hill country and cultural triangle are great almost any time. Our planning team will match your travel dates to the best regions available.',
      },
    ],
  },
  {
    id: 'tours',
    title: 'Tours & Experiences',
    items: [
      {
        id: 'tour-types',
        question: 'What types of tours do you offer?',
        answer:
          'We offer five tour categories: Cultural Heritage tours covering Sigiriya, Dambulla and Polonnaruwa; Wildlife & Safari experiences at Yala, Udawalawe and Wilpattu; Hill Country journeys through Ella, Nuwara Eliya and tea estates; Coastal & Beach escapes along the south and east; and Adventure experiences including the Knuckles Range trek, white-water rafting in Kitulgala, and Adam\'s Peak pilgrimages. Each tour is led by a specialist guide native to that region.',
      },
      {
        id: 'group-size',
        question: 'How large are your tour groups?',
        answer:
          'We deliberately keep group sizes small to protect the quality of your experience. Most tours run between 2 and 10 guests. Premium and adventure tours are capped at 6. Private tours — with just you and your group — are available for any itinerary. Small groups mean more flexibility, more depth, and more of the guide\'s genuine attention.',
      },
      {
        id: 'tour-guides',
        question: 'Who are your guides and what qualifications do they hold?',
        answer:
          'All Sri Lankan TripTip guides are licensed by the Sri Lanka Tourism Development Authority (SLTDA) and hold current Wilderness First Aid certification. Beyond credentials, we select guides for their personal depth — people with a living relationship to the places they lead. Several have been with us since 2012. Many speak multiple languages and hold specialist expertise in history, ecology, or cultural ceremony.',
      },
      {
        id: 'accommodation',
        question: 'Is accommodation included in your tour packages?',
        answer:
          'Most of our multi-day tour packages include carefully selected accommodation ranging from boutique heritage hotels to eco-lodges and luxury tented camps. Each property has been personally vetted by our team for comfort, location, and authentic character. Accommodation details and star ratings are clearly stated on every tour listing. For custom tours, we tailor accommodation to your exact preferences and budget.',
      },
      {
        id: 'physical-fitness',
        question: 'Do your tours require a specific level of fitness?',
        answer:
          'Each tour carries a clear difficulty rating — Easy, Moderate, or Challenging — listed on the tour page. Easy tours suit most ages and fitness levels. Moderate tours involve some walking on uneven terrain or light uphill sections. Challenging itineraries such as Adam\'s Peak, Knuckles trekking, or Horton Plains require good cardiovascular fitness. If you are unsure whether a tour suits you, contact us before booking and we will advise honestly.',
      },
      {
        id: 'children-families',
        question: 'Are your tours suitable for families with children?',
        answer:
          'Yes. We regularly design family itineraries and many of our standard tours welcome children aged 6 and above. Wildlife safaris, cultural cooking classes, elephant orphanage visits and beach day tours are particular favourites with younger guests. For families, we recommend a custom planning consultation so we can calibrate pace, activities and stops perfectly for your children\'s ages.',
      },
    ],
  },
  {
    id: 'taxi',
    title: 'Taxi & Transfers',
    items: [
      {
        id: 'taxi-service-overview',
        question: 'What does your taxi and transfer service include?',
        answer:
          'Our taxi service covers airport pickups and drop-offs (Bandaranaike International, Mattala), intercity transfers, day excursions, hotel-to-hotel transfers, and multi-day chauffeur hire. All vehicles are air-conditioned, clean, GPS-tracked, and inspected regularly. Drivers are professional, licensed, uniformed, and carry identification. We operate 24 hours a day, 7 days a week across the entire island.',
      },
      {
        id: 'taxi-advance-booking',
        question: 'How far in advance should I book a taxi or transfer?',
        answer:
          'For airport transfers, we recommend booking at least 24 hours in advance. For intercity transfers and day tours, 48 hours is ideal. During peak seasons (December–January and July–August), we advise booking 3–5 days ahead to guarantee vehicle and driver availability. Last-minute bookings are accepted subject to availability — contact us via WhatsApp for the fastest response.',
      },
      {
        id: 'airport-pickup',
        question: 'How does the airport pickup process work?',
        answer:
          'Upon arrival at Bandaranaike International Airport (CMB), your driver will be waiting in the arrivals hall holding a signboard with your name. You will receive your driver\'s name, vehicle registration, and mobile number via email and WhatsApp at least 2 hours before your flight lands. Our drivers monitor flight arrivals in real time, so delays never result in a missed pickup. There is no extra charge for flight delays.',
      },
      {
        id: 'vehicle-types',
        question: 'What types of vehicles are available?',
        answer:
          'We offer a range of vehicles to match your group size and comfort level: sedans for solo travellers or couples, standard SUVs and vans for groups of 4–8, and premium luxury vehicles for those wanting an elevated experience. All vehicles are air-conditioned. Child seats are available on request at no extra charge. Please specify your group size when booking so we allocate the right vehicle automatically.',
      },
      {
        id: 'taxi-safety',
        question: 'How do you ensure passenger safety during transfers?',
        answer:
          'Every TripTip driver undergoes a thorough background check, holds a valid Sri Lankan tourist transport licence, and completes annual driver training. Vehicles carry valid insurance, pass regular mechanical inspections, and are equipped with GPS tracking. For solo female travellers, we offer the option to share your live trip location with a contact of your choice via our WhatsApp line throughout the journey.',
      },
    ],
  },
  {
    id: 'custom-planning',
    title: 'Custom Planning',
    items: [
      {
        id: 'what-is-custom',
        question: 'What is your Custom Planning service?',
        answer:
          'Custom Planning is our bespoke itinerary design service for travellers who want Sri Lanka on their own terms. You share your travel dates, interests, pace preference, and budget. Our specialist team — real human planners, not AI — designs a day-by-day itinerary calibrated entirely around you. Every cost, route, and reasoning is fully transparent before you commit to anything. Most custom plans are delivered within 48 hours of your enquiry.',
      },
      {
        id: 'custom-cost',
        question: 'Is there a charge for the custom planning consultation?',
        answer:
          'The initial consultation and itinerary proposal are completely free of charge. You only pay once you are fully satisfied with your plan and choose to confirm the booking. There are no hidden planning fees, no obligation, and no pressure. We believe that getting your itinerary right matters more than closing a sale quickly.',
      },
      {
        id: 'how-custom-works',
        question: 'How does the custom planning process work step by step?',
        answer:
          'Step one: Submit your enquiry via our Custom Planning page with your basic travel details. Step two: A TripTip specialist contacts you within 24 hours to learn more about your preferences. Step three: We build and send your personalised itinerary within 48 hours. Step four: We revise it freely until it is exactly right. Step five: Once confirmed, we handle all bookings, transport, accommodation and logistics. You simply arrive and experience.',
      },
      {
        id: 'custom-specialties',
        question: 'Can you include unique cultural experiences like temple ceremonies or astrology?',
        answer:
          'Absolutely — this is one of our specialities. We can arrange private astrologer consultations with village practitioners, access to Kandyan temple ceremonies not open to the general public, dawn visits to Sigiriya before the crowds arrive, cooking classes with local families, and fishing expeditions with traditional outrigger fishermen. These are the experiences that sit beneath the surface of Sri Lanka — and they belong to our guests.',
      },
      {
        id: 'honeymoon-solo',
        question: 'Do you specialise in honeymoon or solo traveller itineraries?',
        answer:
          'Yes to both. Honeymoon itineraries are one of our most requested custom plans — we craft deeply romantic, private experiences across coastal villas, hill country boutique stays, and candlelit dinners in heritage settings. For solo travellers, we design itineraries that balance solitude and social discovery, with extra safety briefings, vetted accommodation, and a dedicated contact number active throughout your journey.',
      },
    ],
  },
  {
    id: 'payment',
    title: 'Payment & Booking',
    items: [
      {
        id: 'payment-methods',
        question: 'What payment methods do you accept?',
        answer:
          'We accept all major credit and debit cards (Visa, Mastercard, American Express), PayHere (Sri Lanka\'s leading payment gateway), direct bank transfers, and PayPal for international guests. All online payments are processed through our secure, SSL-encrypted payment system. We never store card details on our servers.',
      },
      {
        id: 'deposit-structure',
        question: 'Do I need to pay the full amount at the time of booking?',
        answer:
          'For most tour and custom packages, we require a 30% deposit to confirm your booking. The remaining 70% is due 30 days before your departure date. For bookings made within 30 days of travel, full payment is required at the time of confirmation. Taxi transfers are charged in full upon confirmation. We will always be transparent about the payment schedule before you commit.',
      },
      {
        id: 'currency',
        question: 'In which currency will I be charged?',
        answer:
          'Tour packages and custom itineraries are quoted and charged in US Dollars (USD) for international guests. Taxi transfers may be quoted in Sri Lankan Rupees (LKR) or USD — your invoice will clearly state the currency. All PayHere transactions for Sri Lankan guests are processed in LKR. Exchange rates displayed are indicative; your bank or card provider applies the actual conversion.',
      },
      {
        id: 'booking-confirmation',
        question: 'How will I receive my booking confirmation?',
        answer:
          'Immediately upon successful payment, you will receive a detailed booking confirmation to your registered email address. This includes your booking reference number, itinerary details, driver or guide information (where applicable), emergency contact numbers, and pre-trip preparation notes. A WhatsApp confirmation is also sent if you have provided your number. Save this document — it is your travel reference.',
      },
    ],
  },
  {
    id: 'policy',
    title: 'Our Policy',
    items: [
      {
        id: 'cancellation-policy',
        question: 'What is your cancellation and refund policy?',
        answer:
          'We offer a fair and transparent cancellation structure. Cancellations made 30 or more days before departure receive a full refund minus a small processing fee. Cancellations between 14 and 30 days before departure receive a 50% refund, or we apply the full amount as credit toward a future journey with no expiry. Cancellations within 14 days are non-refundable but may be transferred to another traveller or rescheduled subject to availability. Taxi transfers cancelled more than 12 hours in advance are fully refunded.',
      },
      {
        id: 'safety-protocols',
        question: 'What safety protocols do you follow during tours and transfers?',
        answer:
          'Safety is embedded into every layer of our operation. All guides hold current Wilderness First Aid and CPR certification. Vehicles carry comprehensive first-aid kits and emergency communication devices. Weather and road conditions are monitored continuously, and itineraries are adjusted when safety is a concern — no exception is made for commercial reasons. We maintain strict guide-to-guest ratios and operate a 24-hour emergency line for guests on the road.',
      },
      {
        id: 'responsible-tourism',
        question: 'How does Sri Lankan TripTip approach responsible and sustainable tourism?',
        answer:
          'We take our responsibility to Sri Lanka very seriously. We pay all guides, drivers and local partners a fair and living wage above the national average. We avoid over-tourism hotspots during peak hours by designing off-schedule access. We support local accommodation, local food producers, and local artisans across our itineraries. Single-use plastics are prohibited in all TripTip vehicles and tours. We contribute a portion of every booking to community-led conservation projects in the Knuckles Range and Southern coast.',
      },
      {
        id: 'travel-insurance',
        question: 'Do I need travel insurance to book with Sri Lankan TripTip?',
        answer:
          'We strongly recommend comprehensive travel insurance for all guests, covering medical emergencies, trip cancellation, and personal belongings. While we take every precaution, Sri Lanka is a tropical destination with occasional monsoons, wildlife, and challenging terrain. Travel insurance is not mandatory to book with us, but we will always ask you to confirm that you have adequate cover before departure — especially for adventure and trekking itineraries.',
      },
      {
        id: 'visa-requirements',
        question: 'Do you assist with Sri Lanka visa requirements and entry documentation?',
        answer:
          'We provide detailed, up-to-date guidance on Sri Lanka\'s Electronic Travel Authorisation (ETA) visa process, which most nationalities can complete online in under 15 minutes. We do not process visas directly, but we supply the exact documentation checklist, portal link, and country-specific advice upon booking. We also advise on current entry requirements, health regulations, and any travel advisories relevant to your nationality.',
      },
    ],
  },
];

const PlusIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`motion-safe:transition-transform motion-safe:duration-300 ${
      isOpen ? 'rotate-45' : 'rotate-0'
    }`}
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FaqSection: React.FC = () => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (itemId: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="py-16 md:py-20 lg:py-24 px-4 md:px-8 bg-[#fff]"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            id="faq-heading"
            className="text-4xl font-dm-sans md:text-5xl lg:text-8xl font-extrabold text-gray-900 mb-4 tracking-tight"
          >
            FAQ
          </h2>
          <p className="text-lg md:text-xl font-dm-sans text-gray-700 max-w-3xl">
            Find answers to commonly asked questions about our hiking adventures, booking process,
            and policies. Can&apos;t find what you&apos;re looking for? Feel free to contact us
            directly.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,2fr] lg:gap-16 lg:mb-[100px]">
          {/* Categories - Desktop */}
          <div className="hidden lg:block ">
            <div className="space-y-12 sticky top-24 ">
              {FAQ_CATEGORIES.map((category) => (
                <div key={category.id}>
                  <h3 className="text-2xl md:text-3xl font-dm-sans lg:mb-[220px] font-light text-gray-900">
                    {category.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-12">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.id}>
                {/* Category Title - Mobile */}
                <h3 className="lg:hidden text-2xl font-dm-sans text-gray-900 mb-6">
                  {category.title}
                </h3>

                {/* Questions List */}
                <div className="space-y-0">
                  {category.items.map((item, index) => {
                    const isOpen = openItems.has(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`${
                          index !== 0 ? 'border-t font-dm-sans border-gray-900/20' : ''
                        }`}
                      >
                        <button
                          onClick={() => toggleItem(item.id)}
                          aria-expanded={isOpen}
                          aria-controls={`answer-${item.id}`}
                          className="w-full flex items-center justify-between py-6 text-left group"
                        >
                          <span className="text-lg md:text-xl font-dm-sans text-gray-900 pr-8">
                            {item.question}
                          </span>
                          <div className="flex-shrink-0 text-gray-900">
                            <PlusIcon isOpen={isOpen} />
                          </div>
                        </button>

                        <div
                          id={`answer-${item.id}`}
                          className={`
                            overflow-hidden
                            motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out
                            ${
                              isOpen
                                ? 'max-h-[500px] opacity-100 pb-6'
                                : 'max-h-0 opacity-0'
                            }
                          `}
                        >
                          <p className="text-base md:text-lg font-dm-sans text-gray-700 leading-relaxed pr-12">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;