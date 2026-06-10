import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/secure_storage_service.dart';

class ProfileService {
  ProfileService({
    required ApiClient apiClient,
    required SecureStorageService storage,
  })  : _api = apiClient,
        _storage = storage;

  final ApiClient _api;
  final SecureStorageService _storage;

  Future<AuthUser> getProfile() async {
    final response = await _api.get<Map<String, dynamic>>('auth', '/me');
    final user = AuthUser.fromJson(response);
    await _storage.updateUser(user);
    return user;
  }

  Future<AuthUser> updateProfile({
    String? firstName,
    String? lastName,
  }) async {
    final response = await _api.patch<Map<String, dynamic>>(
      'auth',
      '/me',
      body: {
        if (firstName != null) 'firstName': firstName,
        if (lastName != null) 'lastName': lastName,
      },
    );
    final user = AuthUser.fromJson(response);
    await _storage.updateUser(user);
    return user;
  }
}
