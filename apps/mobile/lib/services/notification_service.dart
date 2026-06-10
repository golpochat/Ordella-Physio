import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/cache_service.dart';

class NotificationService {
  NotificationService({required ApiClient apiClient, required CacheService cache})
      : _api = apiClient,
        _cache = cache;

  final ApiClient _api;
  final CacheService _cache;
  static const _cacheKey = 'notifications_list';

  Future<List<AppNotification>> list({
    bool unreadOnly = false,
    int limit = 50,
  }) async {
    try {
      final response = await _api.get<dynamic>(
        'notifications',
        '',
        queryParameters: {
          if (unreadOnly) 'unreadOnly': true,
          'limit': limit,
        },
      );
      final items = _normalizeList(response);
      await _cache.putList(_cacheKey, items.map(_toJson).toList());
      return items;
    } catch (e) {
      final cached = _cache.getList(_cacheKey, AppNotification.fromJson);
      if (cached.isNotEmpty) return cached;
      rethrow;
    }
  }

  Future<int> unreadCount() async {
    final response =
        await _api.get<Map<String, dynamic>>('notifications', '/unread-count');
    return response['count'] as int? ?? 0;
  }

  Future<void> markRead(List<String> notificationIds) async {
    await _api.post<void>(
      'notifications',
      '/mark-read',
      body: {'notificationIds': notificationIds},
    );
  }

  Future<void> markAllRead() async {
    await _api.post<void>('notifications', '/mark-all-read');
  }

  Future<void> registerDeviceToken({
    required String token,
    required String platform,
  }) async {
    await _api.post<void>(
      'notifications',
      '/device-tokens',
      body: {'token': token, 'platform': platform},
    );
  }

  Future<void> unregisterDeviceToken(String token) async {
    await _api.delete<void>(
      'notifications',
      '/device-tokens',
      queryParameters: {'token': token},
    );
  }

  List<AppNotification> _normalizeList(dynamic response) {
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(AppNotification.fromJson)
          .toList();
    }
    if (response is Map<String, dynamic>) {
      final data = response['data'];
      if (data is List) {
        return data
            .whereType<Map<String, dynamic>>()
            .map(AppNotification.fromJson)
            .toList();
      }
    }
    return [];
  }

  Map<String, dynamic> _toJson(AppNotification n) => {
        'id': n.id,
        'tenantId': n.tenantId,
        'userId': n.userId,
        'type': n.type,
        'title': n.title,
        'message': n.message,
        'metadata': n.metadata,
        'readAt': n.readAt,
        'isRead': n.isRead,
        'createdAt': n.createdAt,
      };
}
