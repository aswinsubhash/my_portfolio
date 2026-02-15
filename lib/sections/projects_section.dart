import 'package:flutter/material.dart';

import '../constants.dart';

class ProjectsSection extends StatelessWidget {
  const ProjectsSection({super.key});

  @override
  Widget build(BuildContext context) {
    // Projects data moved to AppStrings.projects

    final textColor = Theme.of(context).textTheme.bodyLarge?.color;

    return Container(
      width: double.infinity,
      color: Theme.of(context).scaffoldBackgroundColor, // Base background color
      child: Stack(
        children: [
          // Background
          // Background

          // Content
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
            child: Column(
              children: [
                Text(
                  AppStrings.projectsTitle,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: textColor, // Theme text
                  ),
                ),
                const SizedBox(height: 10),
                Text(
                  AppStrings.projectsSubtitle,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 18,
                    color: textColor?.withValues(alpha: 0.6),
                  ), // Light text
                ),
                const SizedBox(height: 50),
                LayoutBuilder(
                  builder: (context, constraints) {
                    return Wrap(
                      spacing: 40,
                      runSpacing: 40,
                      alignment: WrapAlignment.center,
                      children: AppStrings.projects.map((project) {
                        return _ProjectCard(project: project);
                      }).toList(),
                    );
                  },
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

// _Project class removed, using ProjectData from constants.dart

class _ProjectCard extends StatefulWidget {
  final ProjectData project;

  const _ProjectCard({required this.project});

  @override
  State<_ProjectCard> createState() => _ProjectCardState();
}

class _ProjectCardState extends State<_ProjectCard> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final scale = _isHovered ? 1.05 : 1.0;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 300,
        height: 350,
        transform: Matrix4.diagonal3Values(scale, scale, scale),
        decoration: BoxDecoration(
          color: isDark ? Colors.black : Colors.white, // Opaque background
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isDark ? Colors.white24 : Colors.black12,
          ), // Visible border
          boxShadow: [
            BoxShadow(
              color: (isDark ? Colors.white : Colors.black).withValues(
                alpha: _isHovered
                    ? 0.1
                    : 0.05, // Subtle shadow always, stronger on hover
              ),
              blurRadius: 20,
              offset: const Offset(0, 5),
            ),
          ],
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 180,
              decoration: BoxDecoration(
                color: widget.project.color.withValues(alpha: isDark ? 1 : 0.8),
                borderRadius: const BorderRadius.vertical(
                  top: Radius.circular(20),
                ),
              ),
              child: const Center(
                child: Icon(Icons.image, size: 50, color: Colors.white54),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.project.title,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                      color: textColor, // Theme text
                    ),
                  ),
                  const SizedBox(height: 10),
                  Text(
                    widget.project.description,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 14,
                      height: 1.5,
                      color: textColor?.withValues(alpha: 0.7), // Light text
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
