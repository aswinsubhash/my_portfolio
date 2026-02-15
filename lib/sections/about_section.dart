import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../widgets/random_moving_line.dart';

class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;

    return Container(
      // Remove padding from container to let stack fill width, apply padding inside
      width: double.infinity,
      color: Theme.of(context).scaffoldBackgroundColor, // Base background color
      child: Stack(
        children: [
          // Background
          // Background
          const Positioned.fill(
            child: RandomMovingLine(color: Colors.blueAccent, speed: 4.0),
          ), // Content
          Padding(
            padding: const EdgeInsets.all(50),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  "About Me",
                  style: GoogleFonts.outfit(
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: textColor,
                  ),
                ),
                const SizedBox(height: 20),
                LayoutBuilder(
                  builder: (context, constraints) {
                    bool isDesktop = constraints.maxWidth > 800;
                    return Flex(
                      direction: isDesktop ? Axis.horizontal : Axis.vertical,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Expanded(
                          flex: isDesktop ? 1 : 0,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                "I am a passionate Flutter developer with experience in building beautiful and functional mobile and web applications. I love turning ideas into reality using code.",
                                style: GoogleFonts.inter(
                                  fontSize: 18,
                                  height: 1.5,
                                  color: textColor?.withValues(alpha: 0.8),
                                ),
                              ),
                              const SizedBox(height: 30),
                              Text(
                                "Skills",
                                style: GoogleFonts.outfit(
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: textColor,
                                ),
                              ),
                              const SizedBox(height: 15),
                              Wrap(
                                spacing: 10,
                                runSpacing: 10,
                                children: const [
                                  _SkillChip(label: "Flutter"),
                                  _SkillChip(label: "Dart"),
                                  _SkillChip(label: "Firebase"),
                                  _SkillChip(label: "UI/UX Design"),
                                  _SkillChip(label: "Git"),
                                  _SkillChip(label: "REST APIs"),
                                ],
                              ),
                            ],
                          ),
                        ),
                      ],
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

class _SkillChip extends StatelessWidget {
  final String label;
  const _SkillChip({required this.label});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return Chip(
      label: Text(label),
      backgroundColor: isDark ? Colors.black : Colors.white,
      labelStyle: TextStyle(
        color: Theme.of(context).textTheme.bodyMedium?.color,
      ),
      side: BorderSide(color: isDark ? Colors.white24 : Colors.black12),
      elevation: isDark ? 0 : 2,
    );
  }
}
