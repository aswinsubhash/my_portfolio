import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio_web/main.dart';

void main() {
  testWidgets('App renders smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const PortfolioApp());

    // Verify that our app renders the home page.
    expect(find.byType(PortfolioHomePage), findsOneWidget);
  });
}
