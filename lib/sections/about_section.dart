import 'package:flutter/material.dart';

import '../widgets/section_background.dart';
import '../constants.dart';

class AboutSection extends StatelessWidget {
  const AboutSection({super.key});

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;

    return SectionBackground(
      child: Container(
        width: double.infinity,
        color: Colors.transparent,
        child: Center(
          child: ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 1200),
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    AppStrings.aboutMeTitle,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 24,
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
                                  AppStrings.aboutMeDescription,
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 18,
                                    height: 1.5,
                                    color: textColor?.withValues(alpha: 0.8),
                                  ),
                                ),
                                const SizedBox(height: 30),
                                Text(
                                  AppStrings.skillsTitle,
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 24,
                                    fontWeight: FontWeight.bold,
                                    color: textColor,
                                  ),
                                ),
                                const SizedBox(height: 15),
                                Wrap(
                                  spacing: 10,
                                  runSpacing: 10,
                                  children: AppStrings.skills
                                      .map((skill) => _SkillChip(label: skill))
                                      .toList(),
                                ),
                              ],
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                  const SizedBox(height: 40),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _SkillChip extends StatefulWidget {
  final String label;
  const _SkillChip({required this.label});

  @override
  State<_SkillChip> createState() => _SkillChipState();
}

class _SkillChipState extends State<_SkillChip> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final primaryColor = Theme.of(context).primaryColor;

    // Use white for text on hover in dark mode to ensure it pops
    final hoverTextColor = isDark ? Colors.white : primaryColor;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeOut,
        // Removed scale transform as requested
        decoration: BoxDecoration(
          color: isDark
              ? (_isHovered
                    ? primaryColor.withValues(
                        alpha: 0.2,
                      ) // Increased opacity slightly
                    : Colors.white.withValues(alpha: 0.05))
              : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: _isHovered
                ? (isDark ? Colors.white : primaryColor)
                : (isDark ? Colors.white24 : Colors.black12),
            width: 1, // Constant width prevents jitter/zoom
          ),
          boxShadow: _isHovered
              ? [
                  BoxShadow(
                    color: primaryColor.withValues(alpha: 0.2),
                    blurRadius: 8,
                    offset: const Offset(0, 4),
                  ),
                ]
              : [],
        ),
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        child: Text(
          widget.label,
          style: TextStyle(
            color: _isHovered
                ? hoverTextColor
                : (isDark
                      ? Colors.white.withValues(alpha: 0.9)
                      : Theme.of(context).textTheme.bodyMedium?.color),
            fontWeight: FontWeight.normal, // Constant weight prevents jitter
          ),
        ),
      ),
    );
  }
}
