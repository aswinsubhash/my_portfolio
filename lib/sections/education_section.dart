import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../constants.dart';

class EducationSection extends StatelessWidget {
  const EducationSection({super.key});

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final isDesktop = MediaQuery.of(context).size.width > 800;

    return Container(
      width: double.infinity,
      color: Colors.transparent,
      child: Center(
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 1200),
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: SizedBox(
              width: double.infinity,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    AppStrings.educationTitle,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: textColor,
                    ),
                  ),
                  const SizedBox(height: 40),
                  if (isDesktop)
                    IntrinsicHeight(
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: AppStrings.education.map((edu) {
                          return Expanded(
                            child: Padding(
                              padding: EdgeInsets.only(
                                right: edu == AppStrings.education.last
                                    ? 0
                                    : 20,
                              ),
                              child: _EducationCard(education: edu),
                            ),
                          );
                        }).toList(),
                      ),
                    )
                  else
                    Column(
                      children: AppStrings.education.map((edu) {
                        return Padding(
                          padding: const EdgeInsets.only(bottom: 20),
                          child: _EducationCard(education: edu),
                        );
                      }).toList(),
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

class _EducationCard extends StatefulWidget {
  final EducationData education;

  const _EducationCard({required this.education});

  @override
  State<_EducationCard> createState() => _EducationCardState();
}

class _EducationCardState extends State<_EducationCard> {
  bool _isHovering = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    final cardBg = isDark
        ? (_isHovering
              ? Colors.white.withValues(alpha: 0.05)
              : Colors.transparent)
        : Colors.white;
    final borderColor = isDark ? Colors.white12 : Colors.black12;
    final iconColor = Colors.amber;
    final institutionColor = isDark ? Colors.white : Colors.black87;
    final degreeColor = Colors.blueAccent;
    final durationColor = isDark ? Colors.grey : Colors.black54;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovering = true),
      onExit: (_) => setState(() => _isHovering = false),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.all(24),
        decoration: BoxDecoration(
          color: cardBg,
          borderRadius: BorderRadius.circular(15),
          border: Border.all(
            color: _isHovering ? degreeColor.withOpacity(0.5) : borderColor,
            width: 1,
          ),
        ),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: const EdgeInsets.only(top: 2),
              child: FaIcon(
                FontAwesomeIcons.graduationCap,
                color: iconColor,
                size: 24,
              ),
            ),
            const SizedBox(width: 20),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.education.institution,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                      color: institutionColor,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.education.degree,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: degreeColor,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    widget.education.duration,
                    style: TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 12,
                      fontWeight: FontWeight.w500,
                      color: durationColor,
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
