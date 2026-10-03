import {
  SectionId,
  NavItem,
  PageDef,
  ContentBlock,
  TableSpec,
  DownloadFile,
  GalleryPhoto,
  Position,
  LocationInfo,
  StatItem,
  HomeImage,
} from '../types';

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const HOME_IMAGES: HomeImage[] = [
  {
    src: '/images/home/hero-machining.svg',
    alt: 'CNC machining cell producing precision components in a modern factory',
    caption: 'Modern CNC machining capability',
  },
  {
    src: '/images/home/cnc-turning.svg',
    alt: 'Precision turning operation on a CNC lathe',
    caption: 'CNC turning with live tooling',
  },
  {
    src: '/images/home/cnc-milling.svg',
    alt: 'Five-axis CNC milling of an aluminium housing',
    caption: 'Five-axis milling centres',
  },
  {
    src: '/images/home/sheet-metal.svg',
    alt: 'Sheet metal laser cutting and forming in a fabrication plant',
    caption: 'Laser cutting and forming',
  },
  {
    src: '/images/home/assembly-line.svg',
    alt: 'Assembly line with torque-controlled fastening stations',
    caption: 'Value-added assembly',
  },
  {
    src: '/images/home/cmm-inspection.svg',
    alt: 'Coordinate measuring machine inspecting a first article',
    caption: 'CMM quality inspection',
  },
];

const productSpec = (
  materials: string,
  tolerance: string,
  size: string,
  finish: string,
  volume: string,
  standards: string
): TableSpec => ({
  headers: ['Parameter', 'Details'],
  caption: 'Typical capability envelope',
  rows: [
    ['Materials', materials],
    ['Tolerance', tolerance],
    ['Size Range', size],
    ['Surface Finish', finish],
    ['Production Volume', volume],
    ['Industry Standards', standards],
  ],
});

interface ChildSeed {
  label: string;
  summary: string;
  bullets: string[];
  specs?: TableSpec;
  steps?: string[];
  files?: DownloadFile[];
  photos?: GalleryPhoto[];
  positions?: Position[];
  responsibilities?: string[];
  qualifications?: string[];
  formKind?: 'contact' | 'inquiry' | 'rfq' | 'careers';
  locations?: LocationInfo[];
  newsItems?: { date: string; title: string; text: string }[];
}

interface SectionSeed {
  id: SectionId;
  label: string;
  path: string;
  heading: string;
  intro: string;
  landingStats?: StatItem[];
  hero?: { title: string; text: string };
  children: ChildSeed[];
}

const SECTIONS: SectionSeed[] = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    heading: 'Precision Manufacturing. Engineered Around You.',
    intro:
      'Sembros Electric Co. is a full-service precision manufacturing company supplying machined, fabricated and assembled components to demanding industries worldwide.',
    hero: {
      title: 'Sembros Electric Co.',
      text: 'One partner for CNC machining, sheet metal fabrication, welded assemblies and custom manufacturing — built on 25+ years of engineering excellence.',
    },
    landingStats: [
      { label: 'Years in Business', value: '25+' },
      { label: 'Machines on Floor', value: '140+' },
      { label: 'Countries Served', value: '18' },
      { label: 'Parts Delivered / Year', value: '4.2M' },
    ],
    children: [
      {
        label: 'Welcome',
        summary:
          'A message from leadership on our commitment to quality, delivery and long-term manufacturing partnerships.',
        bullets: [
          'Thank you for visiting Sembros Electric Co.',
          'We combine engineering depth with modern CNC and fabrication capability.',
          'Our promise: right part, right quality, right time.',
          'We serve OEMs and Tier-1 suppliers across core industries.',
          'This site presents our products, processes, quality systems and careers.',
        ],
      },
      {
        label: 'Company Overview',
        summary:
          'Sembros Electric Co. is an independently owned precision manufacturer founded in 1998 with a 68,000 m² campus.',
        bullets: [
          'Founded in 1998 as a precision machining workshop.',
          'Headquartered in Pune, India with 68,000 m² of manufacturing space.',
          '1,250+ employees including 310 engineers and inspectors.',
          'Annual production capacity of over 4.2 million components.',
          'Certified to ISO 9001, IATF 16949 and AS9100D.',
          'Exports to 18 countries across 4 continents.',
        ],
      },
      {
        label: 'Featured Products',
        summary:
          'A preview of our most requested product families: CNC machined parts, precision components, sheet metal and assemblies.',
        bullets: [
          'CNC Machined Parts — prismatic and rotational machining.',
          'Precision Components — close-tolerance turned and milled details.',
          'Sheet Metal Parts — laser-cut, punched and formed enclosures.',
          'Fabricated Parts — welded frames, brackets and structures.',
          'Assemblies — sub-assembly and kitting with full traceability.',
        ],
      },
      {
        label: 'Manufacturing Highlights',
        summary:
          'An overview of the process capabilities that keep Sembros at the front of precision manufacturing.',
        bullets: [
          'CNC Turning up to Ø400 mm with live tooling.',
          'CNC Milling and 5-axis VMC machining of complex geometries.',
          'In-house Tool Room for fixtures, dies and form tools.',
          'Climate-controlled inspection laboratory with CMM.',
          'Dedicated packaging line with export-grade protection.',
        ],
      },
      {
        label: 'Certifications',
        summary:
          'Our quality management systems are certified to international and automotive industry standards.',
        bullets: [
          'ISO 9001:2015 — Quality Management System.',
          'IATF 16949:2016 — Automotive Quality Management.',
          'AS9100D — Aerospace Quality Management.',
          'ISO 14001 — Environmental Management.',
          'ISO 45001 — Occupational Health & Safety.',
        ],
      },
      {
        label: 'Industries Served',
        summary:
          'We serve safety-critical and performance-driven sectors with certified processes and materials.',
        bullets: [
          'Automotive — powertrain, chassis and EV components.',
          'Aerospace — structural and system components.',
          'Electrical — switchgear, connectors and busbars.',
          'Energy — wind, solar and power distribution parts.',
          'Medical — instrument and device components.',
        ],
      },
      {
        label: 'Latest News',
        summary: 'Company announcements, capacity expansions and industry updates from Sembros Electric Co.',
        bullets: [
          'New 5-axis machining cell commissioned Q3 2026.',
          'Expansion of aerospace certified machining area.',
          'Sembros named preferred supplier by two Tier-1 automotive groups.',
          'Installation of fully automated CMM inspection line.',
        ],
        newsItems: [
          {
            date: 'Sep 2026',
            title: 'New 5-axis machining cell goes live',
            text: 'A new high-productivity 5-axis machining cell has been commissioned, adding capacity for complex aerospace and defence components.',
          },
          {
            date: 'Aug 2026',
            title: 'Automated CMM inspection line installed',
            text: 'Sembros installed a fully automated coordinate measuring line, reducing inspection lead time by 40%.',
          },
          {
            date: 'Jul 2026',
            title: 'Preferred supplier recognition',
            text: 'Two Tier-1 automotive groups recognised Sembros for on-time delivery and zero-defect performance.',
          },
        ],
      },
    ],
  },
  {
    id: 'about-us',
    label: 'About Us',
    path: '/about-us',
    heading: 'Who We Are',
    intro:
      'Learn about Sembros Electric Co. — our history, vision, leadership, infrastructure, manufacturing footprint, certifications and global reach.',
    children: [
      {
        label: 'Company Profile',
        summary:
          'An independent precision manufacturer with a quarter-century track record and a vertically integrated production campus.',
        bullets: [
          'Privately held company founded in 1998.',
          'Core focus: precision machining, sheet metal and assemblies.',
          'Integrated tool room, heat treatment partners and finishing lines.',
          'Serving OEMs and Tier-1 suppliers in 18 countries.',
          '4.2M+ parts shipped annually across all product families.',
        ],
      },
      {
        label: 'Vision & Mission',
        summary: 'Our purpose, direction and the values that guide every part we make.',
        bullets: [
          'Vision: To be the most trusted precision manufacturing partner in our served industries.',
          'Mission: Deliver zero-defect components on time through engineering, technology and people.',
          'Value 1: Quality without compromise.',
          'Value 2: Customer intimacy and responsiveness.',
          'Value 3: Safety, sustainability and continuous learning.',
        ],
      },
      {
        label: 'Management Team',
        summary: 'Experienced leadership spanning engineering, quality, operations and business development.',
        bullets: [
          'Mr. R. Sembros — Founder & Managing Director.',
          'Ms. A. Varma — Director of Quality and Compliance.',
          'Mr. K. Deshmukh — Chief Operations Officer.',
          'Dr. P. Iyer — Head of Engineering and R&D.',
          'Ms. N. Kulkarni — Head of Sales and Global Accounts.',
        ],
      },
      {
        label: 'Infrastructure',
        summary: 'Purpose-built facilities engineered for precision, cleanliness and efficient material flow.',
        bullets: [
          '68,000 m² campus with dedicated machining and fabrication halls.',
          'Centralised utility plant with UPS-backed precision power.',
          'Controlled-access tool stores and calibrated gauge rooms.',
          'Dedicated raw material and finished goods warehouses.',
          'In-house training centre for machinists and inspectors.',
        ],
      },
      {
        label: 'Manufacturing Facilities',
        summary: 'A modern machine park organised into focused factories for turning, milling, sheet metal and assembly.',
        bullets: [
          'Turning plant: 60+ CNC lathes with bar feeders and live tooling.',
          'Milling plant: 45+ CNC mills including 11 five-axis VMCs.',
          'Sheet metal plant: laser, turret punch, press brakes and welding cells.',
          'Assembly halls with torque-controlled fastening and leak testing.',
          'Tool room with wire EDM, surface and cylindrical grinding.',
        ],
      },
      {
        label: 'Certifications',
        summary: 'Certified management systems that demonstrate our process rigour and industry compliance.',
        bullets: [
          'ISO 9001:2015 — Quality Management.',
          'IATF 16949:2016 — Automotive Quality.',
          'AS9100D — Aerospace Quality.',
          'ISO 14001:2015 — Environmental Management.',
          'ISO 45001:2018 — Occupational Health & Safety.',
        ],
      },
      {
        label: 'Global Presence',
        summary: 'Export capability supported by logistics partners, local sales representation and export documentation expertise.',
        bullets: [
          'Direct exports to 18 countries across Europe, North America and Asia.',
          'Regional sales representation in Germany and the United States.',
          'DDP / DAP / FOB shipment experience with full export compliance.',
          'Multi-currency invoicing and international quality documentation.',
          'Warehousing support at two overseas consolidation hubs.',
        ],
      },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    path: '/products',
    heading: 'Products & Capabilities',
    intro:
      'Explore our full product range — from close-tolerance CNC machined parts to sheet metal components, fabrications and value-added assemblies.',
    children: [
      {
        label: 'CNC Machined Parts',
        summary:
          'Prismatic and rotational machined components produced on modern CNC turning and milling centres.',
        bullets: [
          'Multi-axis machining of complex, tight-tolerance details.',
          'Materials: aluminium, steel, stainless steel, brass, titanium.',
          'In-process probing and post-process CMM verification.',
          'Prototype to series production with rapid ramp-up.',
          'Deburring, washing and preservation as standard.',
        ],
        specs: productSpec(
          'Aluminium, steel, stainless, brass, titanium, plastics',
          '±0.01 mm (process-dependent)',
          'Ø2 mm to Ø400 mm turning; 800 x 500 x 400 mm milling',
          'Ra 0.4 to Ra 3.2 µm',
          '1 to 500,000 pieces',
          'ISO 9001, IATF 16949, AS9100D'
        ),
      },
      {
        label: 'Precision Components',
        summary: 'High-accuracy components with tight geometric tolerances, verified by CMM and optical measurement.',
        bullets: [
          'True-position and profile tolerances to ±0.005 mm.',
          'Honed, lapped and matched assemblies available.',
          'Material certification and full dimensional reports.',
          'Support for high-nickel alloys and hardened steels.',
          'Cleanroom-compatible cleaning for critical applications.',
        ],
        specs: productSpec(
          'Stainless, tool steel, Inconel, titanium, aluminium',
          '±0.005 mm on critical features',
          'Ø1 mm to Ø250 mm',
          'Ra 0.2 µm achievable',
          'Prototype to 200,000 pieces',
          'AS9100D, ISO 13485'
        ),
      },
      {
        label: 'Turned Components',
        summary: 'Precision turned parts from sliding-head and fixed-head CNC lathes with sub-spindle operations.',
        bullets: [
          'Sliding headstock machining of small diameters down to Ø1 mm.',
          'Sub-spindle back-working reduces secondary operations.',
          'Live tooling for cross-drilling, milling and threading.',
          'High-volume production from bar feeders.',
          'Consistent surface finish and burr-free edges.',
        ],
        specs: productSpec(
          'Brass, aluminium, steel, stainless, copper alloys',
          '±0.01 mm',
          'Ø1 mm to Ø100 mm; length up to 300 mm',
          'Ra 0.8 µm typical',
          '1,000 to 1,000,000 pieces',
          'IATF 16949, ISO 9001'
        ),
      },
      {
        label: 'Milled Components',
        summary: 'CNC-milled parts including housings, manifolds, brackets and custom prismatic geometry.',
        bullets: [
          '3-, 4- and 5-axis milling of housings and manifolds.',
          'Deep-hole and angled feature machining.',
          'Prototype machining with quick-turn fixturing.',
          'Machining of castings and forgings to finished parts.',
          'Tight flatness and parallelism requirements met routinely.',
        ],
        specs: productSpec(
          'Aluminium, steel, stainless, magnesium, composites',
          '±0.01 mm',
          'Up to 800 x 500 x 400 mm',
          'Ra 0.8 µm typical',
          '1 to 100,000 pieces',
          'ISO 9001, AS9100D'
        ),
      },
      {
        label: 'Sheet Metal Parts',
        summary: 'Laser-cut, punched and precision-formed sheet metal components and enclosures.',
        bullets: [
          'Fibre laser cutting with clean, precise edges.',
          'CNC turret punching for high-volume profiles.',
          'Precision press braking and rolling.',
          'Riveting, clinching, stud and insert installation.',
          'Powder coating, wet paint and plating through partners.',
        ],
        specs: productSpec(
          'CRCA, stainless, aluminium, galvanised steel',
          '±0.1 mm cut; ±0.5° bend',
          'Up to 3,000 x 1,500 mm sheets; 0.5–8 mm thickness',
          'Primer, powder coat, plating',
          '1 to 100,000 pieces',
          'ISO 9001, ISO 14001'
        ),
      },
      {
        label: 'Fabricated Parts',
        summary: 'Welded steel and stainless fabrications including frames, brackets, bases and structural assemblies.',
        bullets: [
          'MIG, TIG and spot welding with qualified welders.',
          'Welding procedure specifications (WPS / PQR).',
          'Jig-based assembly for repeatable dimensions.',
          'Stress relieving and surface protection available.',
          'Substructures up to 3 tonnes per assembly.',
        ],
        specs: productSpec(
          'Mild steel, stainless steel, aluminium',
          '±0.5 mm general fabrication',
          'Up to 3,000 mm x 2,000 mm x 1,500 mm',
          'Primer, powder coat, hot-dip galvanising',
          '1 to 5,000 assemblies',
          'ISO 9001, EN 1090 support'
        ),
      },
      {
        label: 'Assemblies',
        summary: 'Value-added sub-assemblies combining machined, fabricated and purchased components with full traceability.',
        bullets: [
          'Mechanical and electro-mechanical sub-assemblies.',
          'Torque-controlled fastening with digital records.',
          'Press-fit, adhesive bonding and sealing operations.',
          'Leak testing, functional testing and marking.',
          'Kitting and sequencing for customer production lines.',
        ],
        specs: productSpec(
          'Mixed materials per assembly BOM',
          'Per customer drawing / PPAP',
          'Up to 2,000 mm envelope',
          'As specified',
          '100 to 500,000 assemblies',
          'IATF 16949, ISO 9001'
        ),
      },
      {
        label: 'Custom Manufacturing',
        summary: 'Engineer-to-order manufacturing for unique requirements, special materials and demanding schedules.',
        bullets: [
          'Dedicated engineering review for every custom project.',
          'DFM feedback to reduce cost and improve manufacturability.',
          'Special material sourcing including exotic alloys.',
          'Custom packaging, labelling and documentation.',
          'Rapid prototyping before series production.',
        ],
        specs: productSpec(
          'All machinable metals and selected plastics',
          'Project-specific',
          'Project-specific',
          'Project-specific',
          '1 to 500,000 pieces',
          'ISO 9001, customer-specific requirements'
        ),
      },
    ],
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    path: '/manufacturing',
    heading: 'Manufacturing Processes',
    intro:
      'Our vertically integrated process chain — from turning and milling to tooling, inspection, packaging and dispatch — is engineered for repeatability.',
    children: [
      {
        label: 'CNC Turning',
        summary: 'Precision turning of rotational parts with sub-spindle and live tool capability.',
        bullets: [
          'Fixed-head and sliding-head CNC lathes.',
          'Live tooling for milling and drilling in one setup.',
          'Bar feeding for unattended high-volume runs.',
          'In-machine probing for process control.',
        ],
        steps: [
          'Review drawing and define machining strategy.',
          'Select material, bar stock and cutting tools.',
          'Generate and simulate CNC program.',
          'Set up machine, jaws and workholding.',
          'Machine first article and verify dimensions.',
          'Run series production with in-process checks.',
          'Deburr, wash and preserve finished part.',
        ],
      },
      {
        label: 'CNC Milling',
        summary: 'Three-, four- and five-axis milling of prismatic components and housings.',
        bullets: [
          'Vertical machining centres with high-pressure coolant.',
          'Automatic tool changers up to 60 tools.',
          'Pallet systems for reduced setup time.',
          'Five-axis simultaneous machining of complex surfaces.',
        ],
        steps: [
          'Interpret 3D model and tolerance callouts.',
          'Design fixture or select standard workholding.',
          'Program toolpaths and simulate collisions.',
          'Set up machine, tools and workpiece offsets.',
          'Prove out program and verify first-off on CMM.',
          'Run batch with periodic SPC checks.',
          'Finish, clean and stage for inspection.',
        ],
      },
      {
        label: 'VMC Machining',
        summary: 'Vertical machining centre capability for multi-face and five-axis precision work.',
        bullets: [
          '11 five-axis VMCs for single-setup complex parts.',
          'High-speed spindles up to 24,000 rpm.',
          'Tilt-rotary tables for multi-face access.',
          'Integrated coolant-through-tool for deep features.',
        ],
        steps: [
          'Define datum and clamping strategy.',
          'Create 5-axis NC program with post-processor.',
          'Simulate machine kinematics.',
          'Setup and align rotary table.',
          'Probe workpiece for offsets.',
          'Machine and inspect critical features.',
          'Document machine and operator data.',
        ],
      },
      {
        label: 'Tool Room',
        summary: 'In-house design and manufacture of fixtures, gauges, dies and special tooling.',
        bullets: [
          'Wire EDM and spark erosion for complex profiles.',
          'Surface and cylindrical grinding to close limits.',
          'Fixture design with modular and dedicated elements.',
          'Gauge calibration and storage system.',
        ],
        steps: [
          'Receive part print and define tooling needs.',
          'Design fixture, gauge or die in CAD.',
          'Machine tooling components in tool room.',
          'Heat treat and grind where required.',
          'Try out tooling on production machine.',
          'Validate and release for production.',
        ],
      },
      {
        label: 'Inspection',
        summary: 'Multi-stage inspection from first article to final audit using calibrated, traceable equipment.',
        bullets: [
          'CMM inspection with automated programs.',
          'Surface roughness and contour measurement.',
          'Hardness testing and material verification.',
          'First Article Inspection per AS9102.',
        ],
        steps: [
          'Review drawing and inspection plan.',
          'Calibrate instruments to NABL standards.',
          'Perform first article inspection.',
          'Conduct in-process patrol inspection.',
          'Execute final inspection before packing.',
          'Generate inspection reports and certifications.',
        ],
      },
      {
        label: 'Packaging',
        summary: 'Engineered packaging that protects parts during transit and supports customer line-side needs.',
        bullets: [
          'Anti-corrosion VCI and oil preservation.',
          'Custom thermoformed trays and dunnage.',
          'Kitting to customer part-number sequence.',
          'Export-grade crating and palletisation.',
        ],
        steps: [
          'Define packaging specification per part.',
          'Apply preservation and corrosion protection.',
          'Place parts in trays, bags or custom dunnage.',
          'Label with part number and batch traceability.',
          'Palletise, strap and shrink-wrap loads.',
          'Prepare dispatch documentation.',
        ],
      },
      {
        label: 'Dispatch',
        summary: 'Timely dispatch with transport planning, documentation and shipment tracking.',
        bullets: [
          'Daily dispatch planning aligned to customer schedules.',
          'Air, sea and road freight coordination.',
          'Export documentation and compliance support.',
          'Real-time shipment tracking with consignment updates.',
        ],
        steps: [
          'Confirm order completion and quality release.',
          'Generate invoice, packing list and certificates.',
          'Book transport with preferred logistics partners.',
          'Load, secure and document shipments.',
          'Hand over and track until customer receipt.',
        ],
      },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    path: '/industries',
    heading: 'Industries We Serve',
    intro:
      'Our certified processes and engineering experience let us support safety-critical and high-performance industries worldwide.',
    children: [
      {
        label: 'Automotive',
        summary: 'High-volume precision components and assemblies for IC and electric vehicle platforms.',
        bullets: [
          'Powertrain components, brackets and housings.',
          'EV motor, inverter and battery pack parts.',
          'PPAP Level 3 documentation as standard.',
          'Zero-defect programmes with SPC and poke-yoke.',
        ],
      },
      {
        label: 'Aerospace',
        summary: 'AS9100D-certified machining of structural and system components for aerospace programmes.',
        bullets: [
          'Structural brackets, fittings and housings.',
          'First Article Inspection per AS9102.',
          'Special process management and traceability.',
          'Aerospace-grade aluminium, titanium and steel.',
        ],
      },
      {
        label: 'Electrical',
        summary: 'Components for switchgear, distribution and electrical equipment manufacturers.',
        bullets: [
          'Busbars, contacts, connectors and terminals.',
          'Copper and aluminium machining and plating.',
          'High-conductivity material handling.',
          'Batch traceability for electrical safety parts.',
        ],
      },
      {
        label: 'Industrial Equipment',
        summary: 'Robust components for machinery, hydraulics and industrial automation OEMs.',
        bullets: [
          'Hydraulic manifolds, blocks and connectors.',
          'Gearbox and pump components.',
          'Wear parts and precision housings.',
          'Medium- to high-volume series production.',
        ],
      },
      {
        label: 'Medical',
        summary: 'Precision components supporting instrument and device manufacturers.',
        bullets: [
          'Surgical instrument components and handles.',
          'Biocompatible stainless and titanium machining.',
          'Cleanroom-compatible cleaning and packing.',
          'Full material and process traceability.',
        ],
      },
      {
        label: 'Defence',
        summary: 'Machined and fabricated components for defence and security equipment programmes.',
        bullets: [
          'Optics housings and weapon system components.',
          'Strict documentation and configuration control.',
          'Controlled procurement and material certification.',
          'Dedicated secure production zones.',
        ],
      },
      {
        label: 'Energy',
        summary: 'Parts for power generation, transmission and renewable energy systems.',
        bullets: [
          'Wind turbine machining and fabrication.',
          'Solar tracker components and mounts.',
          'Power distribution fittings and enclosures.',
          'Corrosion-resistant finishes for outdoor service.',
        ],
      },
    ],
  },
  {
    id: 'quality',
    label: 'Quality',
    path: '/quality',
    heading: 'Quality Assurance',
    intro:
      'Quality is engineered into every process step at Sembros — from incoming material to final inspection and continuous improvement.',
    children: [
      {
        label: 'Quality Policy',
        summary: 'Our company-wide commitment to deliver conforming products on time, every time.',
        bullets: [
          'Zero-defect mindset at every workstation.',
          'Right-first-time through process prevention.',
          'Customer focus in all quality decisions.',
          'Compliance with ISO, IATF and customer requirements.',
          'Continuous improvement driven by data and people.',
        ],
      },
      {
        label: 'Inspection Process',
        summary: 'A staged inspection regime covering incoming, in-process, final and dock audit.',
        bullets: [
          'Incoming material verification with certificates.',
          'First article inspection against drawing.',
          'Patrol inspection with SPC for critical features.',
          'Final inspection with automated CMM.',
          'Dock audit and packing verification.',
        ],
      },
      {
        label: 'Testing Equipment',
        summary: 'Modern metrology and testing capability to verify every critical characteristic.',
        bullets: [
          'Coordinate measuring machines (CMM) with automated programs.',
          'Surface roughness and contour testers.',
          'Hardness testers — Rockwell, Brinell and Vickers.',
          'Profile projectors and vision measuring systems.',
          'Torque, leak and functional test rigs.',
        ],
      },
      {
        label: 'Certifications',
        summary: 'Internationally recognised certifications that back our quality promise.',
        bullets: [
          'ISO 9001:2015 certificate valid through 2027.',
          'IATF 16949:2016 for automotive supply.',
          'AS9100D for aerospace programmes.',
          'ISO 14001 and ISO 45001 for environment and safety.',
        ],
      },
      {
        label: 'Continuous Improvement',
        summary: 'Programmes that systematically reduce variation, waste and lead time.',
        bullets: [
          'Lean Six Sigma projects led by certified belts.',
          '5S workplace organisation across all shops.',
          'Total Productive Maintenance on key machines.',
          'Employee suggestion scheme with rewards.',
          'Supplier development and scorecard reviews.',
        ],
      },
    ],
  },
  {
    id: 'rnd',
    label: 'R&D',
    path: '/rnd',
    heading: 'Research & Development',
    intro:
      'Our engineering-led R&D function develops new processes, products and manufacturing technologies for the future.',
    children: [
      {
        label: 'Research Projects',
        summary: 'Applied research in machining science, materials and process automation.',
        bullets: [
          'High-speed machining parameter optimisation.',
          'Hard part machining and tool life extension.',
          'Near-net-shape processes to reduce waste.',
          'Digital twin simulation of machining lines.',
          'Sustainable cutting fluids and recycling.',
        ],
      },
      {
        label: 'Product Development',
        summary: 'Supporting customers from concept to certified production parts.',
        bullets: [
          'Prototype development with rapid iteration.',
          'DFM and cost-engineering workshops.',
          'Material selection and testing support.',
          'Process validation and PPAP execution.',
          'Design-for-manufacturing feedback loops.',
        ],
      },
      {
        label: 'Engineering Team',
        summary: 'A multi-disciplinary team that turns ideas into manufacturable products.',
        bullets: [
          '90+ engineers across design, process and quality.',
          'Mechanical, metallurgical and automation specialists.',
          'CAD / CAM expertise in leading platforms.',
          'Dedicated customer programme engineers.',
          'Training partnerships with technical institutes.',
        ],
      },
      {
        label: 'Innovation Programs',
        summary: 'Structured programmes to capture ideas and scale winning innovations.',
        bullets: [
          'Annual innovation challenge across all plants.',
          'Cross-functional kaizen teams.',
          'Pilot line for validating new processes.',
          'Partnerships with research universities.',
          'Patent and trade-secret protection framework.',
        ],
      },
    ],
  },
  {
    id: 'gallery',
    label: 'Gallery',
    path: '/gallery',
    heading: 'Gallery',
    intro: 'A visual tour of our factory, machines, products, people and events.',
    children: [
      {
        label: 'Factory Photos',
        summary: 'Inside our manufacturing campus and production halls.',
        bullets: ['Clean, organised production floors.', 'Climate-controlled inspection lab.', 'Central tool stores and material zones.'],
        photos: [
          { label: 'Main Machining Hall', caption: 'CNC turning line with bar feeders running around the clock.', tone: 'steel' },
          { label: 'Milling Bay', caption: 'Five-axis VMC cell machining complex housings.', tone: 'blue' },
          { label: 'Inspection Lab', caption: 'Controlled environment with automated CMM.', tone: 'slate' },
          { label: 'Sheet Metal Plant', caption: 'Fibre laser and press brake cell forming enclosures.', tone: 'teal' },
          { label: 'Warehouse', caption: 'Raw material and finished goods storage with FIFO control.', tone: 'navy' },
          { label: 'Assembly Hall', caption: 'Sub-assembly lines with digital torque control.', tone: 'indigo' },
        ],
      },
      {
        label: 'Machines',
        summary: 'Key production machinery on our shop floor.',
        bullets: ['CNC lathes, mills, VMCs.', 'Laser, punch, press brakes.', 'CMM and measurement systems.'],
        photos: [
          { label: 'Sliding-Head Lathe', caption: 'High-volume small-diameter turning with sub-spindle.', tone: 'steel' },
          { label: 'Five-Axis VMC', caption: 'Single-setup machining of complex aerospace parts.', tone: 'blue' },
          { label: 'Fibre Laser', caption: '3 kW fibre laser cutting up to 8 mm steel.', tone: 'slate' },
          { label: 'Press Brake', caption: 'CNC press brake with automatic angle correction.', tone: 'teal' },
          { label: 'Coordinate Measuring Machine', caption: 'Automated full-surface scanning and reporting.', tone: 'navy' },
          { label: 'Wire EDM', caption: 'Tool room wire cut machine for precision tooling.', tone: 'indigo' },
        ],
      },
      {
        label: 'Products',
        summary: 'Examples of components we manufacture every day.',
        bullets: ['Machined, turned and milled parts.', 'Sheet metal and fabrications.', 'Finished assemblies.'],
        photos: [
          { label: 'Precision Housing', caption: 'Five-axis machined aluminium housing with ±0.01 mm features.', tone: 'steel' },
          { label: 'Turned Shaft', caption: 'Ground and polished shaft with tight circularity.', tone: 'blue' },
          { label: 'Sheet Metal Enclosure', caption: 'Laser-cut, formed and powder-coated enclosure.', tone: 'slate' },
          { label: 'Welded Frame', caption: 'MIG-welded steel frame with dimensional jig check.', tone: 'teal' },
          { label: 'Hydraulic Manifold', caption: 'Machined manifold with cross-drilled galleries.', tone: 'navy' },
          { label: 'EV Bracket Assembly', caption: 'Assembled bracket kit ready for line-side delivery.', tone: 'indigo' },
        ],
      },
      {
        label: 'Team',
        summary: 'The people behind our precision and service.',
        bullets: ['Engineers, machinists, inspectors and support staff.', 'Training and safety culture.', 'Diverse and skilled workforce.'],
        photos: [
          { label: 'Engineering Office', caption: 'Programme engineers reviewing a new customer drawing set.', tone: 'steel' },
          { label: 'Machinists at Work', caption: 'Set-up team proving out a new CNC program.', tone: 'blue' },
          { label: 'Quality Inspectors', caption: 'Inspector verifying first article on the CMM.', tone: 'slate' },
          { label: 'Training Session', caption: 'New hires in the Sembros training centre.', tone: 'teal' },
          { label: 'Leadership Review', caption: 'Monthly operations and quality review meeting.', tone: 'navy' },
          { label: 'Assemblers', caption: 'Assembly line team building customer sub-assemblies.', tone: 'indigo' },
        ],
      },
      {
        label: 'Events',
        summary: 'Trade shows, customer visits and company milestones.',
        bullets: ['Industry exhibitions.', 'Customer audits and visits.', 'Awards and recognitions.'],
        photos: [
          { label: 'Trade Show Booth', caption: 'Sembros at an international manufacturing exhibition.', tone: 'steel' },
          { label: 'Customer Visit', caption: 'Customer audit team touring the machining plant.', tone: 'blue' },
          { label: 'Safety Week', caption: 'Annual safety awareness drive with demonstrations.', tone: 'slate' },
          { label: 'Supplier Award', caption: 'Receiving a preferred supplier award from a Tier-1 OEM.', tone: 'teal' },
          { label: 'Technology Day', caption: 'Internal technology showcase for employees.', tone: 'navy' },
          { label: 'Founding Day', caption: 'Celebrating 25 years of precision manufacturing.', tone: 'indigo' },
        ],
      },
    ],
  },
  {
    id: 'downloads',
    label: 'Downloads',
    path: '/downloads',
    heading: 'Downloads',
    intro: 'Download company literature, certificates, brochures and datasheets in standard formats.',
    children: [
      {
        label: 'Company Profile PDF',
        summary: 'A complete overview of Sembros Electric Co., our capabilities and industries served.',
        bullets: ['Corporate overview and history.', 'Product and process capability matrix.', 'Global footprint and key customers.'],
        files: [
          { name: 'Sembros-Company-Profile-2026.pdf', type: 'PDF', size: '6.2 MB', updated: 'Sep 2026', description: 'Full company profile with capability matrix.' },
          { name: 'Sembros-Company-Profile-Short.pdf', type: 'PDF', size: '2.1 MB', updated: 'Sep 2026', description: 'Two-page summary profile.' },
        ],
      },
      {
        label: 'Brochures',
        summary: 'Product-focused brochures for each major capability.',
        bullets: ['Machining, sheet metal, fabrication and assembly brochures.', 'Industry-specific literature.', 'Multi-language versions available.'],
        files: [
          { name: 'CNC-Machining-Brochure.pdf', type: 'PDF', size: '3.4 MB', updated: 'Aug 2026', description: 'CNC turning and milling capabilities.' },
          { name: 'Sheet-Metal-Brochure.pdf', type: 'PDF', size: '2.8 MB', updated: 'Aug 2026', description: 'Laser cutting, forming and fabrication.' },
          { name: 'Assemblies-Brochure.pdf', type: 'PDF', size: '1.9 MB', updated: 'Jul 2026', description: 'Value-added assembly services.' },
        ],
      },
      {
        label: 'Certificates',
        summary: 'Current management system certificates for customer audits.',
        bullets: ['ISO 9001:2015 certificate.', 'IATF 16949:2016 certificate.', 'AS9100D certificate.'],
        files: [
          { name: 'ISO-9001-2015-Certificate.pdf', type: 'PDF', size: '0.8 MB', updated: 'Jan 2026', description: 'ISO 9001:2015 quality certification.' },
          { name: 'IATF-16949-2016-Certificate.pdf', type: 'PDF', size: '0.9 MB', updated: 'Jan 2026', description: 'IATF 16949 automotive certification.' },
          { name: 'AS9100D-Certificate.pdf', type: 'PDF', size: '0.9 MB', updated: 'Mar 2026', description: 'AS9100D aerospace certification.' },
        ],
      },
      {
        label: 'Datasheets',
        summary: 'Technical datasheets for standard products and process capabilities.',
        bullets: ['Tolerance capability datasheets.', 'Material compatibility charts.', 'Surface finish specifications.'],
        files: [
          { name: 'Machining-Tolerance-Datasheet.pdf', type: 'PDF', size: '1.1 MB', updated: 'Jun 2026', description: 'Machining tolerances and finish capabilities.' },
          { name: 'Materials-Compatibility-Chart.pdf', type: 'PDF', size: '0.7 MB', updated: 'May 2026', description: 'Machinable materials by product family.' },
          { name: 'Surface-Finish-Specifications.pdf', type: 'PDF', size: '0.6 MB', updated: 'May 2026', description: 'Available finishes, plating and coatings.' },
        ],
      },
    ],
  },
  {
    id: 'careers',
    label: 'Careers',
    path: '/careers',
    heading: 'Careers at Sembros',
    intro: 'Build your career with a growing precision manufacturer. Explore open roles, apply online or join our internship program.',
    children: [
      {
        label: 'Open Positions',
        summary: 'Current vacancies across engineering, manufacturing, quality and support functions.',
        bullets: ['Roles across all plants and departments.', 'Competitive pay and benefits.', 'Strong training and growth pathways.'],
        positions: [
          { title: 'CNC Programmer / Setter', dept: 'Manufacturing', loc: 'Pune, India', type: 'Full-time' },
          { title: 'Quality Inspector (CMM)', dept: 'Quality', loc: 'Pune, India', type: 'Full-time' },
          { title: 'Process Engineer', dept: 'Engineering', loc: 'Pune, India', type: 'Full-time' },
          { title: 'Sales Engineer — Europe', dept: 'Sales', loc: 'Remote, Germany', type: 'Full-time' },
          { title: 'Maintenance Technician', dept: 'Plant Engineering', loc: 'Pune, India', type: 'Full-time' },
        ],
        responsibilities: [
          'Understand and follow work instructions and drawings.',
          'Maintain quality and productivity standards.',
          'Participate in continuous improvement activities.',
          'Follow safety and 5S requirements.',
        ],
        qualifications: ['Relevant diploma/degree and industry experience.', 'Strong attention to detail.', 'Good communication and teamwork.'],
      },
      {
        label: 'Apply Online',
        summary: 'Submit your application through our online form and our HR team will get in touch.',
        bullets: ['Upload your resume and cover letter.', 'Shortlisted candidates are contacted within two weeks.', 'Interviews held on-site or virtually.'],
        formKind: 'careers',
      },
      {
        label: 'Internship Program',
        summary: 'Structured internships for engineering and technical students.',
        bullets: [
          'Six-month engineering internships.',
          'Mentorship from senior engineers.',
          'Hands-on exposure to machining and quality.',
          'Opportunity for full-time conversion.',
        ],
        formKind: 'careers',
      },
    ],
  },
  {
    id: 'contact-us',
    label: 'Contact Us',
    path: '/contact-us',
    heading: 'Contact Us',
    intro:
      'Get in touch with our team for quotes, technical questions or partnership discussions. Use the forms below or reach one of our locations.',
    children: [
      {
        label: 'Contact Form',
        summary: 'Send us a general message and we will route it to the right team.',
        bullets: ['General enquiries.', 'Existing order follow-up.', 'Partnership discussions.'],
        formKind: 'contact',
      },
      {
        label: 'Locations',
        summary: 'Our headquarters, manufacturing campus and overseas sales offices.',
        bullets: ['Headquarters and main plant in Pune.', 'Sales office in Germany.', 'Sales office in the United States.'],
        locations: [
          { name: 'Headquarters & Plant I', lines: ['Sembros Electric Co.', 'Plot 42, Industrial Estate, Pune 411019, India', 'Phone: +91 20 4000 1234', 'Email: sales@sembros.com'] },
          { name: 'Plant II — Fabrication', lines: ['Sembros Fabrication Campus', 'Plot 78, Industrial Estate, Pune 411026, India', 'Phone: +91 20 4000 5678'] },
          { name: 'Europe Sales Office', lines: ['Sembros Europe GmbH', 'Industriestraße 12, 70190 Stuttgart, Germany', 'Phone: +49 711 222 333', 'Email: eu@sembros.com'] },
          { name: 'North America Sales Office', lines: ['Sembros North America LLC', '100 Precision Drive, Detroit, MI 48226, USA', 'Phone: +1 313 555 0100', 'Email: na@sembros.com'] },
        ],
      },
      {
        label: 'Inquiry Form',
        summary: 'Request technical information or clarification about our capabilities.',
        bullets: ['Capability and tolerance questions.', 'Material and process advice.', 'Documentation requests.'],
        formKind: 'inquiry',
      },
      {
        label: 'RFQ Form',
        summary: 'Request a quotation for a new part. Attach drawings for a faster response.',
        bullets: ['Upload drawings and specifications.', 'Tell us quantity and timeline.', 'Receive a quotation within 3 working days.'],
        formKind: 'rfq',
      },
    ],
  },
];

function buildBreadcrumb(section: SectionSeed, child?: ChildSeed): [string, string][] {
  const crumbs: [string, string][] = [['Home', '/']];
  if (section.path !== '/') crumbs.push([section.label, section.path]);
  if (child) crumbs.push([child.label, `${section.path}/${slug(child.label)}`]);
  return crumbs;
}

function pageKeywords(section: SectionSeed, child?: ChildSeed): string[] {
  const words = [section.label, section.heading, ...(child ? [child.label, child.summary] : [section.intro])];
  return Array.from(new Set(words.join(' ').toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)));
}

function blocksFor(section: SectionSeed, child?: ChildSeed): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const isHome = section.id === 'home';

  if (!child) {
    if (isHome && section.hero) {
      blocks.push({ type: 'hero', title: section.hero.title, text: section.hero.text });
    }
    blocks.push({ type: 'paragraph', text: section.intro });
    if (section.landingStats) blocks.push({ type: 'stats', stats: section.landingStats });
    if (isHome) {
      blocks.push({
        type: 'images',
        title: 'Manufacturing at a Glance',
        images: HOME_IMAGES,
      });
    }
    blocks.push({
      type: 'links',
      title: `Explore ${section.label}`,
      links: section.children.map((c) => ({ label: c.label, path: `${section.path}/${slug(c.label)}` })),
    });
    return blocks;
  }

  blocks.push({ type: 'paragraph', text: child.summary });

  if (child.bullets.length) blocks.push({ type: 'list', title: 'Key Points', items: child.bullets });

  switch (section.id) {
    case 'home':
      if (child.newsItems) blocks.push({ type: 'news', title: 'News & Announcements', newsItems: child.newsItems });
      break;
    case 'products':
      if (child.specs) blocks.push({ type: 'table', title: 'Specifications', table: child.specs });
      break;
    case 'manufacturing':
      if (child.steps) blocks.push({ type: 'steps', title: 'Process Steps', items: child.steps });
      break;
    case 'gallery':
      if (child.photos) blocks.push({ type: 'gallery', photos: child.photos });
      break;
    case 'downloads':
      if (child.files) blocks.push({ type: 'downloads', title: 'Available Files', files: child.files });
      break;
    case 'careers':
      if (child.positions) blocks.push({ type: 'positions', title: 'Current Openings', positions: child.positions });
      if (child.responsibilities)
        blocks.push({ type: 'list', title: 'Key Responsibilities', items: child.responsibilities });
      if (child.qualifications)
        blocks.push({ type: 'list', title: 'Qualifications', items: child.qualifications });
      if (child.formKind) blocks.push({ type: 'form', formKind: child.formKind, title: 'Apply Online' });
      break;
    case 'contact-us':
      if (child.locations) blocks.push({ type: 'locations', locations: child.locations });
      if (child.formKind) blocks.push({ type: 'form', formKind: child.formKind, title: child.label });
      break;
    case 'quality':
      if (child.label === 'Quality Policy')
        blocks.push({
          type: 'quote',
          text: 'We will deliver conforming product on time, every time — through disciplined processes, empowered people and data-driven improvement.',
        });
      break;
    case 'about-us':
      if (child.label === 'Vision & Mission')
        blocks.push({ type: 'quote', text: 'To be the most trusted precision manufacturing partner in our served industries.' });
      break;
    default:
      break;
  }

  return blocks;
}

function buildPages(): PageDef[] {
  const pages: PageDef[] = [];
  for (const section of SECTIONS) {
    pages.push({
      path: section.path,
      title: section.label === 'Home' ? 'Home — Sembros Electric Co.' : `${section.label} — Sembros Electric Co.`,
      section: section.id,
      sectionLabel: section.label,
      navLabel: section.label,
      breadcrumb: buildBreadcrumb(section),
      keywords: pageKeywords(section),
      summary: section.intro,
      blocks: blocksFor(section),
    });
    const childPath = section.path === '/' ? '/home' : section.path;
    for (const child of section.children) {
      const path = `${childPath}/${slug(child.label)}`;
      pages.push({
        path,
        title: `${child.label} — Sembros Electric Co.`,
        section: section.id,
        sectionLabel: section.label,
        navLabel: child.label,
        breadcrumb: buildBreadcrumb(section, child),
        keywords: pageKeywords(section, child),
        summary: child.summary,
        blocks: blocksFor(section, child),
      });
    }
  }
  return pages;
}

export const allPages: PageDef[] = buildPages();

export const navigation: NavItem[] = SECTIONS.map((section) => ({
  id: section.id,
  label: section.label,
  path: section.path,
  children: section.children.map((child) => ({
    label: child.label,
    path: `${section.path === '/' ? '/home' : section.path}/${slug(child.label)}`,
  })),
}));

export function findPage(path: string): PageDef | undefined {
  const clean = path === '' ? '/' : path.replace(/\/+$/, '') || '/';
  return allPages.find((p) => p.path === clean);
}

export function searchPages(query: string, limit = 8): PageDef[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const scored = allPages
    .map((page) => {
      let score = 0;
      if (page.title.toLowerCase().includes(q)) score += 5;
      if (page.summary.toLowerCase().includes(q)) score += 3;
      const kw = page.keywords.join(' ');
      const hits = kw.split(q).length - 1;
      score += hits;
      return { page, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((r) => r.page);
}

export { slug };