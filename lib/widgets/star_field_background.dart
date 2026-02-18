import 'dart:math' as math;
import 'package:flutter/material.dart';

class StarFieldBackground extends StatelessWidget {
  final int starCount;

  const StarFieldBackground({super.key, this.starCount = 100});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Only show stars in dark mode for better visual appeal
    if (!isDark) return const SizedBox.shrink();

    return RepaintBoundary(
      child: CustomPaint(
        painter: _StarFieldPainter(starCount: starCount, isDark: isDark),
        size: Size.infinite,
      ),
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

    // Use a fixed seed for consistent star positions per section
    // We can use a hash of the size to make it feel unique per section if desired
    // but fixed 42 is simple for now.
    final random = math.Random(size.width.toInt() + size.height.toInt());

    for (int i = 0; i < starCount; i++) {
      final x = random.nextDouble() * size.width;
      final y = random.nextDouble() * size.height;
      final radius = random.nextDouble() * 1.5 + 0.5; // 0.5 to 2.0
      final opacity = random.nextDouble() * 0.5 + 0.3; // 0.3 to 0.8

      paint.color = (isDark ? Colors.white : Colors.black).withOpacity(
        opacity * (isDark ? 0.4 : 0.1), // Subtle stars
      );

      canvas.drawCircle(Offset(x, y), radius, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
