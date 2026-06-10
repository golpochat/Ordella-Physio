import 'dart:convert';

import 'package:hive_flutter/hive_flutter.dart';

class CacheService {
  static const _boxName = 'ordella_offline_cache';

  Future<void> init() async {
    await Hive.initFlutter();
    await Hive.openBox<String>(_boxName);
  }

  Box<String> get _box => Hive.box<String>(_boxName);

  Future<void> put(String key, dynamic value) async {
    await _box.put(key, jsonEncode(value));
  }

  T? get<T>(String key, T Function(Map<String, dynamic>) fromJson) {
    final raw = _box.get(key);
    if (raw == null) return null;
    final decoded = jsonDecode(raw);
    if (decoded is Map<String, dynamic>) {
      return fromJson(decoded);
    }
    return null;
  }

  List<T> getList<T>(String key, T Function(Map<String, dynamic>) fromJson) {
    final raw = _box.get(key);
    if (raw == null) return [];
    final decoded = jsonDecode(raw);
    if (decoded is List) {
      return decoded
          .whereType<Map<String, dynamic>>()
          .map(fromJson)
          .toList();
    }
    return [];
  }

  Future<void> putList(String key, List<dynamic> items) async {
    await _box.put(key, jsonEncode(items));
  }

  Future<void> remove(String key) => _box.delete(key);

  Future<void> clear() => _box.clear();
}
