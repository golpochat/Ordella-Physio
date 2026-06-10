import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/core/config/app_config.dart';
import 'package:ordella_mobile/services/api_client.dart';

class TenantService {
  TenantService({required ApiClient apiClient, required AppConfig config})
      : _api = apiClient,
        _config = config;

  final ApiClient _api;
  final AppConfig _config;

  Future<List<TenantEntry>> fetchTenants() async {
    try {
      final response = await _api.get<dynamic>(
        'tenants',
        '',
        queryParameters: {'limit': 100},
      );

      if (response is List) {
        return response
            .whereType<Map<String, dynamic>>()
            .map(TenantEntry.fromJson)
            .toList();
      }

      if (response is Map<String, dynamic>) {
        final data = response['data'];
        if (data is List) {
          return data
              .whereType<Map<String, dynamic>>()
              .map(TenantEntry.fromJson)
              .toList();
        }
      }
    } catch (_) {}

    return [
      TenantEntry(
        id: _config.defaultTenantId,
        name: _config.defaultTenantId,
      ),
    ];
  }
}
