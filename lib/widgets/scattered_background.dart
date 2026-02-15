import 'package:flutter/material.dart';

import 'dart:math' as math;
import 'dart:ui';

class ScatteredBackground extends StatelessWidget {
  final ValueNotifier<Alignment> mouseAlignment;

  const ScatteredBackground({super.key, required this.mouseAlignment});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // palette for dark mode (deep, rich colors) - keeping opacity 0.5 as requested
    final darkColors = [
      Colors.blue.shade900.withValues(alpha: 0.5),
      Colors.purple.shade900.withValues(alpha: 0.5),
      Colors.pink.shade900.withValues(alpha: 0.5),
      Colors.indigo.shade900.withValues(alpha: 0.5),
      Colors.cyan.shade900.withValues(alpha: 0.5),
      Colors.deepPurple.shade900.withValues(alpha: 0.5),
    ];

    // palette for light mode (softer, pastel-like colors) - increased opacity/shade for better visibility
    final lightColors = [
      Colors.blue.shade400.withValues(alpha: 0.6),
      Colors.purple.shade400.withValues(alpha: 0.6),
      Colors.pink.shade400.withValues(alpha: 0.6),
      Colors.indigo.shade400.withValues(alpha: 0.6),
      Colors.cyan.shade400.withValues(alpha: 0.6),
      Colors.deepPurple.shade400.withValues(alpha: 0.6),
    ];

    final colors = isDark ? darkColors : lightColors;

    return Stack(
      children: [
        _MovingOrb(
          color: colors[0],
          size: 400,
          mouseAlignment: mouseAlignment,
          depth: 0.05,
        ),
        _MovingOrb(
          color: colors[1],
          size: 350,
          mouseAlignment: mouseAlignment,
          depth: 0.03,
        ),
        _MovingOrb(
          color: colors[2],
          size: 300,
          mouseAlignment: mouseAlignment,
          depth: 0.08,
        ),
        _MovingOrb(
          color: colors[3],
          size: 450,
          mouseAlignment: mouseAlignment,
          depth: 0.04,
        ),
        _MovingOrb(
          color: colors[4],
          size: 380,
          mouseAlignment: mouseAlignment,
          depth: 0.06,
        ),
        _MovingOrb(
          color: colors[5],
          size: 420,
          mouseAlignment: mouseAlignment,
          depth: 0.02,
        ),
      ],
    );
  }
}

class _MovingOrb extends StatefulWidget {
  final Color color;
  final double size;
  final ValueNotifier<Alignment> mouseAlignment;
  final double depth;

  const _MovingOrb({
    required this.color,
    required this.size,
    required this.mouseAlignment,
    this.depth = 0.05,
  });

  @override
  State<_MovingOrb> createState() => _MovingOrbState();
}

class _MovingOrbState extends State<_MovingOrb>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _animation;
  late Offset _begin;
  late Offset _end;

  @override
  void initState() {
    super.initState();
    _controller = AnimationController(
      vsync: this,
      duration: Duration(seconds: 5 + math.Random().nextInt(5)),
    )..repeat(reverse: true);

    _randomizePositions();
    _controller.addStatusListener((status) {
      if (status == AnimationStatus.completed ||
          status == AnimationStatus.dismissed) {
        _randomizePositions();
      }
    });
  }

  void _randomizePositions() {
    final random = math.Random();
    _begin = Offset(
      random.nextDouble() * 3 - 1.5,
      random.nextDouble() * 3 - 1.5,
    );
    _end = Offset(random.nextDouble() * 3 - 1.5, random.nextDouble() * 3 - 1.5);

    _animation = Tween<Offset>(begin: _begin, end: _end).animate(
      CurvedAnimation(parent: _controller, curve: Curves.easeInOutSine),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: Listenable.merge([_controller, widget.mouseAlignment]),
      builder: (context, child) {
        // Current random position
        final randomOffset = _animation.value;

        // Mouse interaction offset (parallax)
        // Move opposite to mouse for depth effect, or with mouse for attraction.
        // Let's do slight attraction/movement with mouse: + alignment * depth
        final mouseInteraction = widget.mouseAlignment.value;

        final dx = randomOffset.dx - (mouseInteraction.x * widget.depth);
        final dy = randomOffset.dy - (mouseInteraction.y * widget.depth);

        return Align(
          alignment: Alignment(dx, dy),
          child: ImageFiltered(
            imageFilter: ImageFilter.blur(sigmaX: 80, sigmaY: 80),
            child: Container(
              width: widget.size,
              height: widget.size,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: widget.color,
              ),
            ),
          ),
        );
      },
    );
  }
}
