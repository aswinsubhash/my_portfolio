export type SkillGroup = { group: string; items: string[] };

export type Experience = {
  company: string;
  location: string;
  role: string;
  duration: string;
  description: string[];
};

export type Project = {
  title: string;
  summary: string;
  description: string[];
  tags: string[];
  accent: string;
  highlights?: string[];
  links?: {
    playStore?: string;
    appStore?: string;
  };
};

export type Education = {
  degree: string;
  institution: string;
  duration: string;
};

export type CertificationCategory = "ai-agentic" | "mobile-cs";

export type Certification = {
  title: string;
  issuer: string;
  issued: string;
  category: CertificationCategory;
  accent: string;
  credentialId?: string;
  skills?: string[];
};

export const personal = {
  name: "Aswin Subhash",
  location: "Dubai, UAE",
  title: "Mobile Application Developer",
  subtitle: "Flutter Expert · Cross-Platform Specialist",
  tagline:
    "High-performance mobile applications. Clean architecture, scalable systems, production-grade delivery for Android & iOS.",
  bio: "3+ years building high-performance, scalable mobile applications with Flutter and Dart. Strong in clean architecture, state management, CI/CD automation, secure API integrations, and performance optimization. Track record of crash-free, production-grade apps with fast load times and efficient deployments. Experienced collaborating across teams, building real-time systems, and shipping to both Google Play and App Store.",
  email: "aswinofficial3@gmail.com",
  github: "https://github.com/aswinsubhash",
  linkedin: "https://www.linkedin.com/in/aswinsubhash",
  resume: "/Aswin_Subhash_Mobile_Application_Developer_CV_2026.pdf",
  available: true,
} as const;

export const skills: SkillGroup[] = [
  {
    group: "Languages & Frameworks",
    items: ["Flutter", "Dart", "Android", "iOS"],
  },
  {
    group: "State Management",
    items: ["BLoC", "GetX", "Provider", "Riverpod"],
  },
  {
    group: "Architecture",
    items: ["Clean Architecture", "MVVM", "MVC", "SOLID Principles"],
  },
  {
    group: "Database & APIs",
    items: ["Firebase", "Firestore", "Hive", "REST APIs", "Swagger", "Postman"],
  },
  {
    group: "Integrations",
    items: [
      "Google Maps",
      "Stripe",
      "Payment Gateways",
      "Branch.io",
      "AppsFlyer",
      "Bugsnag",
      "OpenStreet",
    ],
  },
  {
    group: "CI/CD & Tools",
    items: [
      "CI/CD",
      "Shorebird",
      "Codemagic",
      "Git",
      "GitHub",
      "GitLab",
      "Bitbucket",
      "App Store Connect",
      "Google Play Console",
      "Android Studio",
      "VS Code",
      "Xcode",
    ],
  },
  {
    group: "AI & Agentic",
    items: ["Claude Code", "OpenAI Codex", "Open Code", "Antigravity", "Ollama"],
  },
];

export const experience: Experience[] = [
  {
    company: "Marhaba Group of Companies | Marhaba Auctions",
    location: "Dubai, UAE · On-site",
    role: "Flutter Developer | AI Agentic Workflow",
    duration: "Mar 2026 – Present",
    description: [
      "Led the migration of a production Android (Kotlin) and iOS (Swift) application to Flutter for M1 Shipping, a vehicle logistics company operating across the UAE, Oman, and Iraq, delivering the project end-to-end in 30 days.",
      "Designed and implemented a scalable clean architecture across presentation, domain, and data layers, powering a feature-rich application with dual-flavor UAE and Iraq builds from a single codebase.",
      "Delivered end-to-end authentication, shipment and vehicle tracking, finance workflows, pricing and terms logic, and a Sell Your Car flow with VIN search and shareable listings.",
      "Implemented pagination, search, sorting, and filtering across modules, with market-specific app identities, assets, and business logic.",
      "Established a robust Flutter foundation using BLoC, Dio, GetIt, go_router, structured error handling, token-based authentication, environment switching, and ARB localization for Arabic, Kurdish, Pashto, Farsi, Georgian and English with full RTL/LTR support.",
      "Led an AI-augmented development workflow using Claude Code, multi-agent analysis, Codex generation, Ollama cloud models, automated commit messages, PR descriptions, and pre-commit reviews to accelerate delivery and improve code quality.",
      "Owned planning, system design, architecture, and implementation to ensure scalability and maintainability across multiple markets.",
    ],
  },
  {
    company: "JIITAK Inc",
    location: "Fukuoka, Japan",
    role: "Flutter Developer",
    duration: "Jan 2024 – Oct 2025",
    description: [
      "Delivered multiple high-performance Flutter apps for Japanese clients with 99% crash-free sessions and 40% faster load times through advanced code and asset optimization.",
      "Implemented Shorebird OTA updates, achieving 95% reduction in release turnaround time and seamless rollout of critical updates.",
      "Led development of a 360° property inspection system enabling residents and inspectors to upload panoramic defect images, improving report accuracy by 45% and reducing dispute resolution time by 30%.",
      "Rebuilt a legacy production application from scratch using modern Flutter best practices, resulting in 99% app stability and drastically improved UX performance.",
      "Integrated Push Notification, AppsFlyer, Branch.io, and deep-linking for enhanced tracking and user engagement.",
      "Maintained clean, modular code architecture (MVC, MVVM, Clean Architecture), reducing code duplication and improving development speed by 30%.",
      "Deployed apps to Play Store and App Store with 100% approval on every release.",
    ],
  },
  {
    company: "Norq Technologies",
    location: "Kochi, Kerala",
    role: "Flutter Developer",
    duration: "Sep 2023 – Dec 2023",
    description: [
      "Engineered a real-time vehicle tracking platform for a Qatar client using Flutter, Socket.io, and Google Maps, delivering live location updates with sub-second accuracy, route visualization, geofencing, and trip history playback.",
      "Optimized location-refresh logic and data streaming, improving tracking precision and boosting fleet monitoring efficiency by 40% for logistics managers.",
      "Implemented modular architecture, enabling smoother map rendering and reducing API calls by 25%.",
      "Collaborated with backend teams to design scalable socket-event flows and ensure system reliability during peak load.",
    ],
  },
  {
    company: "Brototype",
    location: "Trivandrum, Kerala",
    role: "Flutter Developer Intern",
    duration: "Jul 2022 – Feb 2023",
    description: [
      "Completed an intensive 6-month Flutter development program with hands-on project experience.",
      "Gained strong practical skills in mobile app development, UI/UX implementation, and REST API integration.",
      "Collaborated with mentors and peers to debug complex issues and optimize app performance across multiple real-world projects.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "M1 Shipping",
    summary:
      "Vehicle logistics platform for UAE, Oman & Iraq — migrated from native Android/iOS to Flutter in 30 days. Dual-flavor builds, full RTL/LTR, 6-language support.",
    description: [
      "Led end-to-end migration of a production Android (Kotlin) and iOS (Swift) app to Flutter in 30 days, delivering a feature-rich vehicle logistics platform across UAE, Oman, and Iraq.",
      "Architected dual-flavor UAE/Iraq builds from a single codebase using clean architecture across presentation, domain, and data layers.",
      "Delivered shipment & vehicle tracking, finance workflows, pricing and terms logic, and a Sell Your Car flow with VIN search and shareable listings.",
      "Built full RTL/LTR localization in Arabic, Kurdish, Pashto, Farsi, Georgian and English using ARB files.",
      "Implemented BLoC, Dio, GetIt, go_router with token-based auth, environment switching, and structured error handling.",
    ],
    tags: ["Flutter", "Clean Architecture", "Multi-flavor", "RTL/LTR", "BLoC"],
    accent: "cyan",
    highlights: ["30-day delivery", "UAE · Oman · Iraq", "6 languages"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.m1shipping.android&hl=en_US",
      appStore: "https://apps.apple.com/ae/app/m1-shipping/id6505103589",
    },
  },
  {
    title: "Okinawa Navi",
    summary:
      "Regional information app for Okinawa with live news, weather alerts, event updates, and gourmet recommendations. 10,000+ Android downloads.",
    description: [
      "Developed a regional information app for Okinawa, Japan, featuring live news, weather alerts, event updates, and gourmet recommendations.",
      "Implemented in-app WebView to load external articles, videos, and local content smoothly within the app.",
      "Integrated an interactive rain map to help users track live precipitation and weather patterns.",
      "Published on Play Store and App Store, achieving strong adoption with 10,000+ Android downloads.",
    ],
    tags: ["Flutter", "WebView", "Maps", "Push Notifications"],
    accent: "teal",
    highlights: ["10,000+ Android downloads"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.proalliance.okinavi&hl=en_US",
      appStore: "https://apps.apple.com/jp/app/%E6%B2%96%E7%B8%84%E3%83%8A%E3%83%93/id1623775334",
    },
  },
  {
    title: "Look Meal",
    summary:
      "Nutrition and food search app — calorie lookup, ingredients, packaged products, with advanced filtering and personalized food collections.",
    description: [
      "Created a cross-platform nutrition search app that lets users look up calories and nutrient details for dishes, ingredients, and packaged products with advanced sorting and filtering.",
      "Implemented stamp-collection rewards, in-app social sharing, and personalized food collections.",
      "Published on Play Store and App Store, gaining steady adoption in Japan.",
    ],
    tags: ["Flutter", "REST APIs", "Search", "Gamification"],
    accent: "emerald",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.allright.lookmeal&hl=en_US",
      appStore: "https://apps.apple.com/jp/app/%E3%83%AB%E3%83%83%E3%82%AF%E3%83%9F%E3%83%BC%E3%83%AB-%E3%82%AB%E3%83%AD%E3%83%AA%E3%83%BC-%E6%A0%84%E9%A4%8A%E7%B4%A0-pfc-%E3%83%80%E3%82%A4%E3%82%A8%E3%83%83%E3%83%88-%E5%A4%96%E9%A3%9F/id6478847606",
    },
  },
  {
    title: "Tabeh GPS",
    summary:
      "Smart, secure real-time vehicle tracking with sub-second GPS, geofencing, fuel alerts, and trip playback. Used by fleet managers in Saudi Arabia.",
    description: [
      "Engineered a real-time vehicle tracking application using Flutter, enabling precise live GPS updates, trip history playback, fuel alerts, and geofence monitoring.",
      "Implemented route history and trip playback features to help users review past trips with detailed insights.",
      "Added fuel monitoring with automated alerts for sudden fuel drops and unusual consumption patterns.",
      "Built instant notifications for ignition status, speeding, and geofence breaches.",
      "Integrated geofencing and safety zones, allowing users to set virtual boundaries and receive automatic alerts.",
      "Added advanced analytics for driver behavior, vehicle performance, and trip efficiency.",
      "Published on Play Store and App Store with growing adoption among fleet managers in Saudi Arabia.",
    ],
    tags: ["Flutter", "Socket.io", "Google Maps", "Geofencing", "Analytics"],
    accent: "rose",
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.tabehgps.app&hl=en_US",
      appStore: "https://apps.apple.com/us/app/tabeh-gps/id6736398833",
    },
  },
  {
    title: "Rental Anshin Kun",
    summary:
      "360° damage reporting system — connected Resident and Inspector apps with panoramic room views and QR-embedded uploads for Japanese property management.",
    description: [
      "Built an interconnected Resident and Inspector app system for centralized property damage reporting in Japan.",
      "Implemented 360° panoramic room views allowing users to pin exact damage locations.",
      "Built QR-embedded image uploads to ensure transparent and trackable evidence.",
      "Enabled inspectors to verify resident-reported damages or add new findings within the same system.",
      "Streamlined communication and improved reporting accuracy across multiple property management teams.",
    ],
    tags: ["Flutter", "360° View", "QR", "Multi-app System"],
    accent: "indigo",
  },
  {
    title: "M1 Cam",
    summary:
      "Warehouse capture app for M1 Shipping teams — sign in, search lots, VINs, or containers, capture media, manage documents, save GPS location, and complete loading tasks.",
    description: [
      "Built a Flutter capture flow for warehouse staff to authenticate through the M1 reports API and resume work from a persisted local session.",
      "Supported Lot No., VIN, and Container workflows with featured, vehicle, damage, loading, and offloading media capture.",
      "Implemented shipment document, invoice, B/L, and other document uploads with local picking constrained to PDF and DOCX files.",
      "Added GPS location capture, loading-completion actions for supported container workflows, offline reachability UI, and session-clearing logout.",
    ],
    tags: ["Flutter", "Media Capture", "Documents", "GPS", "Connectivity"],
    accent: "amber",
    highlights: ["Warehouse workflow", "Lot · VIN · Container", "PDF/DOCX uploads"],
  },
  {
    title: "M1 Yard",
    summary:
      "Mobile operations app for selected-yard workflows — gate-pass verification, VIN scanning, vehicle movements, GPS location updates, stock browsing, and stock audits.",
    description: [
      "Built a Flutter operations app with feature-first Clean Architecture, BLoC state management, authenticated API workflows, and yard-scoped local persistence.",
      "Implemented session restore, yard selection, VIN QR/barcode scanning, vehicle lookup, movement recording, GPS location read/save, and M1 gate-pass verification.",
      "Delivered stock dashboards, customer-level counts, debounced server-side vehicle search, full vehicle records, cached media carousels, and fullscreen zoom.",
      "Added active-audit start/continue flows, manual or scanned VIN audit entry, found/missing/extra counts, audit completion, Excel report download, and coordinated token refresh on 401 responses.",
    ],
    tags: ["Flutter", "Clean Architecture", "BLoC", "Barcode", "Stock Audits"],
    accent: "violet",
    highlights: ["Yard operations", "VIN scanning", "Excel audit reports"],
  },
];

export const education: Education[] = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution:
      "Rohini College of Engineering & Technology, Kanyakumari (Anna University)",
    duration: "2017 – 2021",
  },
  {
    degree: "Higher Secondary School in Science",
    institution: "S.N English Medium School",
    duration: "2015 – 2017",
  },
  {
    degree: "Secondary School Leaving Certificate (S.S.L.C)",
    institution: "Boys Higher Secondary School",
    duration: "2015",
  },
];

export const certifications: Certification[] = [
  {
    title: "Future of AI",
    issuer: "BlueDot Impact",
    issued: "Jun 2026",
    credentialId: "reczloms9vqvNvPMKw",
    category: "ai-agentic",
    accent: "blue",
  },
  {
    title: "Introduction to Model Context Protocol",
    issuer: "Anthropic",
    issued: "Jun 2026",
    credentialId: "8t7ivr84q2jt",
    category: "ai-agentic",
    accent: "stone",
  },
  {
    title: "Agents and Workflows",
    issuer: "OpenAI",
    issued: "Jun 2026",
    credentialId: "8efns37995",
    category: "ai-agentic",
    accent: "emerald",
  },
  {
    title: "Applied AI Foundations",
    issuer: "OpenAI",
    issued: "Jun 2026",
    credentialId: "mv1hi4x93n",
    category: "ai-agentic",
    accent: "emerald",
  },
  {
    title: "AI Foundations",
    issuer: "OpenAI",
    issued: "Jun 2026",
    credentialId: "6mfkgq2433",
    category: "ai-agentic",
    accent: "emerald",
  },
  {
    title: "Certificate of completion: Claude code 101",
    issuer: "Anthropic",
    issued: "Jun 2026",
    credentialId: "zwtkfzwdgs35",
    category: "ai-agentic",
    accent: "stone",
  },
  {
    title: "Certificate of completion: AI Capabilities and Limitations",
    issuer: "Anthropic",
    issued: "Jun 2026",
    credentialId: "vwva6vxm7f2y",
    category: "ai-agentic",
    accent: "stone",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    issued: "Jun 2026",
    credentialId: "59ggyk7ndjmp",
    category: "ai-agentic",
    accent: "stone",
  },
  {
    title: "Certificate of completion: Introduction to agent skills",
    issuer: "Anthropic",
    issued: "Jun 2026",
    credentialId: "nqebewtwqqm6",
    category: "ai-agentic",
    accent: "stone",
  },
  {
    title: "Give Your AI Agent Skills",
    issuer: "LinkedIn",
    issued: "Jun 2026",
    category: "ai-agentic",
    accent: "sky",
    skills: ["AI Agents", "Agentic AI Development"],
  },
  {
    title: "Agentic AI Fundamentals: Architectures, Frameworks, and Applications",
    issuer: "LinkedIn",
    issued: "Jun 2026",
    category: "ai-agentic",
    accent: "sky",
    skills: ["AI for Business"],
  },
  {
    title: "Building AI That Remembers: Architecting Reliable, Context-Aware Enterprise Agents",
    issuer: "LinkedIn",
    issued: "Jun 2026",
    category: "ai-agentic",
    accent: "sky",
    skills: [
      "Artificial Intelligence (AI)",
      "AI Policy",
      "Governance",
      "Regulation",
    ],
  },
  {
    title: "Agentic AI: Build Your First Agentic AI System",
    issuer: "LinkedIn",
    issued: "Jun 2026",
    category: "ai-agentic",
    accent: "sky",
    skills: ["Artificial Intelligence (AI)", "AI Agents"],
  },
  {
    title: "Java Data Structures and Algorithms",
    issuer: "Udemy",
    issued: "Oct 2023",
    credentialId: "UC-878c8b2e-151e-4a9a-9a39-a5d656287500",
    category: "mobile-cs",
    accent: "violet",
    skills: ["Data Structure and Algorithms"],
  },
  {
    title: "Flutter Bloc Essential Course",
    issuer: "Udemy",
    issued: "Oct 2023",
    credentialId: "UC-37bf235e-8d03-4ed6-bc53-61f9b503382e",
    category: "mobile-cs",
    accent: "violet",
    skills: ["Bloc State Management"],
  },
  {
    title: "Flutter Provider Essential Course",
    issuer: "Udemy",
    issued: "Aug 2023",
    credentialId: "UC-91858f78-67ce-4035-8e84-5bf91ebc21a8.pdf",
    category: "mobile-cs",
    accent: "violet",
    skills: ["Provider State Management"],
  },
  {
    title: "Flutter Complete Course [2023] Edition",
    issuer: "Udemy",
    issued: "Jun 2023",
    credentialId: "UC-1a43d7ad-035e-47d9-9446-9716cd3004b1",
    category: "mobile-cs",
    accent: "violet",
    skills: ["Flutter"],
  },
];

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;
