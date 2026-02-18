import 'package:flutter/material.dart';

class AppStrings {
  // Home Section
  static const String greeting = "Aswin Subhash";
  static const String homeLocation = "Dubai, UAE";
  static const String homeTitle =
      "Mobile Application Developer | Flutter Expert | Cross-Platform Specialist";
  static const String homeDescription =
      "High-performance Mobile Application Developer specializing in Flutter and Dart. Expert in clean architecture, scalable solutions, and delivering production-grade apps for Android & iOS.";
  static const List<String> roles = [
    "Flutter Developer",
    "Cross-Platform Expert",
  ];

  // About Section
  static const String aboutMeTitle = "About Me";
  static const String aboutMeDescription =
      "2.5+ years of experience as a Mobile Application Developer building high-performance, scalable mobile applications using Flutter and Dart. Strong in clean architecture, state management, CI/CD automation, secure API integrations, and performance optimization. Proven track record delivering crash-free, production-grade apps with fast load times and efficient deployments. Experienced in collaborating with cross-functional teams, building real-time systems, and publishing apps to both Google Play and App Store.";
  static const String skillsTitle = "Skills";
  static const List<String> skills = [
    // Languages & Frameworks
    "Flutter",
    "Dart",
    "Android",
    "iOS",

    // State Management
    "BLoC",
    "GetX",
    "Provider",
    "Riverpod",

    // Architecture
    "Clean Architecture",
    "MVVM",
    "MVC",
    "SOLID Principles",

    // Database & APIs
    "Firebase",
    "Firestore",
    "Hive",
    "REST APIs",
    "Swagger",
    "Postman",

    // Integrations
    "Google Maps",
    "Stripe",
    "Payment Gateways",
    "Branch.io",
    "AppsFlyer",
    "Bugsnag",
    "OpenStreet",

    // CI/CD & Tools
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
    "Antigravity",
    "Codex",
  ];

  // Projects Section
  static const String projectsTitle = "Projects";
  static const String projectsSubtitle = "";
  static const List<ProjectData> projects = [
    ProjectData(
      title: "Okinawa Navi - Regional Info & Utility App",
      description: [
        "Developed a regional information app for Okinawa in Japan featuring live news, weather alerts, event updates, and gourmet recommendations.",
        "Implemented in-app WebView to load external articles, videos, and local content smoothly within the app.",
        "Integrated an interactive rain map to help users track live precipitation and weather patterns.",
        "Published on Playstore and App Store, collectively achieving strong user adoption with 10,000+ downloads on Android.",
      ],
      color: Colors.teal,
    ),

    ProjectData(
      title: "Look Meal - Nutrition & Food Search App",
      description: [
        "Created a nutrition search cross platform app that lets users look up calories and nutrient details for dishes, ingredients, and packaged products, with advanced sorting and filtering tools.",
        "Implemented features such as stamp-collection rewards, in-app social sharing, and personalized food collections.",
        "Published on both Playstore and App Store, gaining steady user adoption in Japan.",
      ],
      color: Colors.green,
    ),
    ProjectData(
      title: "Tabeh GPS - Smart & Secure Real-Time Vehicle Tracking App",
      description: [
        "Engineered a real-time vehicle tracking application using Flutter, enabling precise live GPS updates, trip history playback, fuel alerts, and geofence monitoring.",
        "Implemented route history and trip playback features to help users review past trips with detailed insights.",
        "Added fuel monitoring with automated alerts for sudden fuel drops and unusual consumption patterns.",
        "Built instant notifications for ignition status, speeding, and geofence breaches.",
        "Integrated geofencing and safety zones, allowing users to set virtual boundaries and receive automatic alerts.",
        "Added advanced analytics for driver behavior, vehicle performance, and trip efficiency.",
        "Published on Playstore and App Store, with growing adoption among fleet managers in Saudi Arabia.",
      ],
      color: Colors.redAccent,
    ),
    ProjectData(
      title: "Rental Anshin Kun - 360° Damage Reporting System",
      description: [
        "Built an interconnected Resident and Inspector app system for centralized property damage reporting in Japan.",
        "Implemented 360° panoramic room views allowing users to pin exact damage locations.",
        "Built QR-embedded image uploads to ensure transparent and trackable evidence.",
        "Enabled inspectors to verify resident-reported damages or add new findings within the same system.",
        "Streamlined communication and improved reporting accuracy across multiple property management teams.",
      ],
      color: Colors.indigo,
    ),
  ];

  // Contact Section
  static const String contactTitle = "Contact";
  static const String contactSubtitle =
      "Reach out to discuss my work or just to connect.";
  static const String nameLabel = "Name";
  static const String nameHint = "Your Name";
  static const String emailLabel = "Email";
  static const String emailHint = "your.email@example.com";
  static const String subjectLabel = "Subject";
  static const String subjectHint = "What is this regarding?";
  static const String messageLabel = "Message";
  static const String messageHint = "Type your message here...";
  static const String sendMessage = "Send Message";
  static const String copyright = "© 2026 Aswin Subhash. All rights reserved.";
  static const String madeWith = "Made with ";
  static const String inFlutter = " in Flutter";

  // URLs
  static const String githubUrl = "https://github.com/aswinsubhash";
  static const String linkedinUrl = "https://www.linkedin.com/in/aswinsubhash";
  static const String emailUrl = "mailto:aswinofficial3@gmail.com";
  static const String emailAddress = "aswinofficial3@gmail.com";

  // Experience Section
  static const String experienceTitle = "Experience";
  static const String experienceSubtitle = "My journey as a developer";
  static const List<ExperienceData> experience = [
    ExperienceData(
      company: "JIITAK Facilitating Pvt Ltd",
      location: "Kochi, Kerala",
      role: "Flutter Developer",
      duration: "January 2024 – October 2025",
      description: [
        "Delivered multiple high-performance Flutter apps for Japanese clients with 99% crash-free sessions and 40% faster load times through advanced code and asset optimization.",
        "Implemented Shorebird OTA updates, achieving 95% reduction in release turnaround time and seamless rollout of critical updates.",
        "Led development of a 360° property inspection system enabling residents and inspectors to upload panoramic defect images, improving report accuracy by 45% and reducing dispute resolution time by 30%.",
        "Rebuilt a legacy production application from scratch using modern Flutter best practices, resulting in 99% app stability and drastically improved UX performance.",
        "Integrated Push Notification, AppsFlyer, Branch.io, and deep-linking for enhanced tracking and user engagement.",
        "Maintained clean, modular code architecture (MVC, MVVM, Clean Architecture), reducing code duplication and improving development speed by 30%.",
        "Deployed apps to Play Store and App Store with 100% approval on every release.",
      ],
    ),
    ExperienceData(
      company: "Norq Technologies",
      location: "Kochi, Kerala",
      role: "Flutter Developer",
      duration: "September 2023 – December 2023",
      description: [
        "Engineered a real-time vehicle tracking platform for Qatar client using Flutter, Socket.io, and Google Maps, delivering live location updates with sub-second accuracy, route visualization, geofencing, and trip history playback.",
        "Optimized location-refresh logic and data streaming, improving tracking precision and boosting fleet monitoring efficiency by 40% for logistics managers.",
        "Implemented modular architecture, enabling smoother map rendering and reducing API calls by 25%.",
        "Collaborated with backend teams to design scalable socket-event flows and ensure system reliability during peak load.",
      ],
    ),
    ExperienceData(
      company: "Brototype",
      location: "Trivandrum, Kerala",
      role: "Flutter Developer Internship",
      duration: "July 2022 – February 2023",
      description: [
        "Completed an intensive 6-month Flutter development program with hands-on project experience.",
        "Gained strong practical skills in mobile app development, UI/UX implementation, and REST API integration.",
        "Collaborated with mentors and peers to debug complex issues and optimize app performance across multiple real-world projects.",
      ],
    ),
  ];

  // Education Section
  static const String educationTitle = "Education";
  static const String educationSubtitle = "";
  static const List<EducationData> education = [
    EducationData(
      degree: "Bachelor of Engineering in Computer Science",
      institution:
          "Rohini College of Engineering & Technology, Kanyakumari (Anna University)",
      duration: "2017 – 2021",
    ),
    EducationData(
      degree: "Higher Secondary School in Science",
      institution: "S.N English Medium School",
      duration: "2015 - 2017",
    ),
    EducationData(
      degree: "Secondary School Leaving Certificate ( S.S.L.C)",
      institution: "Boys Higher Secondary School",
      duration: "2015",
    ),
  ];
}

class ExperienceData {
  final String company;
  final String location;
  final String role;
  final String duration;
  final List<String> description;

  const ExperienceData({
    required this.company,
    required this.location,
    required this.role,
    required this.duration,
    required this.description,
  });
}

class ProjectData {
  final String title;
  final List<String> description;
  final Color color;

  const ProjectData({
    required this.title,
    required this.description,
    required this.color,
  });
}

class EducationData {
  final String degree;
  final String institution;
  final String duration;

  const EducationData({
    required this.degree,
    required this.institution,
    required this.duration,
  });
}
