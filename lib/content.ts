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
};

export type Education = {
  degree: string;
  institution: string;
  duration: string;
};

export const personal = {
  name: "Aswin Subhash",
  location: "Dubai, UAE",
  title: "Mobile Application Developer",
  subtitle: "Flutter Expert · Cross-Platform Specialist",
  tagline:
    "High-performance mobile applications. Clean architecture, scalable systems, production-grade delivery for Android & iOS.",
  bio: "2.5+ years building high-performance, scalable mobile applications with Flutter and Dart. Strong in clean architecture, state management, CI/CD automation, secure API integrations, and performance optimization. Track record of crash-free, production-grade apps with fast load times and efficient deployments. Experienced collaborating across teams, building real-time systems, and shipping to both Google Play and App Store.",
  email: "aswinofficial3@gmail.com",
  github: "https://github.com/aswinsubhash",
  linkedin: "https://www.linkedin.com/in/aswinsubhash",
  resume: "/Aswin_Subhash_Resume.pdf",
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
    items: ["Claude Code", "OpenAI Codex", "Antigravity", "Ollama"],
  },
];

export const experience: Experience[] = [
  {
    company: "JIITAK Facilitating Pvt Ltd",
    location: "Kochi, Kerala",
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

export const navSections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
