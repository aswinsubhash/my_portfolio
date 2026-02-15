import 'package:flutter/material.dart';

import 'sections/home_section.dart';
import 'sections/about_section.dart';
import 'sections/experience_section.dart';
import 'sections/projects_section.dart';
import 'sections/contact_section.dart';

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
          SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              children: [
                HomeSection(
                  scrollController: _scrollController,
                  projectsKey: _projectsKey,
                  contactKey: _contactKey,
                ),
                const AboutSection(),
                ExperienceSection(scroll: _scrollNotifier),
                ProjectsSection(key: _projectsKey),
                ContactSection(key: _contactKey),
              ],
            ),
          ),
          Positioned(
            top: 20,
            right: 20,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text(
                  'Made with ',
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                ),
                const Icon(Icons.favorite, color: Colors.blue, size: 12),
                const Text(
                  ' in Flutter',
                  style: TextStyle(color: Colors.grey, fontSize: 12),
                ),
                const SizedBox(width: 16),
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
