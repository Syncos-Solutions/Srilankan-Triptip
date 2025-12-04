// lib/trips.ts
export type Season = 'Spring' | 'Summer' | 'Autumn' | 'Winter';

export type Category = 'Hiking' | 'Running' | 'Cycling' | 'Camping';

export type Trip = {
  id: string;
  slug: string;
  title: string;
  location: string;
  type: Category;
  season: Season;
  date: string;
  heroImage: {
    src: string;
    alt: string;
  };
  cardImage?: {
    src: string;
    alt: string;
  };
  shortDescription: string;
  description: string[];
};

// NOTE: Add images.unsplash.com to next.config.js images domains/remotePatterns
export const TRIPS: Trip[] = [
  {
    id: 'south-korea-wilderness',
    slug: 'wilderness-of-south-korea',
    title: 'Wilderness of South Korea',
    location: 'South Korea',
    type: 'Hiking',
    season: 'Spring',
    date: '2025-05-14',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=1200&q=80',
      alt: 'Hiker walking a narrow ridge in green South Korean mountains at sunrise',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      alt: 'South Korean mountain landscape',
    },
    shortDescription:
      "South Korea, often referred to as the 'Land of the Morning Calm', boasts a diverse and stunning landscape that ranges from lush green valleys to dramatic mountain peaks.",
    description: [
      "South Korea, often referred to as the 'Land of the Morning Calm', boasts a diverse and stunning landscape that ranges from lush green valleys to dramatic mountain peaks. This trip takes you through some of the country's most scenic hiking trails, where ancient temples meet pristine nature.",
      'Our journey begins in the Seoraksan National Park, home to towering granite peaks, dense forests, and crystal-clear streams. The park is especially breathtaking in spring when azaleas bloom across the mountainsides, painting the landscape in vibrant pinks and purples.',
      'As we traverse the ridge trails, you\'ll experience the unique Korean hiking culture, where colorful hiking gear and friendly trail greetings are the norm. The trails wind through ancient Buddhist temples, offering moments of spiritual reflection alongside physical challenge.',
      'Each day brings new discoveries—from the sunrise views atop Ulsanbawi Rock to the peaceful valleys filled with traditional villages. You\'ll sample authentic Korean mountain cuisine, learning about the culture that has shaped these landscapes for centuries.',
      'The expedition concludes with a visit to Jirisan National Park, where we\'ll hike to remote monasteries accessible only on foot. This journey is more than a hike; it\'s an immersion into a culture that deeply reveres its natural heritage.',
    ],
  },
  {
    id: 'scandinavian-splendor',
    slug: 'scandinavian-splendor',
    title: 'Scandinavian Splendor',
    location: 'Norway',
    type: 'Running',
    season: 'Autumn',
    date: '2025-09-20',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200&q=80',
      alt: 'Dramatic Norwegian fjord with steep cliffs and turquoise water',
    },
    shortDescription:
      "Norway's fjords and mountains offer some of the most spectacular hiking opportunities in the world. Run through breathtaking landscapes where towering cliffs meet crystal-clear waters.",
    description: [
      "Norway's fjords and mountains offer some of the most spectacular running opportunities in the world. In autumn, when the landscape transforms into a canvas of gold, orange, and deep red, the trails become even more magical.",
      'This trail running adventure takes you along the edges of dramatic fjords, where thousand-meter cliffs plunge into deep blue waters. The trails vary from smooth coastal paths to technical mountain routes, offering something for every level of trail runner.',
      'Autumn in Norway means crisp, clear air and stable weather—perfect conditions for running. The midnight sun has passed, but you\'ll still enjoy long daylight hours and stunning light conditions that photographers dream of.',
      'Between runs, you\'ll stay in traditional Norwegian cabins, enjoying local cuisine featuring fresh seafood and seasonal game. The small group format ensures personalized attention from our experienced guides who know these trails intimately.',
      'This isn\'t just about covering distance—it\'s about experiencing the raw beauty of Scandinavian wilderness at a pace that lets you truly absorb the landscape. Each day ends with incredible views and a deep sense of accomplishment.',
    ],
  },
  {
    id: 'trekking-the-andes',
    slug: 'trekking-the-andes',
    title: 'Trekking the Andes',
    location: 'Patagonia, Argentina',
    type: 'Hiking',
    season: 'Summer',
    date: '2025-12-10',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
      alt: 'Mountain road through Patagonia Andes',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80',
      alt: 'Patagonian mountain landscape',
    },
    shortDescription:
      "Argentina's Patagonia region is synonymous with rugged wilderness and jaw-dropping landscapes. Trek through vast glaciers, turquoise lakes, and towering granite peaks.",
    description: [
      "Argentina's Patagonia region is synonymous with rugged wilderness and jaw-dropping landscapes. This summer expedition takes you deep into the heart of this pristine region, where vast glaciers, turquoise lakes, and towering granite peaks create scenery that defies description.",
      'Our trek begins in El Chaltén, the trekking capital of Argentina, nestled beneath the iconic spires of Fitz Roy and Cerro Torre. These dramatic peaks have challenged mountaineers for decades, and while we won\'t be climbing them, we\'ll trek to viewpoints that reveal their full majesty.',
      'The Patagonian summer (December through February) offers the best weather and longest daylight hours. Wildflowers carpet the valleys, and the region\'s famous winds, while still present, are at their gentlest. Wildlife sightings are common—condors soar overhead, and guanacos (wild relatives of llamas) graze in the valleys.',
      'Each day brings new wonders: glacial lagoons of impossible blue, vast ice fields that stretch to the horizon, and remote mountain passes where you might not see another soul for hours. Camp beneath star-filled skies and wake to sunrise illuminating the peaks in shades of pink and gold.',
      'This trek requires good fitness and some previous hiking experience, but the rewards are extraordinary. You\'ll return with memories of one of Earth\'s most spectacular wilderness areas and a new appreciation for the raw power and beauty of nature.',
    ],
  },
  {
    id: 'alpine-adventure',
    slug: 'alpine-adventure',
    title: 'Alpine Adventure',
    location: 'Swiss Alps',
    type: 'Cycling',
    season: 'Summer',
    date: '2025-07-15',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1200&q=80',
      alt: 'Scenic Swiss Alps with snow-capped peaks and green valleys',
    },
    shortDescription:
      'Experience the Swiss Alps on two wheels, cycling through picturesque mountain passes, charming alpine villages, and alongside pristine mountain lakes.',
    description: [
      'Experience the Swiss Alps on two wheels, cycling through picturesque mountain passes, charming alpine villages, and alongside pristine mountain lakes. This journey combines challenging climbs with rewarding descents and stunning panoramic views.',
      'Our cycling adventure takes you through some of the most iconic alpine passes, including routes made famous by the Tour de France. Each day offers a perfect blend of physical challenge and breathtaking scenery, with well-planned rest stops in traditional Swiss villages.',
      'Summer in the Swiss Alps provides ideal cycling conditions, with clear mountain air, long daylight hours, and spectacular views of snow-capped peaks contrasting with green valleys below. The well-maintained roads and extensive network of cycling paths make this a cyclist\'s paradise.',
      'Between riding days, you\'ll stay in comfortable mountain lodges, enjoying Swiss hospitality and cuisine. Our support vehicle follows the route, providing assistance if needed and transporting luggage between accommodations.',
      'This trip is designed for cyclists with good fitness and some experience with long-distance riding. The reward is an unforgettable journey through one of Europe\'s most beautiful mountain regions, with memories and photos that will last a lifetime.',
    ],
  },
  {
    id: 'canadian-rockies',
    slug: 'canadian-rockies-camping',
    title: 'Canadian Rockies Camping',
    location: 'Alberta, Canada',
    type: 'Camping',
    season: 'Autumn',
    date: '2025-09-05',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      alt: 'Misty mountain peaks in the Canadian Rockies at sunrise',
    },
    shortDescription:
      'Immerse yourself in the wilderness of the Canadian Rockies with multi-day camping expeditions. Wake up to stunning mountain vistas and encounter diverse wildlife.',
    description: [
      'Immerse yourself in the wilderness of the Canadian Rockies with multi-day camping expeditions. Wake up to stunning mountain vistas, encounter diverse wildlife, and camp under star-filled skies in one of North America\'s most pristine wilderness areas.',
      'The Canadian Rockies in autumn offer spectacular displays of color as aspens and larches turn golden against the evergreen forests and snow-dusted peaks. Wildlife is particularly active during this season, preparing for winter, offering excellent opportunities for respectful observation.',
      'Our camping itinerary takes you deep into the backcountry, away from crowds and roads. You\'ll learn essential wilderness camping skills, including proper food storage in bear country, Leave No Trace principles, and how to minimize your impact on these fragile ecosystems.',
      'Each campsite is carefully chosen for its natural beauty and proximity to day hiking opportunities. Wake to the sound of nearby streams, watch the sunrise paint the mountains in warm hues, and fall asleep under more stars than you\'ve ever seen.',
      'This expedition requires a moderate to good fitness level and a willingness to embrace rustic camping conditions. In return, you\'ll experience the Canadian Rockies in their purest form, creating connections with nature that are impossible in more developed areas.',
    ],
  },
];

export function getTripBySlug(slug: string): Trip | undefined {
  return TRIPS.find((trip) => trip.slug === slug);
}

export function getTripById(id: string): Trip | undefined {
  return TRIPS.find((trip) => trip.id === id);
}

export function getOtherTrips(currentId: string, limit = 3): Trip[] {
  return TRIPS.filter((trip) => trip.id !== currentId).slice(0, limit);
}

export function getSeasons(): ('All' | Season)[] {
  return ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];
}

export function filterTripsBySeason(season: 'All' | Season): Trip[] {
  if (season === 'All') {
    return TRIPS;
  }
  return TRIPS.filter((trip) => trip.season === season);
}