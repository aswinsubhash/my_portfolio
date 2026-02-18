import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:http/http.dart' as http;

import '../constants.dart';
import '../widgets/random_moving_line.dart';
import '../widgets/star_field_background.dart';

class ContactSection extends StatefulWidget {
  final GlobalKey? key;
  const ContactSection({this.key}) : super(key: key);

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

  bool _isSending = false;
  bool _showSuccess = false;

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

  Future<void> _submitToGoogleForm() async {
    if (!_validateForm()) return;

    setState(() {
      _isSending = true;
    });

    const String formUrl =
        'https://docs.google.com/forms/d/1DBlSf-ggjPkzbLsRR0rZlwyIwxcbXsfgJh6NognhMHg/formResponse';
    const String nameEntryId = 'entry.1105429070';
    const String emailEntryId = 'entry.1045630864';
    const String subjectEntryId = 'entry.846492184';
    const String messageEntryId = 'entry.591229160';

    try {
      final response = await http.post(
        Uri.parse(formUrl),
        body: {
          nameEntryId: _nameController.text,
          emailEntryId: _emailController.text,
          subjectEntryId: _subjectController.text,
          messageEntryId: _messageController.text,
        },
      );

      if (mounted) {
        if (response.statusCode == 200 ||
            response.statusCode == 302 ||
            response.statusCode == 0) {
          _handleSuccess();
        } else {
          throw Exception('Status code: ${response.statusCode}');
        }
      }
    } catch (e) {
      debugPrint('Google Form Error: $e');
      if (mounted) {
        _handleSuccess();
      }
    } finally {
      if (mounted) {
        setState(() {
          _isSending = false;
        });
      }
    }
  }

  void _handleSuccess() {
    setState(() {
      _showSuccess = true;
    });
    _nameController.clear();
    _emailController.clear();
    _subjectController.clear();
    _messageController.clear();

    Future.delayed(const Duration(seconds: 5), () {
      if (mounted) {
        setState(() {
          _showSuccess = false;
        });
      }
    });
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
                  Positioned.fill(child: StarFieldBackground(starCount: 80)),
                ],
              ),
            ),
          ),
          // Main Content
          LayoutBuilder(
            builder: (context, constraints) {
              bool isDesktop = constraints.maxWidth > 800;

              return Column(
                children: [
                  Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 1200),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
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
                            AnimatedSwitcher(
                              duration: const Duration(milliseconds: 500),
                              child: _showSuccess
                                  ? _buildSuccessView(context)
                                  : (isDesktop
                                        ? _buildDesktopLayout(context)
                                        : _buildMobileLayout(context)),
                            ),
                            const SizedBox(height: 40),
                          ],
                        ),
                      ),
                    ),
                  ),
                  Divider(
                    color: Colors.grey.withValues(alpha: 0.3),
                    thickness: 1,
                    height: 1,
                  ),
                  const SizedBox(height: 20),
                  Center(
                    child: ConstrainedBox(
                      constraints: const BoxConstraints(maxWidth: 1200),
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 20),
                        child: _buildFooter(context),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildFooter(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        bool isMobile = constraints.maxWidth < 600;
        if (isMobile) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                '© 2026 Aswin Subhash. All rights reserved.',
                style: TextStyle(
                  color: Colors.grey.withValues(alpha: 0.6),
                  fontSize: 11,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 10),
              _buildMadeWithFlutter(),
              const SizedBox(height: 10),
              _buildSocialIcons(true),
            ],
          );
        }
        return Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              '© 2026 Aswin Subhash. All rights reserved.',
              style: TextStyle(
                color: Colors.grey.withValues(alpha: 0.6),
                fontSize: 11,
              ),
            ),
            _buildMadeWithFlutter(),
            _buildSocialIcons(false),
          ],
        );
      },
    );
  }

  Widget _buildMadeWithFlutter() {
    return Row(
      mainAxisSize: MainAxisSize.min,
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          'Made with ',
          style: TextStyle(
            color: Colors.grey.withValues(alpha: 0.6),
            fontSize: 11,
          ),
        ),
        const Icon(Icons.favorite, color: Colors.blue, size: 11),
        Text(
          ' in Flutter',
          style: TextStyle(
            color: Colors.grey.withValues(alpha: 0.6),
            fontSize: 11,
          ),
        ),
      ],
    );
  }

  Widget _buildSocialIcons(bool isMobile) {
    return Wrap(
      spacing: 15,
      runSpacing: 15,
      alignment: WrapAlignment.center,
      children: [
        _SocialIconButton(
          icon: FontAwesomeIcons.github,
          url: AppStrings.githubUrl,
          isMobile: isMobile,
        ),
        _SocialIconButton(
          icon: FontAwesomeIcons.linkedin,
          url: AppStrings.linkedinUrl,
          isMobile: isMobile,
        ),
        _SocialIconButton(
          icon: FontAwesomeIcons.envelope,
          url: AppStrings.emailUrl,
          isMobile: isMobile,
        ),
      ],
    );
  }

  Widget _buildDesktopLayout(BuildContext context) {
    return IntrinsicHeight(
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Expanded(flex: 1, child: _buildContactImage(context)),
          const SizedBox(width: 60),
          Expanded(flex: 1, child: _buildContactForm(context)),
        ],
      ),
    );
  }

  Widget _buildMobileLayout(BuildContext context) {
    return _buildContactForm(context);
  }

  Widget _buildContactImage(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 400),
      alignment: Alignment.topCenter,
      child: Container(
        width: 400,
        height: 400,
        decoration: BoxDecoration(
          color: Theme.of(context).cardColor,
          borderRadius: BorderRadius.circular(20),
          boxShadow: [
            BoxShadow(
              color: Colors.blueAccent.withValues(alpha: 0.3),
              blurRadius: 60,
              spreadRadius: 20,
            ),
          ],
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(20),
          child: Image.asset('assets/images/contact.png', fit: BoxFit.cover),
        ),
      ),
    );
  }

  Widget _buildContactForm(BuildContext context) {
    return Container(
      constraints: const BoxConstraints(minHeight: 400),
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
        key: const ValueKey('form_fields'),
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
              onPressed: _isSending ? null : _submitToGoogleForm,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.blueAccent,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(10),
                ),
                elevation: 5,
              ),
              child: _isSending
                  ? const SizedBox(
                      width: 24,
                      height: 24,
                      child: CircularProgressIndicator(
                        color: Colors.white,
                        strokeWidth: 2,
                      ),
                    )
                  : Text(
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
    );
  }

  Widget _buildSuccessView(BuildContext context) {
    return Column(
      key: const ValueKey('success_message'),
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Icon(Icons.check_circle_outline, color: Colors.green, size: 80),
        const SizedBox(height: 20),
        Text(
          'Message Sent!',
          style: TextStyle(
            fontFamily: 'Inter',
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Theme.of(context).textTheme.bodyLarge?.color,
          ),
        ),
        const SizedBox(height: 10),
        Text(
          'Thank you for reaching out. I\'ll get back to you as soon as possible.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontFamily: 'Inter',
            fontSize: 16,
            color: Theme.of(
              context,
            ).textTheme.bodyMedium?.color?.withValues(alpha: 0.7),
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
              color: hasError
                  ? Colors.redAccent
                  : Colors.grey.withValues(alpha: 0.3),
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
