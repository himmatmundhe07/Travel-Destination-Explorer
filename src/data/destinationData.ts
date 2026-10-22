export interface Destination {
  id: number;
  slug: string;
  code: string;
  loc: string;
  geo: string;
  name: string;
  country: string;
  region: string;
  subRegion: string;
  regionSlug: string;
  tag: string;
  description: string;
  overview: string;
  elevation: string;
  prefecture: string;
  bestSeason: string;
  knownFor: string;
  tripLength: string;
  transitNotes: string;
}

const destinationData: Destination[] = [
  {
    id: 1,
    slug: "kyoto",
    code: "EA-01",
    loc: "LOC-35.0116",
    geo: "35.0116° N, 135.7681° E",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    subRegion: "Kansai",
    regionSlug: "asia/japan/kansai",
    tag: "JPN",
    description: "Historic shrines, bamboo groves, and traditional wooden tea houses.",
    overview: "Former imperial capital renowned for classical Buddhist temples, Zen gardens, imperial palaces, Shinto shrines, and preserved wooden merchant townhouses.",
    elevation: "54m",
    prefecture: "Kyoto (京都府)",
    bestSeason: "Spring (March–May) for cherry blossoms or Autumn (October–November) for foliage",
    knownFor: "Zen gardens, bamboo forests, Kaiseki dining, and historic preservation",
    tripLength: "4 to 6 days",
    transitNotes: "Intercity arrival routes through Kyoto Station via the Tokaido Shinkansen, linking central Tokyo within approximately 135 minutes. Intra-city navigation relies predominantly on integrated municipal bus lines and the Karasuma and Tozai subway networks via standard IC tap cards."
  },
  {
    id: 2,
    slug: "bergen",
    code: "SC-04",
    loc: "LOC-60.3913",
    geo: "60.3913° N, 5.3221° E",
    name: "Bergen",
    country: "Norway",
    region: "Scandinavia",
    subRegion: "Vestland",
    regionSlug: "europe/norway/vestland",
    tag: "NOR",
    description: "Coastal fjord gateway known for colorful wooden wharfs and mountain funiculars.",
    overview: "Historic Hanseatic trading port framed by seven mountains, serving as the primary jumping-off point for exploring Norway's western fjords.",
    elevation: "12m",
    prefecture: "Vestland",
    bestSeason: "Summer (June to August) for warm temperatures and fjord cruises",
    knownFor: "Bryggen wharf, Floibanen funicular, fish market, and fjord excursions",
    tripLength: "3 to 4 days",
    transitNotes: "Bergen Airport Flesland connects to the city center via the Bybanen light rail line in 45 minutes. Daily express coastal ferries connect to northern fjords."
  },
  {
    id: 3,
    slug: "oaxaca",
    code: "CA-02",
    loc: "LOC-17.0732",
    geo: "17.0732° N, 96.7266° W",
    name: "Oaxaca",
    country: "Mexico",
    region: "Central America",
    subRegion: "Oaxaca Valley",
    regionSlug: "americas/mexico/oaxaca",
    tag: "MEX",
    description: "Colonial architecture, indigenous craft markets, and renowned culinary traditions.",
    overview: "UNESCO World Heritage city celebrated for preserved 16th-century Spanish colonial architecture, vibrant Zapotec and Mixtec indigenous textiles, and world-class mole cuisine.",
    elevation: "1,555m",
    prefecture: "Oaxaca State",
    bestSeason: "October to March during mild winter dry season and cultural celebrations",
    knownFor: "Santo Domingo church, Monte Alban ruins, artisan markets, mezcal distilleries",
    tripLength: "4 to 5 days",
    transitNotes: "Oaxaca International Airport (OAX) is 15 minutes south of the historic center. Colectivo shuttles and taxis connect to craft villages across the central valleys."
  },
  {
    id: 4,
    slug: "florence",
    code: "SE-08",
    loc: "LOC-43.7696",
    geo: "43.7696° N, 11.2558° E",
    name: "Florence",
    country: "Italy",
    region: "Southern Europe",
    subRegion: "Tuscany",
    regionSlug: "europe/italy/tuscany",
    tag: "ITA",
    description: "Renaissance art museums, terracotta-domed cathedral, and Tuscan wine country.",
    overview: "Birthplace of the Italian Renaissance, home to masterpieces by Michelangelo, Botticelli, and Brunelleschi alongside vibrant artisanal leather ateliers.",
    elevation: "50m",
    prefecture: "Tuscany",
    bestSeason: "April to May or September to October with pleasant weather and harvest festivals",
    knownFor: "Uffizi Gallery, Duomo Cathedral, Ponte Vecchio, Galleria dell'Accademia",
    tripLength: "3 to 5 days",
    transitNotes: "Santa Maria Novella railway station offers high-speed Frecciarossa rail service reaching Rome in 90 minutes and Milan in under 2 hours."
  },
  {
    id: 5,
    slug: "essaouira",
    code: "NA-03",
    loc: "LOC-31.5085",
    geo: "31.5085° N, 9.7595° W",
    name: "Essaouira",
    country: "Morocco",
    region: "North Africa",
    subRegion: "Atlantic Coast",
    regionSlug: "africa/morocco/coast",
    tag: "MAR",
    description: "Atlantic port ramparts, breezy medina alleyways, and artisan woodcraft.",
    overview: "Fortified 18th-century seaport combining Portuguese, French, and Berber architecture with constant Atlantic trade winds and fresh seafood harbors.",
    elevation: "11m",
    prefecture: "Marrakech-Safi",
    bestSeason: "May to October for beach activities and water sports with refreshing ocean breezes",
    knownFor: "Skala de la Ville ramparts, blue fishing boats, Medina souks, thuya woodcraft",
    tripLength: "2 to 3 days",
    transitNotes: "Supratours and CTM express coaches run several direct daily services from Marrakech taking under 3 hours."
  },
  {
    id: 6,
    slug: "queenstown",
    code: "OC-06",
    loc: "LOC-45.0312",
    geo: "45.0312° S, 168.6626° E",
    name: "Queenstown",
    country: "New Zealand",
    region: "Oceania",
    subRegion: "Otago",
    regionSlug: "oceania/new-zealand/otago",
    tag: "NZL",
    description: "Alpine lake landscapes, glacial valleys, and outdoor trail expeditions.",
    overview: "New Zealand's adventure capital nestled along the crystal shores of Lake Wakatipu against the dramatic backdrop of the Remarkables mountain range.",
    elevation: "310m",
    prefecture: "Otago Region",
    bestSeason: "December to February for summer hiking or July to August for alpine skiing",
    knownFor: "Milford Sound day trips, Skyline Gondola, Lake Wakatipu steamers, Routeburn Track",
    tripLength: "4 to 6 days",
    transitNotes: "Queenstown Airport is located 10 minutes from downtown with frequent Orbus municipal connections and scenic flight charters."
  },
  {
    id: 7,
    slug: "osaka",
    code: "EA-02",
    loc: "LOC-34.6937",
    geo: "34.6937° N, 135.5023° E",
    name: "Osaka",
    country: "Japan",
    region: "East Asia",
    subRegion: "Kansai",
    regionSlug: "asia/japan/kansai",
    tag: "JPN",
    description: "Vibrant canal promenades, commercial neon districts, and street culinary culture.",
    overview: "Major financial and culinary hub of Western Japan famed for street cuisine, towering 16th-century castle grounds, and neon-lit entertainment hubs.",
    elevation: "15m",
    prefecture: "Osaka Prefecture",
    bestSeason: "March to May and October to November",
    knownFor: "Dotonbori neon canal, Osaka Castle, Kuromon Market, Shinsekai",
    tripLength: "2 to 3 nights",
    transitNotes: "Direct JR Special Rapid lines connect to Kyoto in 28 minutes and Kobe in 22 minutes."
  },
  {
    id: 8,
    slug: "nara",
    code: "EA-03",
    loc: "LOC-34.6851",
    geo: "34.6851° N, 135.8048° E",
    name: "Nara",
    country: "Japan",
    region: "East Asia",
    subRegion: "Kansai",
    regionSlug: "asia/japan/kansai",
    tag: "JPN",
    description: "Ancient temples, roaming park deer, and early Japanese architecture.",
    overview: "Japan's first permanent imperial capital, home to monumental wooden temples, world's largest bronze Buddha statue, and hundreds of freely roaming sika deer.",
    elevation: "74m",
    prefecture: "Nara Prefecture",
    bestSeason: "Spring and Autumn",
    knownFor: "Todai-ji temple, Nara Deer Park, Kasuga Taisha shrine, Kofuku-ji",
    tripLength: "Day trip or 1 night",
    transitNotes: "JR Yamatoji Rapid Service connects JR Osaka Station to JR Nara in 39 minutes."
  },
  {
    id: 9,
    slug: "kobe",
    code: "EA-04",
    loc: "LOC-34.6901",
    geo: "34.6901° N, 135.1955° E",
    name: "Kobe",
    country: "Japan",
    region: "East Asia",
    subRegion: "Kansai",
    regionSlug: "asia/japan/kansai",
    tag: "JPN",
    description: "Harbor city nestled between Mount Rokko and Osaka Bay with maritime heritage.",
    overview: "Cosmopolitan coastal city known for signature wagyu beef, historic foreign merchant residences in Kitano, and natural onsen hot springs in Arima.",
    elevation: "32m",
    prefecture: "Hyogo Prefecture",
    bestSeason: "Year-round, especially Autumn",
    knownFor: "Kobe Harborland, Mount Rokko ropeway, Arima Onsen, Kitano Ijinkan",
    tripLength: "1 to 2 days",
    transitNotes: "Hankyu and Hanshin railway networks link Sannomiya to Osaka Umeda within 30 minutes."
  }
];

export default destinationData;
