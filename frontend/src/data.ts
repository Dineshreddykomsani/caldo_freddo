import { Service, Industry, ProcessStep, Statistic, Testimonial, Product } from './types';

export const companyContact = {
  phone: '+971 52 5060 253',
  email: 'tom@caldofreddo.me',
  address: 'Al Arab General Trading LLC, United Arab Emirates & SA',
  mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.1174620021673!2d55.2707828!3d25.2048493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43457ad79d47%3A0x2a934a5d8b74f34!2sDubai!5e0!3m2!1sen!2sae!4v1710000000000!5m2!1sen!2sae',
  facebook: 'https://facebook.com/caldofreddo',
  twitter: 'https://twitter.com/caldofreddo',
  linkedin: 'https://linkedin.com/company/caldofreddo',
  youtube: 'https://youtube.com/caldofreddo'
};

export const services: Service[] = [
  {
    id: 'ultrasonic-cleaning',
    title: 'Ultrasonic Cleaning Systems',
    description: 'Sole Distributor of UltraTecno in the UAE. Advanced cavitation technology for intricate components.',
    longDescription: 'As the official distributor of UltraTecno in the UAE, we offer cutting-edge ultrasonic cleaning solutions designed for high-precision industrial applications. Utilizing advanced multi-frequency cavitation, our systems remove contaminants from the most intricate geometries without causing wear or micro-abrasions.',
    iconName: 'Zap',
    image: 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: [
      'Cavitation-powered precision cleaning',
      'UltraTecno state-of-the-art power generators',
      'Environmentally friendly aqueous detergents',
      'Massive reduction in labor and solvent costs',
      'Perfect for engine blocks, filters, valves, and precision molds'
    ]
  },
  {
    id: 'polymer-barriers',
    title: 'Polymer Bumper Barriers',
    description: 'High-impact flexible protection barriers for warehouses, manufacturing, and industrial plants.',
    longDescription: 'Our advanced polymer bumper barrier systems deliver flexible, high-absorbency protection for your industrial assets, personnel, and building infrastructure. Engineered from resilient polymers that flex upon impact and return to their original shape, they prevent costly damages and equipment wear.',
    iconName: 'Shield',
    image: 'https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: [
      'High impact absorbency with dynamic flex memory',
      'Zero maintenance: rust-proof, scratch-proof, self-colored',
      'Modular layouts tailored to forklift & vehicle routes',
      'Compliant with international safety regulations',
      'Saves thousands in structural floor and wall repairs'
    ]
  },
  {
    id: 'industrial-coatings',
    title: 'Industrial Protection Coatings',
    description: 'Advanced polymer sealants and anti-corrosion barrier coatings for harsh GCC environments.',
    longDescription: 'We provide top-grade surface treatments and polymer protection coatings engineered to withstand the extreme temperature fluctuations, high humidity, and abrasive sands of the Arabian Gulf. Protect your steel columns, tanks, and floors from rapid chemical wear.',
    iconName: 'Droplet',
    image: 'https://images.pexels.com/photos/36184235/pexels-photo-36184235/free-photo-of-industrial-powder-coating-process-in-workshop.jpeg?auto=compress&cs=tinysrgb&w=1200',
    features: [
      'Extreme high-temperature & UV resistance',
      'Chemical and abrasive protection layers',
      'Anti-corrosion barriers for marine & oil rigs',
      'Professional preparation & application engineering',
      'Durable, long-lasting surface warranties'
    ]
  }
];

export const industries: Industry[] = [
  {
    id: 'manufacturing',
    name: 'Manufacturing & Heavy Industry',
    description: 'Enhancing productivity by keeping intricate tooling and molds spotless with custom ultrasonic bays.',
    iconName: 'Cpu',
    bgImage: 'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'oil-gas',
    name: 'Oil & Gas / Energy',
    description: 'Heavy-duty cleaning of valves, heat exchangers, and drilling components, alongside durable protection coatings.',
    iconName: 'Flame',
    bgImage: 'https://images.pexels.com/photos/247763/pexels-photo-247763.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'warehousing',
    name: 'Logistics & Warehousing',
    description: 'Protecting high-traffic sorting lanes, cold storages, and dock doors using polymer bumper barriers.',
    iconName: 'Container',
    bgImage: 'https://images.pexels.com/photos/1267327/pexels-photo-1267327.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'automotive-marine',
    name: 'Automotive & Marine',
    description: 'Ensuring pristine rebuilds of engine blocks, cylinder heads, and marine propellers via ultrasonic cavitation.',
    iconName: 'Ship',
    bgImage: 'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200'
  },
  {
    id: 'food-beverage',
    name: 'Food & Beverage Plants',
    description: 'Surgical hygiene compliance with food-grade ultrasonic cleaning and impact-resistant food-safe wall guards.',
    iconName: 'Beef',
    bgImage: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1200'
  }
];

export const processSteps: ProcessStep[] = [
  {
    stepNumber: 1,
    title: 'Understand Your Needs',
    description: 'We begin with a thorough, on-site analysis of your industrial cleaning and protection requirements to evaluate mechanical loads and chemical setups.',
    iconName: 'Search'
  },
  {
    stepNumber: 2,
    title: 'Tailored Solutions',
    description: 'Our senior engineers design a custom strategy, layout drawings, and detergent specs that meet your specific performance and regulatory goals.',
    iconName: 'Compass'
  },
  {
    stepNumber: 3,
    title: 'Ongoing Support',
    description: 'We handle professional installation, staff training, and provide continuous engineering support to ensure sustained, long-term operational success.',
    iconName: 'Activity'
  }
];

export const statistics: Statistic[] = [
  {
    value: '100%',
    label: 'Exclusive Distributor',
    description: 'Of UltraTecno ultrasonic cleaning technologies in the UAE.',
    iconName: 'Award'
  },
  {
    value: '99.8%',
    label: 'Cleaning Efficiency',
    description: 'Achieved on complex parts compared to traditional pressure washing.',
    iconName: 'Gauge'
  },
  {
    value: '65%',
    label: 'Labor Cost Savings',
    description: 'By transitioning to automated, chemical-optimized ultrasonic baths.',
    iconName: 'TrendingUp'
  },
  {
    value: '0%',
    label: 'Barrier Maintenance',
    description: 'Required by our dynamic memory polymer bumper systems.',
    iconName: 'Hammer'
  }
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'Before partnering with Caldo Freddo, our mold-cleaning turnaround took 8 hours of manual scrubbing. Now, their UltraTecno ultrasonic system cleans our intricate components in 20 minutes with absolute precision, extending our tool lifespan. An outstanding industrial upgrade!',
    author: 'Eng. Salem Al-Mansoori',
    role: 'Operations Director',
    company: 'Emirates Precision Molding LLC',
    location: 'Abu Dhabi, UAE',
    rating: 5
  },
  {
    id: '2',
    quote: 'We had persistent warehouse structural damage from forklifts. Caldo Freddo installed their dynamic polymer bumper barriers along our main transit lanes. The barriers have absorbed multiple impacts, flexing back perfectly without leaving a mark. Zero floor damage, zero maintenance.',
    author: 'Siddharth Mehta',
    role: 'Logistics Hub Manager',
    company: 'Gulf Warehousing & Supply Chain',
    location: 'Dubai, UAE',
    rating: 5
  },
  {
    id: '3',
    quote: 'Operating in the marine sector means severe corrosion. The industrial protection coatings applied by Caldo Freddo on our dock gears have resisted extreme saltwater splash and intense UV rays for 2 years without a single sign of peeling.',
    author: 'Capt. Tariq Al-Jamil',
    role: 'Technical Superintendent',
    company: 'Al-Jamil Marine Services',
    location: 'Sharjah, UAE',
    rating: 5
  }
];

export const clientDesires = {
  headline: 'Your Goals, Our Mission.',
  items: [
    {
      title: 'Ensure Precision Cleaning',
      desc: 'Achieve microscopic, residue-free cleanliness for highly intricate mechanical parts, molds, and filters.',
      icon: 'Target'
    },
    {
      title: 'Enhance Equipment Lifespan',
      desc: 'Extend asset durability and operational health with state-of-the-art polymer defense guards and shielding coatings.',
      icon: 'ShieldAlert'
    },
    {
      title: 'Maintain High Efficiency',
      desc: 'Eliminate manual labor bottlenecks, reduce water usage, and minimize plant downtime to elevate productivity.',
      icon: 'Lightbulb'
    }
  ]
};

export const painPoints = {
  headline: 'We Understand Your Struggles.',
  subtitle: 'Industrial operations are complex. Standard practices often fail to address deep-seated operational leaks.',
  struggles: [
    {
      type: 'Internal Struggle',
      worry: 'Quality Compromise',
      desc: 'Constantly worrying if manual cleaning or outdated chemical methods are slowly compromising the integrity and dimensional tolerance of your intricate components.',
      icon: 'ShieldX'
    },
    {
      type: 'External Struggle',
      worry: 'Frequent Breakdowns',
      desc: 'Facing repetitive mechanical failures, expensive downtime, and high maintenance costs because of micro-dust accumulation or fragile safety guards.',
      icon: 'Wrench'
    },
    {
      type: 'Philosophical Struggle',
      worry: 'Why Cleanliness is hard',
      desc: 'We firmly believe industrial cleaning and site protection should be completely seamless and dependable, rather than a daily high-risk maintenance headache.',
      icon: 'HeartHandshake'
    }
  ]
};

export const risksOfNotActing = {
  headline: 'What You’re Risking Without the Right Solution',
  items: [
    {
      title: 'Critical Equipment Failure',
      desc: 'Neglected microscopic soot or sand crusts lead to severe component grinding, seizure, and failure.',
      icon: 'AlertTriangle'
    },
    {
      title: 'Astronomical Maintenance Budgets',
      desc: 'Repetitive painting of steel barriers, repairing cracked floors, and manual scrubbing drains cash flow.',
      icon: 'DollarSign'
    },
    {
      title: 'Severe Plant Downtime',
      desc: 'Unplanned breakdowns due to forklift-rammed structural pillars can paralyze dispatch hubs for weeks.',
      icon: 'Clock'
    }
  ]
};

export const products: Product[] = [
  {
    slNo: 1,
    name: 'Industrial Ultrasonic Cleaning Machines',
    category: 'Industrial Products',
    manufacturerName: 'UltraTecno',
    manufacturerUrl: 'https://www.ultratecno.eu/',
    competitors: [
      { name: 'Rockwood Machinery', url: 'https://www.rockwoodmachinery.com/products/ultrasonic-cleaning-system/' }
    ],
    description: 'High-frequency cavitation bath systems for deep-precision cleaning of industrial components without mechanical abrasion. Sole distributor in the UAE.'
  },
  {
    slNo: 2,
    name: 'Warehouse Barriers',
    category: 'Industrial Products',
    manufacturerName: 'Rack Armour',
    manufacturerUrl: 'http://www.rackarmour.com/',
    description: 'Heavy-duty high-impact absorption polymer bumpers that flex on impact and return to shape to protect pillars, shelving, and walls.'
  },
  {
    slNo: 3,
    name: 'Natural Cleaning Solution / Sanitizer',
    category: 'Industrial Products',
    manufacturerName: 'Tersano',
    manufacturerUrl: 'https://eu.tersano.com/',
    description: 'Eco-friendly, chemical-free stabilized aqueous ozone systems that sanitize surfaces naturally, safely, and effectively.'
  },
  {
    slNo: 4,
    name: 'Coconut Leaf Straws',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Sunbird Straws',
    manufacturerUrl: 'https://sunbirdstraws.com/',
    competitors: [
      { name: 'Coconut Leaf Straw', url: 'http://coconutleafstraw.com/' },
      { name: 'Indisutras', url: 'https://indisutras.com/coconut-leaf-straws/' }
    ],
    description: '100% biodegradable, water-resistant, and chemical-free straws made from sustainably sourced fallen coconut leaves.'
  },
  {
    slNo: 5,
    name: 'Air Sanitizing Devices (Jonix)',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Jonix',
    manufacturerUrl: 'https://jonixair.com',
    description: 'Advanced cold plasma air purification and sanitization devices for residential, commercial, and industrial hygiene.'
  },
  {
    slNo: 6,
    name: 'Air Sanitizing Devices (Shycocan)',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Shycocan',
    manufacturerUrl: 'https://shycocancorp.com/',
    description: 'Innovative virus attenuation devices that neutralize active airborne coronaviruses in indoor spaces.'
  },
  {
    slNo: 7,
    name: 'Instant Wet Wipes',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Orontes UAE (Handy Towel)',
    manufacturerUrl: 'https://www.orontesuae.com/product-category/personal-care/handy-towel/',
    competitors: [
      { name: 'Sharaf DG', url: 'https://uae.sharafdg.com/brand/handy-towel/' }
    ],
    description: 'Premium, refreshing, individually wrapped sanitizing wet wipes for quick commercial and guest hygiene.'
  },
  {
    slNo: 8,
    name: 'Water Purification System',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Aquaguard UAE',
    manufacturerUrl: 'https://www.aquaguarduae.com/',
    description: 'High-efficiency multistage water filtration and purification solutions for pure, contaminant-free drinking water.'
  },
  {
    slNo: 9,
    name: 'Eco friendly commercial toilet',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Propelair',
    manufacturerUrl: 'https://propelair.com/',
    description: 'Ultra-low-flush vacuum toilets that reduce water usage by up to 84% in high-traffic commercial washrooms.'
  },
  {
    slNo: 10,
    name: 'Water Saving Nozzles',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Altered Company',
    manufacturerUrl: 'https://us.alteredcompany.com/collections/nozzles',
    description: 'Atomizing nozzles that screw onto existing taps to save up to 98% water without losing pressure or efficiency.'
  },
  {
    slNo: 11,
    name: 'Cassava Bags',
    category: 'Natural Eco Friendly Green Products',
    competitors: [
      { name: 'Rajmo Industries', url: 'http://www.rajmoindustries.com/bio-cassava-bags-6167475.html' },
      { name: 'I Am Green Bags', url: 'http://iamgreenbags.com/products.html' },
      { name: 'Green Bags UAE', url: 'https://greenbagsuae.com/' }
    ],
    description: '100% plastic-free, water-soluble, biodegradable bags made from cassava starch. Completely safe for marine life.'
  },
  {
    slNo: 12,
    name: 'Compactor Machine',
    category: 'Natural Eco Friendly Green Products',
    manufacturerName: 'Pakawaste',
    manufacturerUrl: 'https://www.pakawaste.co.uk/',
    description: 'Industrial waste balers and compactors designed to reduce bulk waste volume, optimizing storage and logistics.'
  },
  {
    slNo: 13,
    name: 'PVC Curtains',
    category: 'PVC & ABS Products',
    competitors: [
      { name: 'Korral Kool', url: 'https://www.korralkool.com/control' }
    ],
    description: 'Heavy-duty transparent and colored strip curtains designed to control temperature, dust, and insects in industrial spaces.'
  },
  {
    slNo: 14,
    name: 'PVC Aprons',
    category: 'PVC & ABS Products',
    competitors: [
      { name: 'Kerbl', url: 'https://www.kerbl.com/en/product/milking-and-washing-apron/147062/17129' }
    ],
    description: 'Durable, waterproof, and chemical-resistant industrial aprons perfect for food processing, cleaning, and maintenance.'
  },
  {
    slNo: 15,
    name: 'ABS Wall Panels',
    category: 'PVC & ABS Products',
    isOwnProduct: true,
    description: 'Sleek, high-impact resistant, hygienic wall cladding panels for clinical, food-grade, or chemical environments.'
  },
  {
    slNo: 16,
    name: 'PVC Shelf Talkers',
    category: 'PVC & ABS Products',
    competitors: [
      { name: 'Hiplastics', url: 'https://www.hiplastics.com/hiplastics-gls39-plastic-price-holder-for-supermarket-glass-shelves.html' }
    ],
    description: 'Clear plastic shelf-edge ticket holders and price displays for supermarkets, warehouses, and retail layouts.'
  },
  {
    slNo: 17,
    name: 'Medical Curtains',
    category: 'Curtains, Healthcare & Hospitality',
    isOwnProduct: true,
    description: 'Antimicrobial, flame-retardant, and fluid-resistant disposable or washable privacy cubicle curtains for clinics and hospitals.'
  },
  {
    slNo: 18,
    name: 'Shower Curtains',
    category: 'Curtains, Healthcare & Hospitality',
    isOwnProduct: true,
    description: 'Heavy-duty, mildew-resistant, water-repellent shower curtains designed for high-use hospitality, gym, and dorm layouts.'
  },
  {
    slNo: 19,
    name: 'AMC (Annual Maintenance Contract)',
    category: 'Maintenance & Technical Services',
    isOwnService: true,
    description: 'Comprehensive maintenance agreement covering routine testing, preventative cleaning, and rapid spare-part support.'
  }
];

