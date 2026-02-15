import 'package:flutter/material.dart';

import '../constants.dart';
import '../widgets/solar_system_background.dart';

class ExperienceSection extends StatelessWidget {
  final ValueNotifier<double>? scroll;

  const ExperienceSection({super.key, this.scroll});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    // Explicitly set text color based on brightness to ensure contrast
    final textColor = isDark ? Colors.white : Colors.black;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Theme.of(context).scaffoldBackgroundColor,
      ),
      clipBehavior: Clip.hardEdge, // Prevent overflow
      // Removed padding here to let Stack fill, applying padding to content instead if needed
      // Actually, keeping vertical padding on Container is fine if Stack matches it?
      // No, Stack should probably go inside.
      child: Stack(
        children: [
          // Solar System Background with Parallax
          Positioned.fill(
            child: ListenableBuilder(
              listenable: scroll ?? ValueNotifier(0.0),
              child: Opacity(
                opacity: 0.5, // Increased visibility
                child: const SolarSystemBackground(
                  sunSize: 100,
                  planetSize: 40,
                  appleSize: 65, // Increased apple size
                  orbitRadius1: 140,
                  orbitRadius2: 240, // Increased orbit radius
                  orbitDuration1: Duration(seconds: 45),
                  orbitDuration2: Duration(seconds: 70),
                ),
              ),
              builder: (context, child) {
                final scrollOffset = scroll?.value ?? 0.0;
                // Parallax effect: moves slower than content
                return Transform.translate(
                  // Adjust 0.15 to control parallax intensity
                  offset: Offset(0, (scrollOffset * 0.15) - 100),
                  child: child,
                );
              },
            ),
          ),
          // Main Content
          Padding(
            padding: const EdgeInsets.all(50),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppStrings.experienceTitle,
                  style: TextStyle(
                    fontFamily: 'Inter',
                    fontSize: 40,
                    fontWeight: FontWeight.bold,
                    color: textColor,
                  ),
                ),
                const SizedBox(height: 30),
                ListView.builder(
                  shrinkWrap: true,
                  physics: const NeverScrollableScrollPhysics(),
                  itemCount: AppStrings.experience.length,
                  itemBuilder: (context, index) {
                    return _ExperienceItem(
                      key: ValueKey(index),
                      experience: AppStrings.experience[index],
                      isLast: index == AppStrings.experience.length - 1,
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

class _ExperienceItem extends StatefulWidget {
  final ExperienceData experience;
  final bool isLast;

  const _ExperienceItem({
    super.key,
    required this.experience,
    required this.isLast,
  });

  @override
  State<_ExperienceItem> createState() => _ExperienceItemState();
}

class _ExperienceItemState extends State<_ExperienceItem>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<double> _expandAnimation;
  bool _isHovering = false;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      duration: const Duration(milliseconds: 300),
      vsync: this,
    );
    _expandAnimation = CurvedAnimation(
      parent: _controller,
      curve: Curves.easeInOut,
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? Colors.white : Colors.black;
    final primaryColor = Theme.of(context).colorScheme.primary;

    return Stack(
      clipBehavior: Clip.none,
      children: [
        // Timeline line
        Positioned(
          top: 0,
          bottom: 0,
          left: 0,
          width: 12,
          child: Column(
            children: [
              Padding(
                padding: const EdgeInsets.only(top: 6),
                child: Container(
                  width: 12,
                  height: 12,
                  decoration: BoxDecoration(
                    color: isDark ? primaryColor : Colors.black,
                    shape: BoxShape.circle,
                    border: Border.all(
                      color: isDark ? Colors.white : Colors.black,
                      width: 2,
                    ),
                  ),
                ),
              ),
              Expanded(
                child: Container(
                  width: 2,
                  color: isDark ? Colors.white24 : Colors.black12,
                ),
              ),
            ],
          ),
        ),
        // Content
        Padding(
          padding: const EdgeInsets.only(
            left: 32,
            bottom: 30, // Bottom spacing for item
          ),
          child: MouseRegion(
            onEnter: (_) => setState(() => _isHovering = true),
            onExit: (_) => setState(() => _isHovering = false),
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 200),
              padding: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: _isHovering
                    ? (isDark
                          ? Colors.white.withOpacity(0.05)
                          : Colors.black.withOpacity(0.03))
                    : Colors.transparent,
                borderRadius: BorderRadius.circular(15),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Header (Clickable)
                  InkWell(
                    onTap: () {
                      if (_controller.isDismissed) {
                        _controller.forward();
                      } else {
                        _controller.reverse();
                      }
                    },
                    borderRadius: BorderRadius.circular(8),
                    child: Padding(
                      padding: const EdgeInsets.all(
                        8.0,
                      ), // Touch target padding
                      child: Row(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Expanded(
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(
                                  widget.experience.company,
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 20,
                                    fontWeight: FontWeight.bold,
                                    color: textColor,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  widget.experience.role,
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 16,
                                    fontWeight: FontWeight.w600,
                                    color: primaryColor,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                Text(
                                  "${widget.experience.location} • ${widget.experience.duration}",
                                  style: TextStyle(
                                    fontFamily: 'Inter',
                                    fontSize: 14,
                                    color: textColor.withOpacity(0.6),
                                    fontStyle: FontStyle.italic,
                                  ),
                                ),
                              ],
                            ),
                          ),
                          // Expand Icon
                          Padding(
                            padding: const EdgeInsets.only(top: 4),
                            child: RotationTransition(
                              turns: Tween(
                                begin: 0.0,
                                end: 0.5,
                              ).animate(_expandAnimation),
                              child: Icon(
                                Icons.keyboard_arrow_down,
                                color: textColor.withOpacity(0.5),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  // Expandable Description
                  SizeTransition(
                    sizeFactor: _expandAnimation,
                    axisAlignment: -1.0, // Expand from top
                    child: Padding(
                      padding: const EdgeInsets.only(top: 15, left: 8),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: widget.experience.description
                            .map(
                              (point) => Padding(
                                padding: const EdgeInsets.only(bottom: 8),
                                child: Row(
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Padding(
                                      padding: const EdgeInsets.only(top: 6),
                                      child: Icon(
                                        Icons.arrow_right,
                                        size: 16,
                                        color: primaryColor,
                                      ),
                                    ),
                                    const SizedBox(width: 8),
                                    Expanded(
                                      child: Text(
                                        point,
                                        style: TextStyle(
                                          fontFamily: 'Inter',
                                          fontSize: 16,
                                          height: 1.5,
                                          color: textColor.withOpacity(0.8),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            )
                            .toList(),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}
