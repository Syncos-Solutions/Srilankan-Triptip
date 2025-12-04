// lib/stories.ts
export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Australia'
  | 'Antarctica';

export type Story = {
  slug: string;
  title: string;
  subtitle?: string;
  continent: Continent;
  location: string;
  date: string;
  heroImage: {
    src: string;
    alt: string;
  };
  cardImage?: {
    src: string;
    alt: string;
  };
  excerpt: string;
  content: string[];
};

// NOTE: Add images.unsplash.com to next.config.js images domains/remotePatterns
export const STORIES: Story[] = [
  {
    slug: 'running-scenes-in-australia',
    title: 'Australia',
    subtitle: "Join the Run: Australia's Running Club Scene",
    continent: 'Australia',
    location: 'Sydney, Australia',
    date: '2025-04-10',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=1600&q=80',
      alt: 'Sydney Opera House and Harbor Bridge at sunset',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80',
      alt: 'Australian coastal landscape',
    },
    excerpt: 'Discover the vibrant running community across Australia, from coastal trails to urban parks.',
    content: [
      "Australia's running scene is as diverse and expansive as the continent itself. From the iconic coastal paths of Sydney to the urban trails of Melbourne, runners find endless opportunities to explore while staying fit.",
      'The running clubs scattered across major cities create tight-knit communities where locals and visitors alike can connect. Early morning beach runs along Bondi or sunset jogs through the Royal Botanic Gardens offer breathtaking scenery that makes every kilometer memorable.',
      'What sets Australian running culture apart is the blend of competitive spirit and laid-back attitude. Whether you\'re training for a marathon or simply enjoying a social run, the welcoming atmosphere encourages runners of all levels.',
      'The climate allows for year-round outdoor activity, though summer runs often start before dawn to beat the heat. Trail running is particularly popular, with national parks offering challenging terrain and stunning wildlife encounters.',
      'Running events range from fun runs supporting local charities to prestigious city marathons. The sense of community extends beyond the run itself, with post-run coffee culture being an integral part of the experience.',
      'For visitors, joining a local running club offers an authentic way to experience Australian cities and connect with residents who share stories and local knowledge along the way.',
    ],
  },
  {
    slug: 'coastal-adventures-nigeria',
    title: 'Nigeria',
    subtitle: 'Coastal Adventures and Cultural Discoveries',
    continent: 'Africa',
    location: 'Lagos, Nigeria',
    date: '2025-03-15',
    heroImage: {
      src: 'https://images.pexels.com/photos/2873994/pexels-photo-2873994.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Nigerian coastal landscape and beaches',
    },
    cardImage: {
      src: 'https://images.pexels.com/photos/2873994/pexels-photo-2873994.jpeg?auto=compress&cs=tinysrgb&w=1600',
      alt: 'Beautiful Nigerian coastline',
    },
    excerpt: 'Experience the vibrant energy of Nigeria through its stunning coastlines and rich cultural heritage.',
    content: [
      "Nigeria's Atlantic coastline stretches for over 850 kilometers, offering a diverse landscape of beaches, lagoons, and mangrove forests. The coastal regions are not just scenic; they're culturally rich and historically significant.",
      'Lagos, the bustling metropolis, serves as a gateway to coastal exploration. Beyond the urban energy lies Tarkwa Bay Beach, accessible only by boat, where golden sands meet clear waters. The journey itself becomes an adventure, weaving through shipping channels and local fishing boats.',
      'The coastal communities maintain ancient traditions while embracing modernity. Fishing villages dot the shoreline, where you can witness traditional net-casting techniques passed down through generations. Local guides share stories of the land and sea, offering insights into Nigerian coastal life.',
      'Eleko Beach and Elegushi Beach showcase different facets of coastal culture—from quiet retreats to lively entertainment hubs. The beaches serve as gathering places where music, food, and celebration create an atmosphere of warmth and hospitality.',
      'Exploring the mangrove forests reveals an ecosystem teeming with wildlife. Boat tours through these natural waterways offer glimpses of rare birds and aquatic life, highlighting the importance of conservation efforts in the region.',
      'Nigerian coastal cuisine is a highlight of any visit, with fresh seafood prepared using traditional spices and cooking methods that have defined the region for centuries.',
    ],
  },
  {
    slug: 'sacred-peaks-of-tibet',
    title: 'Tibet',
    subtitle: 'Journey to the Roof of the World',
    continent: 'Asia',
    location: 'Lhasa, Tibet',
    date: '2025-05-20',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80',
      alt: 'Potala Palace in Lhasa with mountains in background',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80',
      alt: 'Tibetan prayer flags in mountains',
    },
    excerpt: 'Explore ancient monasteries and sacred peaks in the highest region on Earth.',
    content: [
      "Tibet, known as the 'Roof of the World,' sits at an average elevation of 4,500 meters. This remote region offers a spiritual and physical journey unlike any other, where ancient Buddhist traditions meet stark, breathtaking landscapes.",
      'The Potala Palace in Lhasa stands as a testament to Tibetan architectural and spiritual heritage. Once the residence of the Dalai Lama, this UNESCO World Heritage site contains thousands of rooms, chapels, and religious artifacts spanning centuries.',
      'Trekking in Tibet requires acclimatization and respect for the altitude. The rewards are immense—crystal-clear skies, prayer flags fluttering in mountain winds, and views of peaks that seem to touch the heavens. Mount Kailash, considered sacred by multiple religions, draws pilgrims and adventurers from around the world.',
      'Monasteries perched on hillsides offer glimpses into centuries-old traditions. Monks in burgundy robes engage in philosophical debates, create intricate sand mandalas, and welcome visitors to witness their daily rituals. The devotion and tranquility are palpable.',
      'The stark beauty of the Tibetan Plateau challenges conventional notions of landscape. Vast grasslands stretch to distant mountains, turquoise lakes reflect endless skies, and the silence is profound. Wildlife adapted to extreme conditions—yaks, Tibetan antelopes, and rare snow leopards—inhabit this harsh yet beautiful environment.',
      'Visiting Tibet is not just a physical journey but a spiritual one. The combination of natural grandeur and deep cultural traditions creates experiences that resonate long after you descend from the heights.',
    ],
  },
  {
    slug: 'alpine-majesty',
    title: 'Alps',
    subtitle: 'Conquering Europe\'s Iconic Mountain Range',
    continent: 'Europe',
    location: 'Chamonix, France',
    date: '2025-06-15',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80',
      alt: 'Mont Blanc and Alpine peaks at sunrise',
    },
    excerpt: 'Experience the grandeur of the Alps, where towering peaks and charming villages create unforgettable adventures.',
    content: [
      'The Alps stretch across eight countries, creating one of the world\'s most iconic mountain ranges. From the Matterhorn\'s distinctive pyramid to Mont Blanc\'s snowy summit, these peaks have captivated adventurers for centuries.',
      'Chamonix, nestled in the French Alps, serves as a basecamp for countless alpine adventures. The town buzzes with mountaineering history—this is where alpinism was born. Cable cars whisk visitors to dizzying heights, offering panoramic views of glaciers and jagged peaks.',
      'Summer in the Alps transforms valleys into wildflower meadows. Hiking trails wind through forests, past mountain lakes, and up to refuges where hikers can spend the night surrounded by peaks. The famous Tour du Mont Blanc circuit takes trekkers through three countries in one journey.',
      'Alpine culture is as rich as its landscapes. Traditional chalets dot the hillsides, church bells echo through valleys, and local cuisine—from fondue to rösti—provides hearty fuel for mountain adventures. Villages maintain centuries-old traditions while welcoming modern outdoor enthusiasts.',
      'The Alps offer activities for all seasons and skill levels. Via ferratas provide thrilling climbs with fixed cables and ladders. Mountaineering courses teach glacier travel and technical climbing. For those seeking gentler pursuits, valley walks and scenic train journeys showcase alpine beauty without extreme effort.',
      'Conservation efforts work to preserve both natural landscapes and cultural heritage. Protected areas ensure that future generations can experience the same awe-inspiring beauty that has drawn people to these mountains for millennia.',
    ],
  },
  {
    slug: 'carpathian-wilderness',
    title: 'Carpathians',
    subtitle: 'Europe\'s Last Great Wilderness',
    continent: 'Europe',
    location: 'Transylvania, Romania',
    date: '2025-07-10',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1600&q=80',
      alt: 'Carpathian mountain range in autumn colors',
    },
    excerpt: 'Discover pristine forests, medieval villages, and Europe\'s largest population of brown bears.',
    content: [
      'The Carpathian Mountains arc across Central and Eastern Europe, harboring one of the continent\'s last significant wilderness areas. These mountains shelter ancient forests, rare wildlife, and traditional communities that have lived in harmony with nature for centuries.',
      'Romania\'s Transylvania region contains the heart of the Carpathians, where dense forests cloak mountainsides and medieval villages seem frozen in time. The landscape inspired countless legends, including tales of vampires and werewolves, but the real magic lies in the pristine nature and authentic culture.',
      'Brown bears, wolves, and lynx roam these mountains in numbers found nowhere else in Europe. Conservation efforts protect these apex predators while supporting local communities. Wildlife watching tours offer chances to observe bears in their natural habitat, a humbling reminder of nature\'s power.',
      'Hiking trails range from gentle valley walks to challenging ridge traverses. The Făgăraș Mountains contain Romania\'s highest peaks, with alpine terrain that rivals the Alps but sees far fewer visitors. The solitude and wildness create a sense of discovery increasingly rare in modern Europe.',
      'Traditional shepherding continues in highland pastures, where shepherds make cheese using methods unchanged for generations. Visiting these summer settlements provides insights into sustainable mountain life and the deep connection between people and landscape.',
      'The Carpathians\' beauty shifts with seasons—spring brings wildflower meadows, summer offers lush greenery, autumn paints forests in gold and crimson, and winter transforms the range into a snowy wonderland perfect for backcountry skiing.',
    ],
  },
  {
    slug: 'volcanic-paradise-tenerife',
    title: 'Tenerife',
    subtitle: 'Volcanic Landscapes and Ocean Views',
    continent: 'Africa',
    location: 'Tenerife, Canary Islands',
    date: '2025-08-05',
    heroImage: {
      src: 'https://images.pexels.com/photos/31757522/pexels-photo-31757522.jpeg',
      alt: 'Mount Teide volcano peak in Tenerife',
    },
    cardImage: {
      src: 'https://images.pexels.com/photos/23547686/pexels-photo-23547686.jpeg',
      alt: 'Teide National Park volcanic landscape',
    },
    excerpt: 'Explore Spain\'s highest peak and otherworldly volcanic landscapes on this Atlantic island.',
    content: [
      'Tenerife, the largest of Spain\'s Canary Islands, rises from the Atlantic Ocean to create a land of dramatic contrasts. At its heart stands Mount Teide, Spain\'s highest peak and the world\'s third-largest volcanic structure.',
      'Teide National Park resembles an alien planet. Volcanic rock formations in reds, blacks, and ochres create landscapes that have served as filming locations for science fiction movies. Hiking through this UNESCO World Heritage site feels like walking on another world.',
      'The island\'s microclimates create incredible diversity within a small area. Lush laurel forests in the north contrast sharply with arid southern coasts. This variety means you can hike through cloud forests in the morning and relax on sunny beaches in the afternoon.',
      'Cable car rides to near Teide\'s summit offer spectacular views across the Canary archipelago. On clear days, you can see several islands stretching across the Atlantic. Sunrise from the summit—accessible via overnight permit—ranks among the world\'s most spectacular natural displays.',
      'Beyond Teide, coastal trails wind along dramatic cliffs, through traditional villages, and past hidden beaches. The Masca Gorge descent, though challenging, rewards hikers with stunning scenery and a sense of adventure as you navigate through narrow canyon walls.',
      'Year-round mild weather makes Tenerife perfect for outdoor activities in any season. The combination of volcanic landscapes, ocean views, and excellent infrastructure makes it accessible yet adventurous.',
    ],
  },
  {
    slug: 'land-of-fire-and-ice',
    title: 'Iceland',
    subtitle: 'Land of Fire and Ice',
    continent: 'Europe',
    location: 'Reykjavik, Iceland',
    date: '2025-09-01',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=1600&q=80',
      alt: 'Icelandic waterfall and mountains',
    },
    excerpt: 'Witness the raw power of nature in a land shaped by volcanoes and glaciers.',
    content: [
      'Iceland sits on the Mid-Atlantic Ridge, where tectonic plates pull apart, creating a landscape of active volcanoes, geothermal areas, and vast glaciers. This geological hotspot produces scenery unlike anywhere else on Earth.',
      'Waterfalls cascade from every direction—from the powerful Gullfoss to the hidden gems tucked into canyon walls. Some fall from glaciers, others from volcanic cliffs, each with its own character and beauty. The sound of falling water is Iceland\'s constant soundtrack.',
      'Black sand beaches contrast with white glaciers and green mossy lava fields. The colors are intense and surreal, enhanced by the long summer days and dramatic winter light. Photographers find endless subjects, from ice caves to northern lights.',
      'Hiking opportunities range from day walks to multi-day treks through highlands accessible only in summer. The Laugavegur Trail showcases geothermal areas, glacial rivers, and rainbow-colored mountains. Hot springs provide natural relaxation after long days on the trail.',
      'Geothermal energy not only powers the country but creates bathing opportunities everywhere. From the famous Blue Lagoon to remote hot springs known only to locals, warm water in cold landscapes creates magical experiences.',
      'Iceland\'s commitment to sustainable tourism ensures that its natural wonders remain pristine. Visitors learn to respect the fragile ecosystems and understand the delicate balance between accessibility and conservation.',
    ],
  },
  {
    slug: 'andes-high-adventure',
    title: 'Andes',
    subtitle: 'The Spine of South America',
    continent: 'South America',
    location: 'Cusco, Peru',
    date: '2025-10-12',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1600&q=80',
      alt: 'Andean peaks and traditional village',
    },
    excerpt: 'Trek through ancient Inca trails and experience the cultural richness of the world\'s longest mountain range.',
    content: [
      'The Andes stretch over 7,000 kilometers along South America\'s western edge, creating the longest continental mountain range on Earth. From Colombia to Patagonia, these mountains have shaped civilizations and continue to inspire adventurers.',
      'Peru\'s Sacred Valley showcases the intersection of natural beauty and human history. Ancient Inca sites perch on mountainsides, connected by stone pathways that have endured for centuries. The Inca Trail to Machu Picchu remains one of the world\'s most famous treks.',
      'Highland communities maintain traditions that predate the Inca Empire. Quechua-speaking people farm steep terraces using ancient techniques, weave textiles with patterns passed down through generations, and celebrate festivals that blend indigenous and Spanish influences.',
      'The altitude challenges visitors but also creates unique ecosystems. The páramo grasslands, found only at high elevations in the Andes, support rare species adapted to thin air and temperature extremes. Andean condors soar on thermals, their massive wingspans a testament to evolution\'s ingenuity.',
      'Beyond Peru, the Andes offer diverse experiences. Ecuador\'s avenue of volcanoes, Bolivia\'s salt flats at their feet, Chile\'s wine valleys, and Argentina\'s Patagonian peaks—each section has distinct character while sharing the cordillera\'s grandeur.',
      'Trekking in the Andes means more than physical challenge. It\'s an opportunity to connect with indigenous cultures, understand the relationship between people and mountains, and witness landscapes that have inspired reverence for millennia.',
    ],
  },
  {
    slug: 'canadian-rockies-wild',
    title: 'Rockies',
    subtitle: 'Canadian Wilderness at Its Finest',
    continent: 'North America',
    location: 'Banff, Canada',
    date: '2025-11-08',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1600&q=80',
      alt: 'Turquoise lake in Canadian Rockies with mountains',
    },
    excerpt: 'Explore pristine lakes, glaciers, and abundant wildlife in Canada\'s iconic mountain range.',
    content: [
      'The Canadian Rockies represent wilderness on a grand scale. Towering peaks, turquoise glacial lakes, and vast forests create landscapes that define the Canadian identity. National parks protect this natural heritage while providing access to outdoor recreation.',
      'Banff National Park, Canada\'s oldest, showcases the Rockies at their most accessible. Lake Louise\'s emerald waters reflect surrounding peaks in perfect symmetry. Moraine Lake\'s iconic view graces countless photographs, yet seeing it in person still takes your breath away.',
      'Wildlife viewing opportunities abound. Grizzly and black bears forage in alpine meadows, elk graze in valley bottoms, and mountain goats navigate impossibly steep terrain. The abundance of megafauna reminds visitors that humans are just visitors in this wild kingdom.',
      'Hiking trails accommodate all abilities. The Plain of Six Glaciers trail offers tea and stunning views at a historic teahouse. The Skyline Trail in Jasper provides days of ridge walking above treeline. Backcountry routes challenge experienced hikers with stream crossings and navigation.',
      'The Icefields Parkway, connecting Banff and Jasper, ranks among the world\'s most scenic drives. Glaciers spill from ice fields, waterfalls cascade beside the road, and wildlife sightings are common. Stopping points provide access to short walks and longer adventures.',
      'Canadian hospitality extends to mountain towns, where outdoor culture thrives. Gear shops, breweries, and restaurants create vibrant communities centered on mountain living. The balance between conservation and recreation sets a global example.',
    ],
  },
  {
    slug: 'new-zealand-fjords',
    title: 'New Zealand',
    subtitle: 'Land of the Long White Cloud',
    continent: 'Australia',
    location: 'Queenstown, New Zealand',
    date: '2025-12-15',
    heroImage: {
      src: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      alt: 'Milford Sound fjord with mountains and waterfalls',
    },
    cardImage: {
      src: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
      alt: 'New Zealand Southern Alps landscape',
    },
    excerpt: 'Journey through dramatic fjords, emerald valleys, and snow-capped peaks in Middle-earth.',
    content: [
      'New Zealand\'s South Island packs extraordinary diversity into a compact area. Glaciers descend to rainforests, fjords cut deep into mountains, and turquoise lakes sparkle beneath snow-capped peaks. This is the landscape that brought Middle-earth to life.',
      'Fiordland National Park contains some of the wettest, wildest terrain on the planet. Milford Sound, carved by glaciers, plunges over 400 meters deep. Vertical cliffs rise straight from the water, waterfalls cascade thousands of feet, and dolphins play in the dark waters.',
      'The Southern Alps run the length of the island, creating a playground for outdoor enthusiasts. Hiking trails range from short walks to multi-day treks. The Routeburn and Milford tracks rank among the world\'s finest, passing through valleys and over alpine passes with views that defy description.',
      'Adventure capital Queenstown serves as a base for activities from bungee jumping to glacier hiking. The town\'s stunning lakeside setting, surrounded by mountains, makes it hard to leave. Yet the surrounding wilderness beckons—Mount Aspiring National Park, Wanaka\'s lakes, and countless hidden valleys.',
      'Maori culture adds depth to the natural beauty. Traditional stories explain the formation of landscapes, connecting people to place through generations. Visitors gain appreciation for indigenous relationships with land and the importance of guardianship.',
      'New Zealand\'s commitment to conservation means 30% of the country enjoys protected status. Efforts to restore native forests and eliminate invasive predators ensure that future generations will experience the same pristine wilderness that makes these islands special.',
    ],
  },
  {
    slug: 'himalayan-heights-nepal',
    title: 'Nepal',
    subtitle: 'Among the Giants of the Himalayas',
    continent: 'Asia',
    location: 'Kathmandu, Nepal',
    date: '2026-01-20',
    heroImage: {
      src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1600&q=80',
      alt: 'Mount Everest and Himalayan peaks at sunrise',
    },
    cardImage: {
      src: 'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800&q=80',
      alt: 'Prayer flags with Himalayan mountains',
    },
    excerpt: 'Trek to Everest Base Camp and experience the spiritual heart of the highest mountains on Earth.',
    content: [
      'Nepal holds eight of the world\'s fourteen highest peaks, including Mount Everest. But the Himalayas offer more than superlatives—they represent a spiritual landscape where Sherpa culture, Buddhist traditions, and dramatic nature create transformative experiences.',
      'The trek to Everest Base Camp follows ancient trade routes through Sherpa villages. Prayer flags flutter from suspension bridges, monasteries perch on hillsides, and the warm hospitality of tea houses makes the journey as memorable as the destination. Watching sunrise illuminate Everest from Kala Patthar leaves trekkers speechless.',
      'Beyond Everest, the Annapurna region offers equally spectacular trekking. The Annapurna Circuit circumnavigates a mountain massif, crossing high passes and traversing diverse climate zones. In spring, rhododendron forests bloom in impossible reds and pinks against snowy backdrops.',
      'Kathmandu Valley provides cultural richness before and after mountain adventures. Ancient temples, bustling markets, and skilled artisans create sensory overload. The blend of Hindu and Buddhist traditions manifests in architecture, festivals, and daily life.',
      'Trekking in Nepal means supporting local economies. Sherpa guides share their knowledge of mountains and culture. Lodge owners welcome trekkers with dal bhat and stories. The relationships formed on the trail often last longer than the trek itself.',
      'Nepal\'s mountains demand respect. Altitude affects everyone differently, weather changes rapidly, and the terrain challenges even experienced trekkers. But those who approach the Himalayas with humility and preparation discover why these mountains have captivated humanity for millennia.',
    ],
  },
];

export function getStoryBySlug(slug: string): Story | undefined {
  return STORIES.find((story) => story.slug === slug);
}

export function getOtherStories(currentSlug: string, limit = 3): Story[] {
  return STORIES.filter((story) => story.slug !== currentSlug).slice(0, limit);
}

export function getContinents(): ('All continents' | Continent)[] {
  return ['All continents', 'Africa', 'Asia', 'Europe', 'North America', 'South America', 'Australia', 'Antarctica'];
}