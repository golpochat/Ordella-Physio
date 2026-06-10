class ApiException implements Exception {
  ApiException(this.message, {this.statusCode, this.payload});

  final String message;
  final int? statusCode;
  final dynamic payload;

  @override
  String toString() => 'ApiException($statusCode): $message';
}
