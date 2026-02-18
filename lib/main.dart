import 'package:flutter/material.dart';

import 'sections/home_section.dart';
import 'sections/about_section.dart';
import 'sections/experience_section.dart';
import 'sections/projects_section.dart';
import 'sections/education_section.dart';
import 'sections/contact_section.dart';
import 'widgets/solar_system_background.dart';

void main() {
  runApp(const PortfolioApp());
}

class PortfolioApp extends StatefulWidget {
  const PortfolioApp({super.key});

  @override
  State<PortfolioApp> createState() => _PortfolioAppState();
}

class _PortfolioAppState extends State<PortfolioApp> {
  final ValueNotifier<ThemeMode> _themeNotifier = ValueNotifier(ThemeMode.dark);

  @override
  Widget build(BuildContext context) {
    return ValueListenableBuilder<ThemeMode>(
      valueListenable: _themeNotifier,
      builder: (context, currentMode, _) {
        return MaterialApp(
          title: 'Aswin Subhash Portfolio',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.light,
            scaffoldBackgroundColor: Colors.grey.shade50,
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blueAccent,
              brightness: Brightness.light,
            ),
            fontFamily: 'Inter',
          ),
          darkTheme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.dark,
            scaffoldBackgroundColor: Colors.black,
            colorScheme: ColorScheme.fromSeed(
              seedColor: Colors.blueAccent,
              brightness: Brightness.dark,
            ),
            fontFamily: 'Inter',
          ),
          themeMode: currentMode,
          home: PortfolioHomePage(
            onThemeToggle: () {
              _themeNotifier.value = _themeNotifier.value == ThemeMode.dark
                  ? ThemeMode.light
                  : ThemeMode.dark;
            },
            isDarkMode: currentMode == ThemeMode.dark,
          ),
        );
      },
    );
  }
}

class PortfolioHomePage extends StatefulWidget {
  final VoidCallback onThemeToggle;
  final bool isDarkMode;

  const PortfolioHomePage({
    super.key,
    required this.onThemeToggle,
    required this.isDarkMode,
  });

  @override
  State<PortfolioHomePage> createState() => _PortfolioHomePageState();
}

class _PortfolioHomePageState extends State<PortfolioHomePage> {
  final ValueNotifier<double> _scrollNotifier = ValueNotifier(0.0);
  final ScrollController _scrollController = ScrollController();
  final GlobalKey _projectsKey = GlobalKey();
  final GlobalKey _contactKey = GlobalKey();

  @override
  void initState() {
    super.initState();
    _scrollController.addListener(() {
      if (mounted) {
        _scrollNotifier.value = _scrollController.offset;
      }
    });
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    // Precache contact image to prevent flash when scrolling
    precacheImage(const AssetImage('assets/images/contact.png'), context);
  }

  @override
  void dispose() {
    _scrollController.dispose();
    _scrollNotifier.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: [
          // Global Background (Solar System)
          Positioned.fill(
            child: ValueListenableBuilder<double>(
              valueListenable: _scrollNotifier,
              builder: (context, scrollValue, child) {
                final isDark = Theme.of(context).brightness == Brightness.dark;
                if (!isDark) return const SizedBox.shrink();

                final screenHeight = MediaQuery.of(context).size.height;

                // Parallax effect
                // Calibrated to be centered behind About, Experience, Projects, Education
                // yOffset starts higher up (screenHeight * 0.2 shift)
                final yOffset = (scrollValue * 0.1) - (screenHeight * 0.2);

                return Opacity(
                  // Smooth fade in as soon as user starts scrolling past Home
                  opacity: (scrollValue < 50) ? 0.0 : 0.6,
                  child: Transform.translate(
                    offset: Offset(0, yOffset),
                    child: const SolarSystemBackground(
                      sunSize: 100,
                      planetSize: 40,
                      appleSize: 65,
                      orbitRadius1: 140,
                      orbitRadius2: 240,
                      orbitDuration1: Duration(seconds: 45),
                      orbitDuration2: Duration(seconds: 70),
                    ),
                  ),
                );
              },
            ),
          ),

          CustomScrollView(
            controller: _scrollController,
            slivers: [
              SliverToBoxAdapter(
                child: HomeSection(
                  scrollController: _scrollController,
                  projectsKey: _projectsKey,
                  contactKey: _contactKey,
                ),
              ),
              const SliverToBoxAdapter(child: AboutSection()),
              SliverToBoxAdapter(
                child: ExperienceSection(scroll: _scrollNotifier),
              ),
              SliverToBoxAdapter(child: ProjectsSection(key: _projectsKey)),
              const SliverToBoxAdapter(child: EducationSection()),
              SliverToBoxAdapter(child: ContactSection(key: _contactKey)),
            ],
          ),
          Positioned(
            top: 20,
            right: 20,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                FloatingActionButton(
                  mini: true,
                  onPressed: widget.onThemeToggle,
                  backgroundColor: widget.isDarkMode
                      ? Colors.black
                      : Colors.white,
                  elevation: 4,
                  child: Icon(
                    widget.isDarkMode ? Icons.light_mode : Icons.dark_mode,
                    color: widget.isDarkMode ? Colors.white : Colors.black,
                    size: 20,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
