import 'dart:math';

import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';

class RandomMovingLine extends StatefulWidget {
  final Color color;
  final double speed;

  const RandomMovingLine({
    super.key,
    this.color = Colors.greenAccent, // Snake color default
    this.speed = 3.0,
  });

  @override
  State<RandomMovingLine> createState() => _RandomMovingLineState();
}

class _RandomMovingLineState extends State<RandomMovingLine>
    with SingleTickerProviderStateMixin {
  late Ticker _ticker;
  final List<Offset> _points = [];
  Offset _position = Offset.zero;
  Offset _velocity = const Offset(2, 2);
  final int _maxTrailLength = 40;
  Size _lastSize = Size.zero;
  final Random _random = Random();

  @override
  void initState() {
    super.initState();
    _ticker = createTicker(_onTick)..start();
  }

  void _onTick(Duration elapsed) {
    if (_lastSize == Size.zero) return;

    setState(() {
      _position += _velocity;

      // Bounce logic
      if (_position.dx < 0 || _position.dx > _lastSize.width) {
        _velocity = Offset(-_velocity.dx, _velocity.dy);
        _position = Offset(
          _position.dx.clamp(0.0, _lastSize.width),
          _position.dy,
        );
      }
      if (_position.dy < 0 || _position.dy > _lastSize.height) {
        _velocity = Offset(_velocity.dx, -_velocity.dy);
        _position = Offset(
          _position.dx,
          _position.dy.clamp(0.0, _lastSize.height),
        );
      }

      _points.add(_position);
      if (_points.length > _maxTrailLength) {
        _points.removeAt(0);
      }

      // Snake Movement: More winding
      if (_random.nextDouble() < 0.1) {
        // More frequent turns
        double angle = (_random.nextDouble() - 0.5) * 1.0; // Sharp turns
        double newDx = _velocity.dx * cos(angle) - _velocity.dy * sin(angle);
        double newDy = _velocity.dx * sin(angle) + _velocity.dy * cos(angle);

        Offset newVel = Offset(newDx, newDy);
        double currentSpeed = newVel.distance;
        if (currentSpeed > 0) {
          _velocity = newVel * (widget.speed / currentSpeed);
        }
      }
    });
  }

  @override
  void dispose() {
    _ticker.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (_lastSize != constraints.biggest) {
          _lastSize = constraints.biggest;
          if (_position == Offset.zero && !_lastSize.isEmpty) {
            _position = _lastSize.center(Offset.zero);
            double angle = _random.nextDouble() * 2 * pi;
            _velocity = Offset(cos(angle), sin(angle)) * widget.speed;
          }
        }
        return CustomPaint(
          size: Size.infinite,
          painter: _SnakePainter(
            points: List.from(_points),
            color: widget.color,
          ),
        );
      },
    );
  }
}

class _SnakePainter extends CustomPainter {
  final List<Offset> points;
  final Color color;

  _SnakePainter({required this.points, required this.color});

  @override
  void paint(Canvas canvas, Size size) {
    if (points.isEmpty) return;

    final paint = Paint()..style = PaintingStyle.fill;

    // Draw body: Tapering circles
    for (int i = 0; i < points.length; i++) {
      double progress = i / (points.length - 1);
      if (points.length == 1) progress = 1.0;

      double radius = 3.0 + (progress * 5.0); // 3.0 tail -> 8.0 head
      paint.color = color.withValues(alpha: 0.4 + (progress * 0.6));

      canvas.drawCircle(points[i], radius, paint);
    }

    // Draw Eyes
    if (points.length > 2) {
      Offset head = points.last;
      Offset neck = points[points.length - 3];
      Offset direction = head - neck;
      double angle = atan2(direction.dy, direction.dx);

      canvas.save();
      canvas.translate(head.dx, head.dy);
      canvas.rotate(angle);

      final eyePaint = Paint()..color = Colors.white;
      canvas.drawCircle(const Offset(2, -3), 2, eyePaint);
      canvas.drawCircle(const Offset(2, 3), 2, eyePaint);

      final pupilPaint = Paint()..color = Colors.black;
      canvas.drawCircle(const Offset(2.5, -3), 1, pupilPaint);
      canvas.drawCircle(const Offset(2.5, 3), 1, pupilPaint);

      canvas.restore();
    }
  }

  @override
  bool shouldRepaint(covariant _SnakePainter oldDelegate) {
    return true;
  }
}
