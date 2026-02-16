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
  ];

  // Projects Section
  static const String projectsTitle = "My Projects";
  static const String projectsSubtitle = "Here are some of my recent works";
  static const List<ProjectData> projects = [
    ProjectData(
      title: "Portfolio Website",
      description: "A responsive portfolio website built with Flutter Web.",
      color: Colors.blue,
    ),
    ProjectData(
      title: "E-Commerce App",
      description:
          "A full-featured mobile shopping app with payment integration.",
      color: Colors.green,
    ),
    ProjectData(
      title: "Task Manager",
      description: "Productivity tool to organize and track daily tasks.",
      color: Colors.orange,
    ),
    ProjectData(
      title: "Social Media Dashboard",
      description: "Analytics dashboard for social media management.",
      color: Colors.purple,
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
  final String description;
  final MaterialColor color;

  const ProjectData({
    required this.title,
    required this.description,
    required this.color,
  });
}
