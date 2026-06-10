import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/cache_service.dart';

class NotesService {
  NotesService({required ApiClient apiClient, required CacheService cache})
      : _api = apiClient,
        _cache = cache;

  final ApiClient _api;
  final CacheService _cache;
  static const _cacheKey = 'notes_list';

  Future<List<ClinicalNote>> listNotes({
    String? patientId,
    String? therapistId,
    int page = 1,
    int limit = 50,
  }) async {
    try {
      final response = await _api.get<dynamic>(
        'notes',
        '',
        queryParameters: {
          if (patientId != null) 'patientId': patientId,
          if (therapistId != null) 'therapistId': therapistId,
          'page': page,
          'limit': limit,
        },
      );
      final items = _normalizeList(response);
      await _cache.putList(_cacheKey, items.map(_toJson).toList());
      return items;
    } catch (e) {
      final cached = _cache.getList(_cacheKey, ClinicalNote.fromJson);
      if (cached.isNotEmpty) return cached;
      rethrow;
    }
  }

  Future<ClinicalNote> getNote(String id) async {
    final response = await _api.get<Map<String, dynamic>>('notes', '/$id');
    return ClinicalNote.fromJson(response);
  }

  Future<ClinicalNote> createNote(ClinicalNote draft) async {
    final response = await _api.post<Map<String, dynamic>>(
      'notes',
      '',
      body: draft.toCreatePayload(),
    );
    return ClinicalNote.fromJson(response);
  }

  Future<ClinicalNote> updateNote(String id, ClinicalNote draft) async {
    final response = await _api.patch<Map<String, dynamic>>(
      'notes',
      '/$id',
      body: draft.toUpdatePayload(),
    );
    return ClinicalNote.fromJson(response);
  }

  Future<void> deleteNote(String id) => _api.delete<void>('notes', '/$id');

  List<ClinicalNote> _normalizeList(dynamic response) {
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(ClinicalNote.fromJson)
          .toList();
    }
    if (response is Map<String, dynamic>) {
      final data = response['data'];
      if (data is List) {
        return data
            .whereType<Map<String, dynamic>>()
            .map(ClinicalNote.fromJson)
            .toList();
      }
    }
    return [];
  }

  Map<String, dynamic> _toJson(ClinicalNote note) => {
        'id': note.id,
        'tenantId': note.tenantId,
        'patientId': note.patientId,
        'therapistId': note.therapistId,
        'type': note.type,
        'content': note.content,
        'appointmentId': note.appointmentId,
        'attachments': note.attachments,
        'createdAt': note.createdAt,
        'updatedAt': note.updatedAt,
      };
}
