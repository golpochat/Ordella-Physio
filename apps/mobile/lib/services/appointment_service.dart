import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/cache_service.dart';

class AppointmentService {
  AppointmentService({required ApiClient apiClient, required CacheService cache})
      : _api = apiClient,
        _cache = cache;

  final ApiClient _api;
  final CacheService _cache;
  static const _cacheKey = 'appointments_list';

  Future<List<Appointment>> listAppointments({
    String? patientId,
    String? therapistId,
    int page = 1,
    int limit = 50,
  }) async {
    try {
      final response = await _api.get<dynamic>(
        'appointments',
        '',
        queryParameters: {
          if (patientId != null) 'patientId': patientId,
          if (therapistId != null) 'therapistId': therapistId,
          'page': page,
          'limit': limit,
        },
      );
      final items = _normalizeList(response);
      await _cache.putList(_cacheKey, items.map((e) => _toJson(e)).toList());
      return items;
    } catch (e) {
      final cached = _cache.getList(_cacheKey, Appointment.fromJson);
      if (cached.isNotEmpty) return cached;
      rethrow;
    }
  }

  Future<Appointment> getAppointment(String id) async {
    final response = await _api.get<Map<String, dynamic>>('appointments', '/$id');
    return Appointment.fromJson(response);
  }

  List<Appointment> _normalizeList(dynamic response) {
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(Appointment.fromJson)
          .toList();
    }
    if (response is Map<String, dynamic>) {
      final data = response['data'];
      if (data is List) {
        return data
            .whereType<Map<String, dynamic>>()
            .map(Appointment.fromJson)
            .toList();
      }
    }
    return [];
  }

  Map<String, dynamic> _toJson(Appointment a) => {
        'id': a.id,
        'tenantId': a.tenantId,
        'patientId': a.patientId,
        'therapistId': a.therapistId,
        'startTime': a.startTime,
        'endTime': a.endTime,
        'status': a.status,
        'type': a.type,
        'locationId': a.locationId,
        'notes': a.notes,
        'cancellationReason': a.cancellationReason,
        'createdAt': a.createdAt,
        'updatedAt': a.updatedAt,
      };
}
