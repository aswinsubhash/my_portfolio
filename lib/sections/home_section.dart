import 'package:flutter/material.dart';

import 'package:url_launcher/url_launcher.dart';

import '../constants.dart';
import '../widgets/scattered_background.dart';

class HomeSection extends StatefulWidget {
  final ScrollController? scrollController;
  final GlobalKey? projectsKey;
  final GlobalKey? contactKey;

  const HomeSection({
    super.key,
    this.scrollController,
    this.projectsKey,
    this.contactKey,
  });

  @override
  State<HomeSection> createState() => _HomeSectionState();
}

class _HomeSectionState extends State<HomeSection> {
  final ValueNotifier<Alignment> _mouseAlignment = ValueNotifier(
    Alignment.center,
  );

  @override
  void dispose() {
    _mouseAlignment.dispose();
    super.dispose();
  }

  void _onHover(PointerEvent event) {
    // Convert local position to alignment (-1.0 to 1.0)
    final size = MediaQuery.of(context).size;
    final x = (event.position.dx / size.width) * 2 - 1;
    final y = (event.position.dy / size.height) * 2 - 1;
    _mouseAlignment.value = Alignment(x, y);
  }

  Future<void> _downloadResume() async {
    final Uri url = Uri.parse(
      'assets/Aswin_Subhash_Mobile_Application_Developer_CV.pdf',
    );
    if (!await launchUrl(url)) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Could not launch resume download')),
        );
      }
    }
  }

  void _scrollToProjects() {
    if (widget.scrollController != null &&
        widget.projectsKey?.currentContext != null) {
      final RenderBox renderBox =
          widget.projectsKey!.currentContext!.findRenderObject() as RenderBox;
      final position = renderBox.localToGlobal(Offset.zero).dy;
      final currentScrollOffset = widget.scrollController!.offset;

      widget.scrollController!.animateTo(
        currentScrollOffset +
            position -
            80, // 80px offset for better visual alignment
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
      );
    }
  }

  void _scrollToContact() {
    if (widget.scrollController != null &&
        widget.contactKey?.currentContext != null) {
      final RenderBox renderBox =
          widget.contactKey!.currentContext!.findRenderObject() as RenderBox;
      final position = renderBox.localToGlobal(Offset.zero).dy;
      final currentScrollOffset = widget.scrollController!.offset;

      widget.scrollController!.animateTo(
        currentScrollOffset +
            position -
            80, // 80px offset for better visual alignment
        duration: const Duration(milliseconds: 800),
        curve: Curves.easeInOut,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final isMobile = MediaQuery.of(context).size.width < 800;
    return MouseRegion(
      onHover: _onHover,
      child: Container(
        constraints: BoxConstraints(
          minHeight: MediaQuery.of(context).size.height,
        ),
        decoration: BoxDecoration(
          color: Theme.of(context).scaffoldBackgroundColor,
        ),
        child: Stack(
          alignment: Alignment.center,
          children: [
            // Scattered Moving Orbs
            ScatteredBackground(mouseAlignment: _mouseAlignment),

            // Glassmorphism overlay
            Container(
              color: isDark
                  ? Colors.black.withValues(alpha: 0.1)
                  : Colors.white.withValues(alpha: 0.1),
            ),

            // Main Content
            Center(
              child: Padding(
                padding: EdgeInsets.only(
                  left: 20,
                  right: 20,
                  top: isMobile ? 80 : 0,
                ),
                child: LayoutBuilder(
                  builder: (context, constraints) {
                    bool isDesktop = constraints.maxWidth > 800;
                    return Flex(
                      direction: isDesktop ? Axis.horizontal : Axis.vertical,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // Image Section
                        Container(
                          width: 300,
                          height: 300,
                          decoration: const BoxDecoration(
                            shape: BoxShape.circle,
                          ),
                          child: ClipOval(
                            child: Image.asset(
                              'assets/images/profile.png',
                              fit: BoxFit.cover,
                              frameBuilder:
                                  (
                                    context,
                                    child,
                                    frame,
                                    wasSynchronouslyLoaded,
                                  ) {
                                    if (wasSynchronouslyLoaded) return child;
                                    return AnimatedOpacity(
                                      opacity: frame == null ? 0 : 1,
                                      duration: const Duration(
                                        milliseconds: 800,
                                      ),
                                      curve: Curves.easeOut,
                                      child: child,
                                    );
                                  },
                            ),
                          ),
                        ),

                        SizedBox(
                          width: isDesktop ? 60 : 0,
                          height: isDesktop ? 0 : 40,
                        ),

                        // Text Section
                        Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          crossAxisAlignment: isDesktop
                              ? CrossAxisAlignment.start
                              : CrossAxisAlignment.center,
                          children: [
                            // Location
                            Text(
                              AppStrings.homeLocation.toUpperCase(),
                              style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: 14,
                                fontWeight: FontWeight.w500,
                                letterSpacing: 2,
                                color: Theme.of(context)
                                    .textTheme
                                    .bodyMedium
                                    ?.color
                                    ?.withValues(alpha: 0.6),
                              ),
                            ),

                            const SizedBox(height: 10),

                            // Name
                            _GradientText(
                              text: AppStrings.greeting,
                              style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: isDesktop ? 80 : 50,
                                fontWeight: FontWeight.bold,
                                height: 1.1,
                              ),
                            ),

                            const SizedBox(height: 10),

                            // Title
                            Text(
                              AppStrings.homeTitle,
                              textAlign: isDesktop
                                  ? TextAlign.start
                                  : TextAlign.center,
                              softWrap: true,
                              maxLines: 3,
                              style: TextStyle(
                                fontFamily: 'Inter',
                                fontSize: isDesktop ? 20 : 16,
                                fontWeight: FontWeight.w600,
                                color: Theme.of(
                                  context,
                                ).textTheme.bodyLarge?.color,
                              ),
                            ),

                            const SizedBox(height: 20),

                            // Bio Description
                            ConstrainedBox(
                              constraints: BoxConstraints(
                                maxWidth: isDesktop
                                    ? (constraints.maxWidth > 960
                                          ? 600
                                          : constraints.maxWidth - 360)
                                    : constraints.maxWidth,
                              ),
                              child: Text(
                                AppStrings.homeDescription,
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 16,
                                  height: 1.6,
                                  color: Theme.of(context)
                                      .textTheme
                                      .bodyMedium
                                      ?.color
                                      ?.withValues(alpha: 0.8),
                                ),
                              ),
                            ),

                            const SizedBox(height: 30),

                            // Action Buttons Row
                            Wrap(
                              spacing: 16,
                              runSpacing: 16,
                              alignment: isDesktop
                                  ? WrapAlignment.start
                                  : WrapAlignment.center,
                              children: [
                                // View Projects Button
                                TextButton.icon(
                                  onPressed: _scrollToProjects,
                                  icon: const Icon(Icons.view_module_rounded),
                                  label: const Text(
                                    'View Projects',
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  style: TextButton.styleFrom(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 24,
                                      vertical: 16,
                                    ),
                                    foregroundColor: isDark
                                        ? Colors.white
                                        : Theme.of(context).primaryColor,
                                    shape: const StadiumBorder(),
                                  ),
                                ),

                                // Download Resume Button
                                TextButton.icon(
                                  onPressed: _downloadResume,
                                  icon: const Icon(Icons.download_rounded),
                                  label: const Text(
                                    'Download Resume',
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  style: TextButton.styleFrom(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 24,
                                      vertical: 16,
                                    ),
                                    foregroundColor: isDark
                                        ? Colors.white
                                        : Theme.of(context).primaryColor,
                                    shape: const StadiumBorder(),
                                  ),
                                ),

                                // Contact Button
                                TextButton.icon(
                                  onPressed: _scrollToContact,
                                  icon: const Icon(Icons.mail_outline_rounded),
                                  label: const Text(
                                    'Contact',
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 16,
                                      fontWeight: FontWeight.w600,
                                    ),
                                  ),
                                  style: TextButton.styleFrom(
                                    padding: const EdgeInsets.symmetric(
                                      horizontal: 24,
                                      vertical: 16,
                                    ),
                                    foregroundColor: isDark
                                        ? Colors.white
                                        : Theme.of(context).primaryColor,
                                    shape: const StadiumBorder(),
                                  ),
                                ),
                              ],
                            ),
                          ],
                        ),
                      ],
                    );
                  },
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _GradientText extends StatefulWidget {
  final String text;
  final TextStyle style;

  const _GradientText({required this.text, required this.style});

  @override
  State<_GradientText> createState() => _GradientTextState();
}

class _GradientTextState extends State<_GradientText>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(seconds: 5),
    )..repeat();
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _controller,
      builder: (context, child) {
        return ShaderMask(
          shaderCallback: (bounds) {
            return LinearGradient(
              colors: const [
                Colors.blueAccent,
                Colors.purpleAccent,
                Colors.pinkAccent,
                Colors.blueAccent,
              ],
              stops: const [0.0, 0.3, 0.7, 1.0],
              begin: Alignment(-1.0 + (2.0 * _controller.value), 0.0),
              end: Alignment(1.0 + (2.0 * _controller.value), 0.0),
              tileMode: TileMode.mirror,
            ).createShader(bounds);
          },
          child: Text(
            widget.text,
            style: widget.style.copyWith(color: Colors.white),
          ),
        );
      },
    );
  }
}
