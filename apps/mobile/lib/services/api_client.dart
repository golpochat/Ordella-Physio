import 'package:dio/dio.dart';
import 'package:ordella_mobile/core/config/app_config.dart';
import 'package:ordella_mobile/core/constants/api_constants.dart';
import 'package:ordella_mobile/core/errors/api_exception.dart';
import 'package:uuid/uuid.dart';

typedef ApiContextProvider = ({
  String? accessToken,
  String? tenantId,
  String? correlationId,
}) Function();

typedef TokenRefreshCallback = Future<bool> Function();

class ApiClient {
  ApiClient({
    required AppConfig config,
    required ApiContextProvider getContext,
    TokenRefreshCallback? onUnauthorized,
    Dio? dio,
  })  : _getContext = getContext,
        _onUnauthorized = onUnauthorized,
        _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: config.apiGatewayUrl,
                connectTimeout: const Duration(seconds: 15),
                receiveTimeout: const Duration(seconds: 30),
                headers: {'Content-Type': 'application/json'},
              ),
            ) {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) {
          final ctx = _getContext();
          final correlationId = ctx.correlationId ?? const Uuid().v4();
          options.headers[ApiConstants.correlationIdHeader] = correlationId;
          if (ctx.tenantId != null && ctx.tenantId!.isNotEmpty) {
            options.headers[ApiConstants.tenantHeader] = ctx.tenantId;
          }
          if (ctx.accessToken != null && ctx.accessToken!.isNotEmpty) {
            options.headers[ApiConstants.authorizationHeader] =
                'Bearer ${ctx.accessToken}';
          }
          handler.next(options);
        },
        onError: (error, handler) async {
          final status = error.response?.statusCode;
          if (status == 401 && _onUnauthorized != null) {
            final refreshed = await _onUnauthorized!();
            if (refreshed) {
              try {
                final response = await _retry(error.requestOptions);
                handler.resolve(response);
                return;
              } catch (_) {}
            }
          }
          handler.next(error);
        },
      ),
    );
  }

  final ApiContextProvider _getContext;
  final TokenRefreshCallback? _onUnauthorized;
  final Dio _dio;

  String servicePath(String service) {
    final path = ApiConstants.gatewayPaths[service];
    if (path == null) {
      throw ApiException('Unknown service: $service');
    }
    return path;
  }

  Future<T> get<T>(
    String service,
    String path, {
    Map<String, dynamic>? queryParameters,
  }) {
    return _request<T>(
      method: 'GET',
      service: service,
      path: path,
      queryParameters: queryParameters,
    );
  }

  Future<T> post<T>(
    String service,
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request<T>(
      method: 'POST',
      service: service,
      path: path,
      body: body,
      queryParameters: queryParameters,
    );
  }

  Future<T> patch<T>(
    String service,
    String path, {
    dynamic body,
    Map<String, dynamic>? queryParameters,
  }) {
    return _request<T>(
      method: 'PATCH',
      service: service,
      path: path,
      body: body,
      queryParameters: queryParameters,
    );
  }

  Future<T> delete<T>(
    String service,
    String path, {
    Map<String, dynamic>? queryParameters,
  }) {
    return _request<T>(
      method: 'DELETE',
      service: service,
      path: path,
      queryParameters: queryParameters,
    );
  }

  Future<T> _request<T>({
    required String method,
    required String service,
    required String path,
    dynamic body,
    Map<String, dynamic>? queryParameters,
  }) async {
    final normalizedPath = path.startsWith('/') ? path : '/$path';
    final url = '${servicePath(service)}$normalizedPath';

    try {
      final response = await _dio.request<dynamic>(
        url,
        data: body,
        queryParameters: queryParameters,
        options: Options(method: method),
      );

      return _unwrap<T>(response.data);
    } on DioException catch (e) {
      final payload = e.response?.data;
      final message = _extractMessage(payload) ?? e.message ?? 'Request failed';
      throw ApiException(message, statusCode: e.response?.statusCode, payload: payload);
    }
  }

  Future<Response<dynamic>> _retry(RequestOptions options) {
    final ctx = _getContext();
    final headers = Map<String, dynamic>.from(options.headers);
    if (ctx.tenantId != null) {
      headers[ApiConstants.tenantHeader] = ctx.tenantId;
    }
    if (ctx.accessToken != null) {
      headers[ApiConstants.authorizationHeader] = 'Bearer ${ctx.accessToken}';
    }

    return _dio.request<dynamic>(
      options.path,
      data: options.data,
      queryParameters: options.queryParameters,
      options: Options(
        method: options.method,
        headers: headers,
        contentType: options.contentType,
        responseType: options.responseType,
      ),
    );
  }

  T _unwrap<T>(dynamic data) {
    if (data == null) {
      return null as T;
    }
    if (data is Map<String, dynamic> && data.containsKey('data')) {
      return data['data'] as T;
    }
    return data as T;
  }

  String? _extractMessage(dynamic payload) {
    if (payload is Map<String, dynamic>) {
      final message = payload['message'];
      if (message is String) return message;
      if (message is List && message.isNotEmpty) {
        return message.first.toString();
      }
    }
    return null;
  }
}
