import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/core/constants/storage_keys.dart';

class SecureStorageService {
  SecureStorageService({FlutterSecureStorage? storage})
      : _storage = storage ??
            const FlutterSecureStorage(
              aOptions: AndroidOptions(encryptedSharedPreferences: true),
            );

  final FlutterSecureStorage _storage;

  Future<void> saveSession({
    required String accessToken,
    required String refreshToken,
    required String tenantId,
    required AuthUser user,
  }) async {
    await Future.wait([
      _storage.write(key: StorageKeys.accessToken, value: accessToken),
      _storage.write(key: StorageKeys.refreshToken, value: refreshToken),
      _storage.write(key: StorageKeys.tenantId, value: tenantId),
      _storage.write(key: StorageKeys.userJson, value: jsonEncode(user.toJson())),
    ]);
  }

  Future<void> updateTokens({
    required String accessToken,
    String? refreshToken,
  }) async {
    await _storage.write(key: StorageKeys.accessToken, value: accessToken);
    if (refreshToken != null) {
      await _storage.write(key: StorageKeys.refreshToken, value: refreshToken);
    }
  }

  Future<void> updateTenantId(String tenantId) async {
    await _storage.write(key: StorageKeys.tenantId, value: tenantId);
  }

  Future<void> updateUser(AuthUser user) async {
    await _storage.write(key: StorageKeys.userJson, value: jsonEncode(user.toJson()));
  }

  Future<String?> getAccessToken() => _storage.read(key: StorageKeys.accessToken);

  Future<String?> getRefreshToken() => _storage.read(key: StorageKeys.refreshToken);

  Future<String?> getTenantId() => _storage.read(key: StorageKeys.tenantId);

  Future<AuthUser?> getUser() async {
    final raw = await _storage.read(key: StorageKeys.userJson);
    if (raw == null) return null;
    return AuthUser.fromJson(jsonDecode(raw) as Map<String, dynamic>);
  }

  Future<void> saveFcmToken(String token) =>
      _storage.write(key: StorageKeys.fcmToken, value: token);

  Future<String?> getFcmToken() => _storage.read(key: StorageKeys.fcmToken);

  Future<void> clearSession() async {
    await Future.wait([
      _storage.delete(key: StorageKeys.accessToken),
      _storage.delete(key: StorageKeys.refreshToken),
      _storage.delete(key: StorageKeys.tenantId),
      _storage.delete(key: StorageKeys.userJson),
    ]);
  }
}
