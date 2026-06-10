import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/core/config/app_config.dart';
import 'package:ordella_mobile/core/routing/role_routes.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:ordella_mobile/services/appointment_service.dart';
import 'package:ordella_mobile/services/auth_service.dart';
import 'package:ordella_mobile/services/billing_service.dart';
import 'package:ordella_mobile/services/cache_service.dart';
import 'package:ordella_mobile/services/messaging_service.dart';
import 'package:ordella_mobile/services/notes_service.dart';
import 'package:ordella_mobile/services/notification_service.dart';
import 'package:ordella_mobile/services/profile_service.dart';
import 'package:ordella_mobile/services/push_notification_service.dart';
import 'package:ordella_mobile/services/secure_storage_service.dart';
import 'package:ordella_mobile/services/tenant_service.dart';

final appConfigProvider = Provider<AppConfig>((ref) => AppConfig.fromEnvironment());

final secureStorageProvider = Provider<SecureStorageService>((ref) {
  return SecureStorageService();
});

final cacheServiceProvider = Provider<CacheService>((ref) {
  return CacheService();
});

class AuthSession {
  const AuthSession({
    this.accessToken,
    this.tenantId,
    this.user,
    this.isLoading = false,
    this.isInitialized = false,
  });

  final String? accessToken;
  final String? tenantId;
  final AuthUser? user;
  final bool isLoading;
  final bool isInitialized;

  bool get isAuthenticated => accessToken != null && user != null;

  List<String> get roles => user?.resolvedRoles ?? [];

  String get dashboardPath => RoleRoutes.dashboardForRole(user?.role ?? 'USER');

  AuthSession copyWith({
    String? accessToken,
    String? tenantId,
    AuthUser? user,
    bool? isLoading,
    bool? isInitialized,
    bool clearUser = false,
    bool clearTokens = false,
  }) {
    return AuthSession(
      accessToken: clearTokens ? null : accessToken ?? this.accessToken,
      tenantId: tenantId ?? this.tenantId,
      user: clearUser ? null : user ?? this.user,
      isLoading: isLoading ?? this.isLoading,
      isInitialized: isInitialized ?? this.isInitialized,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthSession> {
  AuthNotifier(this._ref) : super(const AuthSession(isLoading: true)) {
    _bootstrap();
  }

  final Ref _ref;

  AuthService get _auth => _ref.read(authServiceProvider);
  SecureStorageService get _storage => _ref.read(secureStorageProvider);
  PushNotificationService get _push => _ref.read(pushNotificationServiceProvider);

  Future<void> _bootstrap() async {
    final token = await _storage.getAccessToken();
    final tenantId = await _storage.getTenantId();
    final user = await _storage.getUser();

    if (token == null || user == null) {
      state = const AuthSession(isInitialized: true);
      return;
    }

    state = AuthSession(
      accessToken: token,
      tenantId: tenantId,
      user: user,
      isLoading: true,
    );

    final restored = await _auth.restoreSession();
    if (restored == null) {
      state = const AuthSession(isInitialized: true);
      return;
    }

    final freshToken = await _storage.getAccessToken();
    final freshTenant = await _storage.getTenantId();
    state = AuthSession(
      accessToken: freshToken,
      tenantId: freshTenant,
      user: restored,
      isInitialized: true,
    );

    await _push.initialize();
  }

  Future<void> login({
    required String email,
    required String password,
    required String tenantId,
  }) async {
    state = state.copyWith(isLoading: true, tenantId: tenantId);
    await _storage.updateTenantId(tenantId);
    try {
      final tokens = await _auth.login(
        email: email,
        password: password,
        tenantId: tenantId,
      );
      state = AuthSession(
        accessToken: tokens.accessToken,
        tenantId: tenantId,
        user: tokens.user,
        isInitialized: true,
      );
      await _push.initialize();
    } finally {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> register({
    required String email,
    required String password,
    required String firstName,
    required String lastName,
    required String tenantId,
  }) async {
    state = state.copyWith(isLoading: true, tenantId: tenantId);
    await _storage.updateTenantId(tenantId);
    try {
      final tokens = await _auth.register(
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        tenantId: tenantId,
      );
      state = AuthSession(
        accessToken: tokens.accessToken,
        tenantId: tenantId,
        user: tokens.user,
        isInitialized: true,
      );
      await _push.initialize();
    } finally {
      state = state.copyWith(isLoading: false);
    }
  }

  Future<void> selectTenant(String tenantId) async {
    await _storage.updateTenantId(tenantId);
    state = state.copyWith(tenantId: tenantId);
  }

  Future<void> logout() async {
    await _push.unregister();
    await _auth.logout();
    state = const AuthSession(isInitialized: true);
  }

  Future<bool> refreshTokens() async {
    final ok = await _auth.refreshToken();
    if (!ok) {
      await logout();
      return false;
    }
    final token = await _storage.getAccessToken();
    final tenantId = await _storage.getTenantId();
    final user = await _storage.getUser();
    state = AuthSession(
      accessToken: token,
      tenantId: tenantId,
      user: user,
      isInitialized: true,
    );
    return true;
  }

  void updateUser(AuthUser user) {
    state = state.copyWith(user: user);
  }
}

final authProvider = StateNotifierProvider<AuthNotifier, AuthSession>((ref) {
  return AuthNotifier(ref);
});

final apiClientProvider = Provider<ApiClient>((ref) {
  final config = ref.watch(appConfigProvider);
  final auth = ref.watch(authProvider);

  return ApiClient(
    config: config,
    getContext: () => (
      accessToken: auth.accessToken,
      tenantId: auth.tenantId,
      correlationId: null,
    ),
    onUnauthorized: () => ref.read(authProvider.notifier).refreshTokens(),
  );
});

final authServiceProvider = Provider<AuthService>((ref) {
  return AuthService(
    apiClient: ref.watch(apiClientProvider),
    storage: ref.watch(secureStorageProvider),
  );
});

final tenantServiceProvider = Provider<TenantService>((ref) {
  return TenantService(
    apiClient: ref.watch(apiClientProvider),
    config: ref.watch(appConfigProvider),
  );
});

final appointmentServiceProvider = Provider<AppointmentService>((ref) {
  return AppointmentService(
    apiClient: ref.watch(apiClientProvider),
    cache: ref.watch(cacheServiceProvider),
  );
});

final notesServiceProvider = Provider<NotesService>((ref) {
  return NotesService(
    apiClient: ref.watch(apiClientProvider),
    cache: ref.watch(cacheServiceProvider),
  );
});

final billingServiceProvider = Provider<BillingService>((ref) {
  return BillingService(
    apiClient: ref.watch(apiClientProvider),
    cache: ref.watch(cacheServiceProvider),
  );
});

final messagingServiceProvider = Provider<MessagingService>((ref) {
  return MessagingService(
    apiClient: ref.watch(apiClientProvider),
    config: ref.watch(appConfigProvider),
  );
});

final notificationServiceProvider = Provider<NotificationService>((ref) {
  return NotificationService(
    apiClient: ref.watch(apiClientProvider),
    cache: ref.watch(cacheServiceProvider),
  );
});

final profileServiceProvider = Provider<ProfileService>((ref) {
  return ProfileService(
    apiClient: ref.watch(apiClientProvider),
    storage: ref.watch(secureStorageProvider),
  );
});

final pushNotificationServiceProvider = Provider<PushNotificationService>((ref) {
  return PushNotificationService(
    notificationService: ref.watch(notificationServiceProvider),
    storage: ref.watch(secureStorageProvider),
  );
});
