import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/cache_service.dart';

class BillingService {
  BillingService({required ApiClient apiClient, required CacheService cache})
      : _api = apiClient,
        _cache = cache;

  final ApiClient _api;
  final CacheService _cache;
  static const _cacheKey = 'billing_list';

  Future<List<Invoice>> listInvoices({String? patientId}) async {
    try {
      final response = await _api.get<dynamic>(
        'billing',
        '/invoices',
        queryParameters: {if (patientId != null) 'patientId': patientId},
      );
      final items = _normalizeList(response);
      await _cache.putList(_cacheKey, items.map(_toJson).toList());
      return items;
    } catch (e) {
      final cached = _cache.getList(_cacheKey, Invoice.fromJson);
      if (cached.isNotEmpty) return cached;
      rethrow;
    }
  }

  Future<Invoice> getInvoice(String id) async {
    final response =
        await _api.get<Map<String, dynamic>>('billing', '/invoices/$id');
    return Invoice.fromJson(response);
  }

  List<Invoice> _normalizeList(dynamic response) {
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(Invoice.fromJson)
          .toList();
    }
    if (response is Map<String, dynamic>) {
      final data = response['data'];
      if (data is List) {
        return data
            .whereType<Map<String, dynamic>>()
            .map(Invoice.fromJson)
            .toList();
      }
    }
    return [];
  }

  Map<String, dynamic> _toJson(Invoice invoice) => {
        'id': invoice.id,
        'tenantId': invoice.tenantId,
        'patientId': invoice.patientId,
        'invoiceNumber': invoice.invoiceNumber,
        'status': invoice.status,
        'subtotal': invoice.subtotal,
        'tax': invoice.tax,
        'discount': invoice.discount,
        'total': invoice.total,
        'currency': invoice.currency,
        'appointmentId': invoice.appointmentId,
        'dueDate': invoice.dueDate,
        'notes': invoice.notes,
        'createdAt': invoice.createdAt,
        'updatedAt': invoice.updatedAt,
      };
}
