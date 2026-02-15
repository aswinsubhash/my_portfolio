import 'dart:math' as math;
import 'package:flutter/material.dart';

class SolarSystemBackground extends StatefulWidget {
  final double sunSize;
  final double planetSize;
  final double appleSize;
  final double orbitRadius1;
  final double orbitRadius2;
  final Duration orbitDuration1;
  final Duration orbitDuration2;

  const SolarSystemBackground({
    super.key,
    this.sunSize = 100,
    this.planetSize = 40,
    this.appleSize = 65,
    this.orbitRadius1 = 160,
    this.orbitRadius2 = 240,
    this.orbitDuration1 = const Duration(seconds: 10),
    this.orbitDuration2 = const Duration(seconds: 15),
  });

  @override
  State<SolarSystemBackground> createState() => _SolarSystemBackgroundState();
}

class _SolarSystemBackgroundState extends State<SolarSystemBackground>
    with TickerProviderStateMixin {
  late AnimationController _controller1;
  late AnimationController _controller2;

  @override
  void initState() {
    super.initState();
    _controller1 = AnimationController(
      vsync: this,
      duration: widget.orbitDuration1,
    )..repeat();

    _controller2 = AnimationController(
      vsync: this,
      duration: widget.orbitDuration2,
    )..repeat();
  }

  @override
  void dispose() {
    _controller1.dispose();
    _controller2.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    // Determine sun and planet icons
    // Using simple container placeholders if images fail, but assuming images work
    // Adjust colors/opacity as needed for "behind" effect

    final isDark = Theme.of(context).brightness == Brightness.dark;

    return LayoutBuilder(
      builder: (context, constraints) {
        // Responsible scaling for smaller screens
        final isMobile = constraints.maxWidth < 600;
        final scale = isMobile ? 0.6 : 1.0;

        final scaledSunSize = widget.sunSize * (isMobile ? 0.8 : 1.0);
        final scaledPlanetSize = widget.planetSize * (isMobile ? 0.8 : 1.0);
        final scaledAppleSize = widget.appleSize * (isMobile ? 0.8 : 1.0);
        final scaledOrbitRadius1 = widget.orbitRadius1 * scale;
        final scaledOrbitRadius2 = widget.orbitRadius2 * scale;

        return Stack(
          children: [
            // Star Field Background (Dark Mode Only)
            if (isDark)
              Positioned.fill(
                child: CustomPaint(
                  painter: _StarFieldPainter(starCount: 100, isDark: isDark),
                ),
              ),
            // Center Sun (Flutter)
            Center(
              child: Image.asset(
                'assets/images/flutter.png',
                width: scaledSunSize,
                height: scaledSunSize,
                fit: BoxFit.contain,
                errorBuilder: (context, error, stackTrace) =>
                    Icon(Icons.sunny, size: scaledSunSize, color: Colors.amber),
              ),
            ),

            // Planet 1 (Android)
            Center(
              child: AnimatedBuilder(
                animation: _controller1,
                builder: (context, child) {
                  final angle = _controller1.value * 2 * math.pi;
                  return Transform.translate(
                    offset: Offset(
                      math.cos(angle) * scaledOrbitRadius1,
                      math.sin(angle) * scaledOrbitRadius1,
                    ),
                    child: child,
                  );
                },
                child: Image.asset(
                  'assets/images/android.png',
                  width: scaledPlanetSize,
                  height: scaledPlanetSize,
                  fit: BoxFit.contain,
                  errorBuilder: (context, error, stackTrace) => Icon(
                    Icons.android,
                    size: scaledPlanetSize,
                    color: Colors.green,
                  ),
                ),
              ),
            ),

            // Planet 2 (Apple)
            Center(
              child: AnimatedBuilder(
                animation: _controller2,
                builder: (context, child) {
                  final angle = _controller2.value * 2 * math.pi;
                  // Add phase shift to start at different position
                  final phase = math.pi;
                  final currentAngle = angle + phase;
                  return Transform.translate(
                    offset: Offset(
                      math.cos(currentAngle) * scaledOrbitRadius2,
                      math.sin(currentAngle) * scaledOrbitRadius2,
                    ),
                    child: child,
                  );
                },
                child: Image.asset(
                  'assets/images/apple.png',
                  width: scaledAppleSize,
                  height: scaledAppleSize,
                  fit: BoxFit.contain,
                  color: isDark
                      ? Colors.white
                      : null, // Tint white in dark mode
                  errorBuilder: (context, error, stackTrace) => Icon(
                    Icons.apple,
                    size: scaledAppleSize,
                    color: Colors.grey,
                  ),
                ),
              ),
            ),

            // Optional: Draw orbit rings (subtle)
            Center(
              child: Container(
                width: scaledOrbitRadius1 * 2,
                height: scaledOrbitRadius1 * 2,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.3)
                        : Colors.black.withValues(alpha: 0.3),
                    width: 1,
                  ),
                ),
              ),
            ),
            Center(
              child: Container(
                width: scaledOrbitRadius2 * 2,
                height: scaledOrbitRadius2 * 2,
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(
                    color: isDark
                        ? Colors.white.withValues(alpha: 0.3)
                        : Colors.black.withValues(alpha: 0.1),
                    width: 1,
                  ),
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _StarFieldPainter extends CustomPainter {
  final int starCount;
  final bool isDark;

  _StarFieldPainter({required this.starCount, required this.isDark});

  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()..style = PaintingStyle.fill;

    // Use a fixed seed for consistent star positions
    final random = math.Random(42);

    for (int i = 0; i < starCount; i++) {
      final x = random.nextDouble() * size.width;
      final y = random.nextDouble() * size.height;
      final radius = random.nextDouble() * 1.5 + 0.5; // 0.5 to 2.0
      final opacity = random.nextDouble() * 0.5 + 0.3; // 0.3 to 0.8

      paint.color = (isDark ? Colors.white : Colors.black).withOpacity(
        opacity * (isDark ? 0.6 : 0.2),
      );

      canvas.drawCircle(Offset(x, y), radius, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
