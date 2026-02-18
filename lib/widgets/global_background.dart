import 'package:flutter/material.dart';
import 'random_moving_line.dart';
import 'star_field_background.dart';

class GlobalBackground extends StatelessWidget {
  final int starCount;
  final Color snakeColor1;
  final Color snakeColor2;

  const GlobalBackground({
    super.key,
    this.starCount = 100,
    this.snakeColor1 = Colors.purpleAccent,
    this.snakeColor2 = Colors.blueAccent,
  });

  @override
  Widget build(BuildContext context) {
    return RepaintBoundary(
      child: Stack(
        children: [
          Positioned.fill(
            child: RandomMovingLine(color: snakeColor1, speed: 4.0),
          ),
          Positioned.fill(
            child: RandomMovingLine(color: snakeColor2, speed: 3.0),
          ),
          Positioned.fill(child: StarFieldBackground(starCount: starCount)),
        ],
      ),
    );
  }
}
