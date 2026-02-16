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

class _ContactSectionState extends State<ContactSection>
    with AutomaticKeepAliveClientMixin {
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _subjectController = TextEditingController();
  final _messageController = TextEditingController();

  // Error states for custom validation
  String? _nameError;
  String? _emailError;
  String? _subjectError;
  String? _messageError;

  @override
  bool get wantKeepAlive => true;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _subjectController.dispose();
    _messageController.dispose();
    super.dispose();
  }

  String? _validateName(String value) {
    if (value.trim().isEmpty) {
      return 'Please enter your name';
    }
    return null;
  }

  String? _validateEmail(String value) {
    if (value.trim().isEmpty) {
      return 'Please enter your email';
    }
    final emailRegex = RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$');
    if (!emailRegex.hasMatch(value)) {
      return 'Please enter a valid email';
    }
    return null;
  }

  String? _validateSubject(String value) {
    if (value.trim().isEmpty) {
      return 'Please enter a subject';
    }
    return null;
  }

  String? _validateMessage(String value) {
    if (value.trim().isEmpty) {
      return 'Please enter a message';
    }
    if (value.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    return null;
  }

  bool _validateForm() {
    setState(() {
      _nameError = _validateName(_nameController.text);
      _emailError = _validateEmail(_emailController.text);
      _subjectError = _validateSubject(_subjectController.text);
      _messageError = _validateMessage(_messageController.text);
    });

    return _nameError == null &&
        _emailError == null &&
        _subjectError == null &&
        _messageError == null;
  }

  Future<void> _launchEmail() async {
    // Validate form before sending
    if (!_validateForm()) {
      return;
    }

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
    super.build(context);
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;
    final backgroundColor = Theme.of(context).scaffoldBackgroundColor;

    return Container(
      width: double.infinity,
      color: backgroundColor,
      child: Stack(
        children: [
          // Background Animations - Isolated in RepaintBoundary
          const Positioned.fill(
            child: RepaintBoundary(
              child: Stack(
                children: [
                  Positioned.fill(
                    child: RandomMovingLine(
                      color: Colors.purpleAccent,
                      speed: 4.0,
                    ),
                  ),
                  Positioned.fill(
                    child: RandomMovingLine(
                      color: Colors.blueAccent,
                      speed: 3.0,
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Main Content
          LayoutBuilder(
            builder: (context, constraints) {
              bool isDesktop = constraints.maxWidth > 800;

              return SizedBox(
                width: double.infinity,
                child: Column(
                  children: [
                    Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 1200),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              // Section Title
                              Text(
                                AppStrings.contactTitle,
                                style: TextStyle(
                                  fontFamily: 'Inter',
                                  fontSize: 24,
                                  fontWeight: FontWeight.bold,
                                  color: textColor,
                                ),
                              ),
                              const SizedBox(height: 40),

                              // Content Body
                              if (isDesktop)
                                _buildDesktopLayout(context)
                              else
                                _buildMobileLayout(context),

                              const SizedBox(height: 40),
                            ],
                          ),
                        ),
                      ),
                    ),
                    // Footer Divider - Full Width
                    Divider(
                      color: Colors.grey.withOpacity(0.3),
                      thickness: 1,
                      height: 1,
                    ),
                    const SizedBox(height: 20),
                    // Footer Content - Constrained
                    Center(
                      child: ConstrainedBox(
                        constraints: const BoxConstraints(maxWidth: 1200),
                        child: Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 20),
                          child: LayoutBuilder(
                            builder: (context, constraints) {
                              bool isMobile = constraints.maxWidth < 600;

                              if (isMobile) {
                                // Mobile: Stack vertically
                                return Column(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    // Copyright
                                    Text(
                                      '© 2026 Aswin Subhash. All rights reserved.',
                                      style: TextStyle(
                                        color: Colors.grey.withOpacity(0.6),
                                        fontSize: 11,
                                      ),
                                      textAlign: TextAlign.center,
                                    ),
                                    const SizedBox(height: 10),
                                    // Made with Flutter
                                    Row(
                                      mainAxisSize: MainAxisSize.min,
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      children: [
                                        Text(
                                          'Made with ',
                                          style: TextStyle(
                                            color: Colors.grey.withOpacity(0.6),
                                            fontSize: 11,
                                          ),
                                        ),
                                        const Icon(
                                          Icons.favorite,
                                          color: Colors.blue,
                                          size: 11,
                                        ),
                                        Text(
                                          ' in Flutter',
                                          style: TextStyle(
                                            color: Colors.grey.withOpacity(0.6),
                                            fontSize: 11,
                                          ),
                                        ),
                                      ],
                                    ),
                                    const SizedBox(height: 10),
                                    // Social Media Icons
                                    Wrap(
                                      spacing: 15,
                                      runSpacing: 15,
                                      alignment: WrapAlignment.center,
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
                                );
                              }

                              // Desktop: Horizontal layout
                              return Row(
                                mainAxisAlignment:
                                    MainAxisAlignment.spaceBetween,
                                children: [
                                  // Copyright - Left
                                  Text(
                                    '© 2026 Aswin Subhash. All rights reserved.',
                                    style: TextStyle(
                                      color: Colors.grey.withOpacity(0.6),
                                      fontSize: 11,
                                    ),
                                  ),
                                  // Made with Flutter - Center
                                  Row(
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        'Made with ',
                                        style: TextStyle(
                                          color: Colors.grey.withOpacity(0.6),
                                          fontSize: 11,
                                        ),
                                      ),
                                      const Icon(
                                        Icons.favorite,
                                        color: Colors.blue,
                                        size: 11,
                                      ),
                                      Text(
                                        ' in Flutter',
                                        style: TextStyle(
                                          color: Colors.grey.withOpacity(0.6),
                                          fontSize: 11,
                                        ),
                                      ),
                                    ],
                                  ),
                                  // Social Media Icons - Right
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
                              );
                            },
                          ),
                        ),
                      ),
                    ),
                    const SizedBox(height: 20),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Image Side
        Expanded(
          flex: 1,
          child: Container(
            height: 400, // Fixed height for stability
            alignment: Alignment.topCenter,
            child: Container(
              width: 400,
              height: 400,
              decoration: BoxDecoration(
                color: Theme.of(context).cardColor,
                borderRadius: BorderRadius.circular(20),
                boxShadow: [
                  BoxShadow(
                    color: Colors.blueAccent.withOpacity(0.3),
                    blurRadius: 60, // Reduced from 100 for performance
                    spreadRadius: 20,
                  ),
                ],
              ),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(20),
                child: Image.asset(
                  'assets/images/contact.png',
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
        ),

        const SizedBox(width: 60),

        // Form Side
        Expanded(
          flex: 1,
          child: Container(
            height: 400, // Fixed height matching image
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
              mainAxisSize: MainAxisSize
                  .min, // Although height is fixed, this keeps content top-aligned
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildTextField(
                  label: AppStrings.nameLabel,
                  hint: AppStrings.nameHint,
                  controller: _nameController,
                  error: _nameError,
                  validator: _validateName,
                  height: 48,
                ),
                const SizedBox(height: 16),
                _buildTextField(
                  label: AppStrings.emailLabel,
                  hint: AppStrings.emailHint,
                  controller: _emailController,
                  error: _emailError,
                  validator: _validateEmail,
                  height: 48,
                ),
                const SizedBox(height: 16),
                _buildTextField(
                  label: AppStrings.subjectLabel,
                  hint: AppStrings.subjectHint,
                  controller: _subjectController,
                  error: _subjectError,
                  validator: _validateSubject,
                  height: 48,
                ),
                const SizedBox(height: 16),
                _buildTextField(
                  label: AppStrings.messageLabel,
                  hint: AppStrings.messageHint,
                  controller: _messageController,
                  error: _messageError,
                  validator: _validateMessage,
                  maxLines: 4,
                  height: 68,
                ),
                const Spacer(), // Pushes button to bottom
                SizedBox(
                  width: double.infinity,
                  height: 56,
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
                      style: const TextStyle(
                        fontFamily: 'Inter',
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return Column(
      children: [
        // Form Side
        Container(
          padding: const EdgeInsets.all(30),
          decoration: BoxDecoration(
            color: Theme.of(context).cardColor,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withValues(alpha: 0.1),
                blurRadius: 20,
                offset: const Offset(0, 10),
              ),
            ],
          ),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildTextField(
                label: AppStrings.nameLabel,
                hint: AppStrings.nameHint,
                controller: _nameController,
                error: _nameError,
                validator: _validateName,
                height: 48,
              ),
              const SizedBox(height: 16),
              _buildTextField(
                label: AppStrings.emailLabel,
                hint: AppStrings.emailHint,
                controller: _emailController,
                error: _emailError,
                validator: _validateEmail,
                height: 48,
              ),
              const SizedBox(height: 16),
              _buildTextField(
                label: AppStrings.subjectLabel,
                hint: AppStrings.subjectHint,
                controller: _subjectController,
                error: _subjectError,
                validator: _validateSubject,
                height: 48,
              ),
              const SizedBox(height: 16),
              _buildTextField(
                label: AppStrings.messageLabel,
                hint: AppStrings.messageHint,
                controller: _messageController,
                error: _messageError,
                validator: _validateMessage,
                maxLines: 4,
                height: 68,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                height: 56,
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
                    style: const TextStyle(
                      fontFamily: 'Inter',
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildTextField({
    required String label,
    required String hint,
    required TextEditingController controller,
    String? error,
    required Function(String) validator,
    int maxLines = 1,
    required double height,
  }) {
    final hasError = error != null;
    final textColor = Theme.of(context).textTheme.bodyLarge?.color;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Container(
          height: height,
          clipBehavior: Clip.antiAlias,
          decoration: BoxDecoration(
            color: Theme.of(context).cardColor,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: hasError ? Colors.redAccent : Colors.grey.withOpacity(0.3),
              width: hasError ? 2 : 1,
            ),
          ),
          child: TextField(
            controller: controller,
            onChanged: (value) {
              if (error != null) {
                setState(() {
                  if (controller == _nameController)
                    _nameError = _validateName(value);
                  if (controller == _emailController)
                    _emailError = _validateEmail(value);
                  if (controller == _subjectController)
                    _subjectError = _validateSubject(value);
                  if (controller == _messageController)
                    _messageError = _validateMessage(value);
                });
              }
            },
            style: TextStyle(fontFamily: 'Inter', color: textColor),
            maxLines: maxLines,
            decoration: InputDecoration(
              hintText: hint,
              hintStyle: const TextStyle(
                fontFamily: 'Inter',
                color: Colors.grey,
              ),
              border: InputBorder.none,
              enabledBorder: InputBorder.none,
              focusedBorder: InputBorder.none,
              contentPadding: const EdgeInsets.all(16),
            ),
          ),
        ),
        if (hasError)
          Padding(
            padding: const EdgeInsets.only(top: 8, left: 4),
            child: Row(
              children: [
                const Icon(
                  Icons.error_outline,
                  color: Colors.redAccent,
                  size: 16,
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Text(
                    error,
                    style: const TextStyle(
                      color: Colors.redAccent,
                      fontSize: 12,
                      fontFamily: 'Inter',
                    ),
                  ),
                ),
              ],
            ),
          ),
      ],
    );
  }
}

class _SocialIconButton extends StatelessWidget {
  final IconData icon;
  final String url;
  final bool isMobile;

  const _SocialIconButton({
    required this.icon,
    required this.url,
    this.isMobile = false,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final iconSize = isMobile ? 16.0 : 20.0;
    final padding = isMobile ? 6.0 : 10.0;

    return IconButton(
      onPressed: () async {
        final uri = Uri.parse(url);
        if (await canLaunchUrl(uri)) {
          await launchUrl(uri);
        }
      },
      icon: FaIcon(icon, size: iconSize),
      style: IconButton.styleFrom(
        backgroundColor: isDark ? Colors.grey[800] : Colors.grey[200],
        foregroundColor: isDark ? Colors.white : Colors.black,
        padding: EdgeInsets.all(padding),
      ),
    );
  }
}
