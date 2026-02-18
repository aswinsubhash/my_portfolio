// ignore_for_file: deprecated_member_use, avoid_web_libraries_in_flutter
import 'dart:html' as html;

class DownloadHelper {
  static void download(String url, String fileName) async {
    // Fetching the file as a Blob to force the 'download' attribute behavior
    html.HttpRequest.request(url, responseType: 'blob').then((request) {
      final blob = request.response as html.Blob;
      final url = html.Url.createObjectUrlFromBlob(blob);
      html.AnchorElement(href: url)
        ..setAttribute('download', fileName)
        ..click();
      html.Url.revokeObjectUrl(url);
    });
  }
}
