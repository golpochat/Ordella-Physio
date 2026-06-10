import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/secure_storage_service.dart';

class AuthService {
  AuthService({
    required ApiClient apiClient,
    required SecureStorageService storage,
  })  : _api = apiClient,
        _storage = storage;

  final ApiClient _api;
  final SecureStorageService _storage;

  Future<AuthTokensResponse> login({
    required String email,
    required String password,
    required String tenantId,
  }) async {
    final response = await _api.post<Map<String, dynamic>>(
      'auth',
      '/login',
      body: {'email': email, 'password': password},
    );
    final tokens = AuthTokensResponse.fromJson(response);
    await _storage.saveSession(
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tenantId: tenantId,
      user: tokens.user,
    );
    return tokens;
  }

  Future<AuthTokensResponse> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String tenantId,
  }) async {
    final response = await _api.post<Map<String, dynamic>>(
      'auth',
      '/register',
      body: {
        'email': email,
        'password': password,
        'firstName': firstName,
        'lastName': lastName,
      },
    );
    final tokens = AuthTokensResponse.fromJson(response);
    await _storage.saveSession(
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tenantId: tenantId,
      user: tokens.user,
    );
    return tokens;
  }

  Future<bool> refreshToken() async {
    final refresh = await _storage.getRefreshToken();
    final tenantId = await _storage.getTenantId();
    if (refresh == null || tenantId == null) return false;

    try {
      // Tenant id must be available in secure storage before refresh (read by ApiClient).
      final response = await _api.post<Map<String, dynamic>>(
        'auth',
        '/refresh',
        body: {'refreshToken': refresh},
      );
      final tokens = AuthTokensResponse.fromJson(response);
      await _storage.saveSession(
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        tenantId: tenantId,
        user: tokens.user,
      );
      return true;
    } catch (_) {
      return false;
    }
  }

  Future<AuthUser> getMe() async {
    final response = await _api.get<Map<String, dynamic>>('auth', '/me');
    final user = AuthUser.fromJson(response);
    await _storage.updateUser(user);
    return user;
  }

  Future<void> logout() async {
    final refresh = await _storage.getRefreshToken();
    if (refresh != null) {
      try {
        await _api.post<void>('auth', '/logout', body: {'refreshToken': refresh});
      } catch (_) {}
    }
    await _storage.clearSession();
  }

  Future<AuthUser?> restoreSession() async {
    final accessToken = await _storage.getAccessToken();
    final user = await _storage.getUser();
    if (accessToken == null || user == null) return null;

    try {
      return await getMe();
    } catch (_) {
      final refreshed = await refreshToken();
      if (!refreshed) {
        await _storage.clearSession();
        return null;
      }
      return _storage.getUser();
    }
  }
}
