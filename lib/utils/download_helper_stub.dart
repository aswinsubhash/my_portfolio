import 'package:flutter/foundation.dart';

class DownloadHelper {
  static void download(String url, String fileName) {
    // No-op for non-web platforms or fallback
    debugPrint('Download not supported on this platform');
  }
}
