import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import '../widgets/scattered_background.dart';

class HomeSection extends StatefulWidget {
  const HomeSection({super.key});

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

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return MouseRegion(
      onHover: _onHover,
      child: Container(
        height: MediaQuery.of(context).size.height,
        width: double.infinity,
        clipBehavior: Clip.hardEdge,
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
              child: SingleChildScrollView(
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 20),
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
                              _GradientText(
                                text: "Hi, I'm Aswin Subhash",
                                style: GoogleFonts.outfit(
                                  fontSize: isDesktop ? 80 : 50,
                                  fontWeight: FontWeight.bold,
                                  height: 1.2,
                                ),
                              ),

                              const SizedBox(height: 20),

                              SizedBox(
                                height: 40,
                                child: _TypewriterText(
                                  texts: const [
                                    "Flutter Developer",
                                    "Cross-Platform Expert",
                                  ],
                                  style: GoogleFonts.inter(
                                    fontSize: 24,
                                    color:
                                        Theme.of(context)
                                            .textTheme
                                            .bodyLarge
                                            ?.color
                                            ?.withValues(alpha: 0.8) ??
                                        Colors.white70,
                                    letterSpacing: 1.2,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ],
                      );
                    },
                  ),
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

class _TypewriterText extends StatefulWidget {
  final List<String> texts;
  final TextStyle style;

  const _TypewriterText({required this.texts, required this.style});

  @override
  State<_TypewriterText> createState() => _TypewriterTextState();
}

class _TypewriterTextState extends State<_TypewriterText>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<int> _characterCount;
  int _currentIndex = 0;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration:
          const Duration(milliseconds: 100) *
          widget.texts[_currentIndex].length,
    );

    _setupAnimation();

    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed) {
        Future.delayed(const Duration(milliseconds: 1000), () {
          if (mounted) _controller.reverse();
        });
      } else if (status == AnimationStatus.dismissed) {
        Future.delayed(const Duration(milliseconds: 500), () {
          if (mounted) {
            setState(() {
              _currentIndex = (_currentIndex + 1) % widget.texts.length;
              _controller.duration =
                  const Duration(milliseconds: 100) *
                  widget.texts[_currentIndex].length;
              _setupAnimation();
            });
            _controller.forward();
          }
        });
      }
    });

    _controller.forward();
  }

  void _setupAnimation() {
    _characterCount = StepTween(
      begin: 0,
      end: widget.texts[_currentIndex].length,
    ).animate(CurvedAnimation(parent: _controller, curve: Curves.linear));
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _characterCount,
      builder: (context, child) {
        int count = _characterCount.value;
        String currentString = widget.texts[_currentIndex];
        // Ensure count doesn't exceed string length - StepTween might sometimes be quirky
        if (count > currentString.length) count = currentString.length;

        String currentText = currentString.substring(0, count);
        return Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(currentText, style: widget.style),
            _BlinkingCursor(style: widget.style),
          ],
        );
      },
    );
  }
}

class _BlinkingCursor extends StatefulWidget {
  final TextStyle style;
  const _BlinkingCursor({required this.style});

  @override
  State<_BlinkingCursor> createState() => _BlinkingCursorState();
}

class _BlinkingCursorState extends State<_BlinkingCursor>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 500),
    )..repeat(reverse: true);
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return FadeTransition(
      opacity: _controller,
      child: Text("|", style: widget.style), // Keeping the cursor simpler
    );
  }
}
