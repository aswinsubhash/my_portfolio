import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

class ContactSection extends StatelessWidget {
  const ContactSection({super.key});

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    // Use scaffold background color as requested (same as About section usually)
    final backgroundColor = Theme.of(context).scaffoldBackgroundColor;

    return Container(
      width: double.infinity,
      color: backgroundColor,
      padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
      child: LayoutBuilder(
        builder: (context, constraints) {
          bool isDesktop = constraints.maxWidth > 800;
          return Center(
            // Center content nicely
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 1200),
              child: Flex(
                direction: isDesktop ? Axis.horizontal : Axis.vertical,
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment:
                    CrossAxisAlignment.center, // Align vertical centers
                children: [
                  // IMAGE (Left on Desktop, Top on Mobile)
                  Expanded(
                    flex: isDesktop ? 1 : 0,
                    child: Center(
                      child: Container(
                        width: isDesktop ? 400 : 250,
                        height: isDesktop ? 400 : 250,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          boxShadow: [
                            BoxShadow(
                              color: Colors.blueAccent.withOpacity(0.3),
                              blurRadius: 50,
                              spreadRadius: 10,
                            ),
                          ],
                        ),
                        child: ClipOval(
                          child: Image.asset(
                            'assets/images/profile.png',
                            fit: BoxFit.cover,
                          ),
                        ),
                      ),
                    ),
                  ),

                  SizedBox(
                    width: isDesktop ? 60 : 0,
                    height: isDesktop ? 0 : 40,
                  ),

                  // FORM (Right on Desktop, Bottom on Mobile)
                  Expanded(
                    flex: isDesktop ? 1 : 0,
                    child: Container(
                      padding: const EdgeInsets.all(30),
                      decoration: BoxDecoration(
                        color: Theme.of(context).cardColor,
                        borderRadius: BorderRadius.circular(20),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(0.1),
                            blurRadius: 20,
                            offset: const Offset(0, 10),
                          ),
                        ],
                      ),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            "Get In Touch",
                            style: GoogleFonts.outfit(
                              fontSize: 32,
                              fontWeight: FontWeight.bold,
                              color: textColor,
                            ),
                          ),
                          const SizedBox(height: 10),
                          Text(
                            "Have a project in mind? Let's talk.",
                            style: GoogleFonts.inter(
                              fontSize: 16,
                              color: textColor?.withOpacity(0.7),
                            ),
                          ),
                          const SizedBox(height: 30),
                          _ContactTextField(label: "Name", hint: "Your Name"),
                          const SizedBox(height: 20),
                          _ContactTextField(
                            label: "Email",
                            hint: "your.email@example.com",
                          ),
                          const SizedBox(height: 20),
                          _ContactTextField(
                            label: "Message",
                            hint: "Tell me about your project",
                            maxLines: 4,
                          ),
                          const SizedBox(height: 30),
                          SizedBox(
                            width: double.infinity,
                            height: 50,
                            child: ElevatedButton(
                              onPressed: () {},
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.blueAccent,
                                foregroundColor: Colors.white,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                                elevation: 5,
                              ),
                              child: Text(
                                "Send Message",
                                style: GoogleFonts.inter(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(height: 30),
                          Wrap(
                            spacing: 15,
                            runSpacing: 15,
                            children: const [
                              _SocialIconButton(
                                icon: FontAwesomeIcons.github,
                                url: "https://github.com/aswinsubhash",
                              ),
                              _SocialIconButton(
                                icon: FontAwesomeIcons.linkedin,
                                url: "https://www.linkedin.com/in/aswinsubhash",
                              ),
                              _SocialIconButton(
                                icon: FontAwesomeIcons.envelope,
                                url: "mailto:aswinofficial3@gmail.com",
                              ),
                            ],
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}

class _ContactTextField extends StatelessWidget {
  final String label;
  final String hint;
  final int maxLines;

  const _ContactTextField({
    required this.label,
    required this.hint,
    this.maxLines = 1,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.inter(fontWeight: FontWeight.w600, fontSize: 14),
        ),
        const SizedBox(height: 8),
        TextField(
          maxLines: maxLines,
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: GoogleFonts.inter(color: Colors.grey),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: BorderSide(color: Colors.grey.withOpacity(0.3)),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(10),
              borderSide: const BorderSide(color: Colors.blueAccent),
            ),
            filled: true,
            fillColor: Theme.of(context).cardColor,
            contentPadding: const EdgeInsets.all(16),
          ),
        ),
      ],
    );
  }
}

class _SocialIconButton extends StatelessWidget {
  final IconData icon;
  final String url;

  const _SocialIconButton({required this.icon, required this.url});

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    return IconButton(
      onPressed: () async {
        final uri = Uri.parse(url);
        if (await canLaunchUrl(uri)) {
          await launchUrl(uri);
        }
      },
      icon: FaIcon(icon, size: 24),
      style: IconButton.styleFrom(
        backgroundColor: isDark ? Colors.grey[800] : Colors.grey[200],
        foregroundColor: isDark ? Colors.white : Colors.black,
        padding: const EdgeInsets.all(12),
      ),
    );
  }
}
