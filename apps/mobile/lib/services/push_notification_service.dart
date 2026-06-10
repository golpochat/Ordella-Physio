import 'dart:io';

import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:ordella_mobile/services/notification_service.dart';
import 'package:ordella_mobile/services/secure_storage_service.dart';

@pragma('vm:entry-point')
Future<void> firebaseMessagingBackgroundHandler(RemoteMessage message) async {
  await Firebase.initializeApp();
}

class PushNotificationService {
  PushNotificationService({
    required NotificationService notificationService,
    required SecureStorageService storage,
  })  : _notificationService = notificationService,
        _storage = storage;

  final NotificationService _notificationService;
  final SecureStorageService _storage;
  final FirebaseMessaging _messaging = FirebaseMessaging.instance;

  Future<void> initialize() async {
    try {
      await Firebase.initializeApp();
      FirebaseMessaging.onBackgroundMessage(firebaseMessagingBackgroundHandler);

      final settings = await _messaging.requestPermission();
      if (settings.authorizationStatus == AuthorizationStatus.denied) {
        return;
      }

      final token = await _messaging.getToken();
      if (token != null) {
        await _registerToken(token);
      }

      _messaging.onTokenRefresh.listen(_registerToken);
      FirebaseMessaging.onMessage.listen((_) {});
    } catch (_) {
      // Firebase config may be absent in local dev; app still works with polling.
    }
  }

  Future<void> _registerToken(String token) async {
    await _storage.saveFcmToken(token);
    final platform = Platform.isIOS ? 'ios' : 'android';
    try {
      await _notificationService.registerDeviceToken(
        token: token,
        platform: platform,
      );
    } catch (_) {}
  }

  Future<void> unregister() async {
    final token = await _storage.getFcmToken();
    if (token != null) {
      try {
        await _notificationService.unregisterDeviceToken(token);
      } catch (_) {}
    }
    await _messaging.deleteToken();
  }
}
