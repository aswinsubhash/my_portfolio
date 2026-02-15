import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final backgroundColor = isDark ? Colors.black87 : Colors.grey.shade100;
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;

    return Container(
      width: double.infinity,
      color: backgroundColor,
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      child: Column(
        children: [
          Text(
            "Get In Touch",
            style: GoogleFonts.outfit(
              fontSize: 40,
              fontWeight: FontWeight.bold,
              color: textColor,
            ),
          ),
          const SizedBox(height: 10),
          Text(
            "Let's build something amazing together",
            style: GoogleFonts.inter(
              fontSize: 18,
              color: textColor?.withOpacity(0.7),
            ),
          ),
          const SizedBox(height: 50),
          Wrap(
            spacing: 20,
            runSpacing: 20,
            alignment: WrapAlignment.center,
            children: const [
              _SocialButton(
                icon: FontAwesomeIcons.github,
                url: "https://github.com/aswinsubhash",
                label: "GitHub",
              ),
              _SocialButton(
                icon: FontAwesomeIcons.linkedin,
                url: "https://www.linkedin.com/in/aswinsubhash",
                label: "LinkedIn",
              ),
              _SocialButton(
                icon: FontAwesomeIcons.envelope,
                url: "mailto:aswinofficial3@gmail.com",
                label: "Email",
              ),
            ],
          ),
          const SizedBox(height: 80),
          Text(
            "© 2026 Aswin Subhash. All rights reserved.",
            style: GoogleFonts.inter(
              fontSize: 14,
              color: textColor?.withOpacity(0.3),
            ),
          ),
          const SizedBox(height: 20),
          Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                "Made with ",
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: textColor?.withOpacity(0.3),
                ),
              ),
              const Icon(Icons.favorite, size: 12, color: Colors.redAccent),
              Text(
                " in Flutter",
                style: GoogleFonts.inter(
                  fontSize: 12,
                  color: textColor?.withOpacity(0.3),
                ),
              ),
              const SizedBox(width: 5),
              const Icon(Icons.flutter_dash, size: 14, color: Colors.blue),
            ],
          ),
        ],
      ),
    );
  }
}

class _SocialButton extends StatefulWidget {
  final IconData icon;
  final String url;
  final String label;

  const _SocialButton({
    required this.icon,
    required this.url,
    required this.label,
  });

  @override
  State<_SocialButton> createState() => _SocialButtonState();
}

class _SocialButtonState extends State<_SocialButton> {
  bool _isHovered = false;

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final borderColor = isDark ? Colors.white : Colors.black;

    // Default: border color (white/black). Hover: inverted (black/white or white/black)
    // Actually, usually hover means "fill".
    // If dark mode: default is transparent with white border. Hover usually fills white with black text.
    // If light mode: default is transparent with black border. Hover fills black with white text.

    final fillOnHover = isDark ? Colors.white : Colors.black;
    final textOnHover = isDark ? Colors.black : Colors.white;

    return MouseRegion(
      onEnter: (_) => setState(() => _isHovered = true),
      onExit: (_) => setState(() => _isHovered = false),
      child: GestureDetector(
        onTap: () async {
          final uri = Uri.parse(widget.url);
          if (await canLaunchUrl(uri)) {
            await launchUrl(uri);
          }
        },
        child: AnimatedContainer(
          duration: const Duration(milliseconds: 200),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          decoration: BoxDecoration(
            color: _isHovered ? fillOnHover : Colors.transparent,
            borderRadius: BorderRadius.circular(30),
            border: Border.all(color: borderColor),
          ),
          child: Row(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(
                widget.icon,
                size: 20,
                color: _isHovered ? textOnHover : textColor,
              ),
              const SizedBox(width: 10),
              Text(
                widget.label,
                style: GoogleFonts.inter(
                  color: _isHovered ? textOnHover : textColor,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
