import 'package:flutter/material.dart';

import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';

import '../constants.dart';
import '../widgets/random_moving_line.dart';

class ContactSection extends StatefulWidget {
  const ContactSection({super.key});

  @override
  State<ContactSection> createState() => _ContactSectionState();
}

class _ContactSectionState extends State<ContactSection> {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _launchEmail() async {
    final String name = _nameController.text;
    final String email = _emailController.text;
    final String subject = _subjectController.text;
    final String message = _messageController.text;

    final Uri emailLaunchUri = Uri(
      scheme: 'mailto',
      path: AppStrings.emailAddress,
      queryParameters: {
        'subject': subject,
        'body': 'Name: $name\nEmail: $email\n\n$message',
      },
    );

    if (await canLaunchUrl(emailLaunchUri)) {
      await launchUrl(emailLaunchUri);
    } else {
      // Fallback: try to launch anyway, as canLaunchUrl sometimes returns false for mailto on certain platforms
      await launchUrl(emailLaunchUri);
    }
  }

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final backgroundColor = Theme.of(context).scaffoldBackgroundColor;

    return Container(
      width: double.infinity,
      color: backgroundColor,
      child: Stack(
        children: [
          const Positioned.fill(
            child: RandomMovingLine(color: Colors.purpleAccent, speed: 4.0),
          ),
          const Positioned.fill(
            child: RandomMovingLine(color: Colors.blueAccent, speed: 3.0),
          ),
          Positioned(
            bottom: 20,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Text('Made with ', style: TextStyle(color: Colors.grey)),
                const Icon(Icons.favorite, color: Colors.blue, size: 16),
                const Text(' in Flutter', style: TextStyle(color: Colors.grey)),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 80, horizontal: 20),
            child: LayoutBuilder(
              builder: (context, constraints) {
                bool isDesktop = constraints.maxWidth > 800;
                return Center(
                  child: ConstrainedBox(
                    constraints: const BoxConstraints(maxWidth: 1200),
                    child: Flex(
                      direction: isDesktop ? Axis.horizontal : Axis.vertical,
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        // IMAGE
                        Expanded(
                          flex: isDesktop ? 1 : 0,
                          child: Center(
                            child: Container(
                              width: isDesktop ? 400 : 250,
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(20),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.blueAccent.withOpacity(0.3),
                                    blurRadius: 100,
                                    spreadRadius: 20,
                                  ),
                                ],
                              ),
                              child: ClipRRect(
                                borderRadius: BorderRadius.circular(20),
                                child: Image.asset(
                                  'assets/images/contact.png',
                                  fit: BoxFit.contain,
                                ),
                              ),
                            ),
                          ),
                        ),

                        SizedBox(
                          width: isDesktop ? 60 : 0,
                          height: isDesktop ? 0 : 40,
                        ),

                        // FORM
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
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    AppStrings.contactTitle,
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 40,
                                      fontWeight: FontWeight.bold,
                                      color: textColor,
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 10),
                                Align(
                                  alignment: Alignment.centerLeft,
                                  child: Text(
                                    AppStrings.contactSubtitle,
                                    style: TextStyle(
                                      fontFamily: 'Inter',
                                      fontSize: 18,
                                      color: textColor?.withOpacity(0.6),
                                    ),
                                  ),
                                ),
                                const SizedBox(height: 30),
                                _ContactTextField(
                                  label: AppStrings.nameLabel,
                                  hint: AppStrings.nameHint,
                                  controller: _nameController,
                                ),
                                const SizedBox(height: 20),
                                _ContactTextField(
                                  label: AppStrings.emailLabel,
                                  hint: AppStrings.emailHint,
                                  controller: _emailController,
                                ),
                                const SizedBox(height: 20),
                                _ContactTextField(
                                  label: AppStrings.subjectLabel,
                                  hint: AppStrings.subjectHint,
                                  controller: _subjectController,
                                ),
                                const SizedBox(height: 20),
                                _ContactTextField(
                                  label: AppStrings.messageLabel,
                                  hint: AppStrings.messageHint,
                                  maxLines: 4,
                                  controller: _messageController,
                                ),
                                const SizedBox(height: 30),
                                SizedBox(
                                  width: double.infinity,
                                  height: 50,
                                  child: ElevatedButton(
                                    onPressed: _launchEmail,
                                    style: ElevatedButton.styleFrom(
                                      backgroundColor: Colors.blueAccent,
                                      foregroundColor: Colors.white,
                                      shape: RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(10),
                                      ),
                                      elevation: 5,
                                    ),
                                    child: Text(
                                      AppStrings.sendMessage,
                                      style: TextStyle(
                                        fontFamily: 'Inter',
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
                                      url: AppStrings.githubUrl,
                                    ),
                                    _SocialIconButton(
                                      icon: FontAwesomeIcons.linkedin,
                                      url: AppStrings.linkedinUrl,
                                    ),
                                    _SocialIconButton(
                                      icon: FontAwesomeIcons.envelope,
                                      url: AppStrings.emailUrl,
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
          ),
        ],
      ),
    );
  }
}

class _ContactTextField extends StatelessWidget {
  final String label;
  final String hint;
  final int maxLines;
  final TextEditingController? controller;

  const _ContactTextField({
    required this.label,
    required this.hint,
    this.maxLines = 1,
    this.controller,
  });

  @override
  Widget build(BuildContext context) {
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontFamily: 'Inter',
            fontWeight: FontWeight.w600,
            fontSize: 14,
            color: textColor,
          ),
        ),
        const SizedBox(height: 8),
        TextField(
          controller: controller,
          style: TextStyle(fontFamily: 'Inter', color: textColor),
          maxLines: maxLines,
          decoration: InputDecoration(
            labelText: label,
            labelStyle: TextStyle(
              fontFamily: 'Inter',
              color: textColor?.withOpacity(0.7),
            ),
            hintText: hint,
            hintStyle: TextStyle(fontFamily: 'Inter', color: Colors.grey),
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
