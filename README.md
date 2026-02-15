# portfolio_web

A new Flutter project.

## Getting Started

This project is a starting point for a Flutter application.

A few resources to get you started if this is your first Flutter project:

- [Learn Flutter](https://docs.flutter.dev/get-started/learn-flutter)
- [Write your first Flutter app](https://docs.flutter.dev/get-started/codelab)
- [Flutter learning resources](https://docs.flutter.dev/reference/learning-resources)

For help getting started with Flutter development, view the
[online documentation](https://docs.flutter.dev/), which offers tutorials,
samples, guidance on mobile development, and a full API reference.
# Flutter Web Portfolio - Walkthrough

## Overview
I have successfully built a modern, responsive personal portfolio website using Flutter Web. The application features a clean design with smooth animations and interactive elements.

## Features Implemented

### 1. Home Section (Hero)
- **Background**: A large, continuously rotating circular gradient (SweepGradient) with a glow effect, set against a dark background.
- **Gradient Text**: The name "Aswin" features a continuously moving gradient shining effect.
- **Animations**: Typing effect for titles, shimmer effect on main text, and smooth fade-ins.
- **Interactive Elements**: "View My Work" button with hover state scaling and shadow changes.

### 2. About Section
- **Responsive Layout**: Adjusts from two columns (text + image) on desktop to a single column on mobile.
- **Skills Display**: A wrap layout of skill chips (Flutter, Dart, Firebase, etc.).

### 3. Projects Section
- **Card Grid**: A responsive grid of project cards that adapts to screen size.
- **Hover Effects**: Cards scale up and show a shadow on hover for interactivity.
- **Project Structure**: Easily extendable data model for adding more projects.

### 4. Contact Section
- **Social Links**: Custom icon buttons for GitHub, LinkedIn, and Twitter using `font_awesome_flutter`.
- **Email Launcher**: Direct mail-to link integration.
- **Footer**: Copyright information.

## Verification

### Build Status
- Ran `flutter build web` successfully.
- Verified asset tree-shaking for icons.
- Confirmed no compilation errors.

### Next Steps
- Add replace placeholder images with real project screenshots.
- Deploy to Firebase Hosting or GitHub Pages.
- Add more content to the "About" section.

## Running the App
The app can be run locally using the web server device:
`flutter run -d web-server --web-port=8080`

Access it at: http://localhost:8080
