export interface ContinentalDivision {
  id: number;
  name: string;
  code: string;
  settlements: string;
  terrain: string;
  subregions: string;
  jurisdiction: string;
  linkText: string;
  path: string;
}

export const continentalDivisions: ContinentalDivision[] = [
  {
    id: 1,
    name: "East Asia",
    code: "DIV-EA • PACIFIC RIM",
    settlements: "18 settlements",
    terrain: "TERRAIN: ISLAND ARCS & BASINS",
    subregions: "Sub-regions: Japan, South Korea, Taiwan • 18 cataloged settlements",
    jurisdiction: "JURISDICTION CODE 01",
    linkText: "Browse East Asia →",
    path: "/regions/asia/japan/kansai"
  },
  {
    id: 2,
    name: "Southern Europe",
    code: "DIV-SE • MEDITERRANEAN BASIN",
    settlements: "24 settlements",
    terrain: "TERRAIN: KARST & MARITIME VALLEYS",
    subregions: "Sub-regions: Italy, Spain, Greece, Portugal • 24 cataloged settlements",
    jurisdiction: "JURISDICTION CODE 02",
    linkText: "Browse Southern Europe →",
    path: "/regions/europe/italy/tuscany"
  },
  {
    id: 3,
    name: "Scandinavia",
    code: "DIV-SC • BALTIC SHIELD",
    settlements: "12 settlements",
    terrain: "TERRAIN: GLACIAL FJORDS & ARCHIPELAGOS",
    subregions: "Sub-regions: Norway, Sweden, Denmark, Finland • 12 cataloged settlements",
    jurisdiction: "JURISDICTION CODE 03",
    linkText: "Browse Scandinavia →",
    path: "/regions/europe/norway/vestland"
  },
  {
    id: 4,
    name: "Central & South America",
    code: "DIV-CSA • ANDEAN CORDILLERA",
    settlements: "16 settlements",
    terrain: "TERRAIN: HIGHLAND PLATEAUS & CANOPIES",
    subregions: "Sub-regions: Mexico, Peru, Colombia, Chile • 16 cataloged settlements",
    jurisdiction: "JURISDICTION CODE 04",
    linkText: "Browse Latin America →",
    path: "/regions/americas/peru/cusco"
  }
];

export const kansaiRegion = {
  name: "Kansai Region",
  description: "The cultural and historical heart of western Honshu, encompassing ancient capitals, mountain pilgrimage routes, and major culinary ports.",
  parent: "Japan",
  grandparent: "Asia",
  prefectures: "Prefectures: 7 (Mie, Shiga, Kyoto, Osaka, Hyogo, Nara, Wakayama)",
  spatialMetrics: {
    index: "LOC-34.6937°N",
    admin: "Kinki Chiho (近畿地方)",
    area: "33,112.40 km²",
    population: "~22.4M",
    gateway: "KIX (Kansai Intl Airport)"
  },
  destinations: [
    {
      id: 1,
      name: "Kyoto",
      code: "PREF-26",
      tag: "Imperial Capital",
      shortCode: "#KYO",
      coords: "35.0116° N, 135.7681° E",
      description: "Historic temples, traditional craft districts, and tea ceremony traditions"
    },
    {
      id: 7,
      name: "Osaka",
      code: "PREF-27",
      tag: "Metropolis Hub",
      shortCode: "#OSA",
      coords: "34.6937° N, 135.5023° E",
      description: "Vibrant canal promenades, commercial neon districts, and street culinary culture"
    },
    {
      id: 8,
      name: "Nara",
      code: "PREF-29",
      tag: "Historical Center",
      shortCode: "#NAR",
      coords: "34.6851° N, 135.8048° E",
      description: "Ancient temples, roaming park deer, and early Japanese architecture"
    },
    {
      id: 9,
      name: "Kobe",
      code: "PREF-28",
      tag: "Port Coastal",
      shortCode: "#UKB",
      coords: "34.6901° N, 135.1955° E",
      description: "Harbor city nestled between Mount Rokko and Osaka Bay with maritime heritage"
    }
  ]
};
