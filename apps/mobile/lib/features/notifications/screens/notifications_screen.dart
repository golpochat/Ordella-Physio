import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/core/theme/app_colors.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/lists/app_list_tile.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final notificationsProvider =
    FutureProvider.autoDispose<List<AppNotification>>((ref) {
  return ref.watch(notificationServiceProvider).list();
});

class NotificationsScreen extends ConsumerStatefulWidget {
  const NotificationsScreen({super.key});

  @override
  ConsumerState<NotificationsScreen> createState() =>
      _NotificationsScreenState();
}

class _NotificationsScreenState extends ConsumerState<NotificationsScreen> {
  Timer? _pollTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final interval = ref.read(appConfigProvider).pollingIntervalMs;
      _pollTimer = Timer.periodic(Duration(milliseconds: interval), (_) {
        ref.invalidate(notificationsProvider);
      });
    });
  }

  @override
  void dispose() {
    _pollTimer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final async = ref.watch(notificationsProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Notifications'),
        actions: [
          TextButton(
            onPressed: () async {
              await ref.read(notificationServiceProvider).markAllRead();
              ref.invalidate(notificationsProvider);
            },
            child: const Text('Mark all read'),
          ),
        ],
      ),
      body: async.when(
        loading: () => const LoadingView(message: 'Loading notifications...'),
        error: (e, _) => ErrorView(
          message: e.toString(),
          isOffline: e.toString().contains('SocketException'),
          onRetry: () => ref.invalidate(notificationsProvider),
        ),
        data: (items) {
          if (items.isEmpty) {
            return const Center(child: Text('No notifications'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final notification = items[index];
              return AppListTile(
                title: notification.title,
                subtitle: notification.message,
                trailing: notification.isRead
                    ? null
                    : const Icon(Icons.circle, size: 10, color: AppColors.primary),
                onTap: () async {
                  if (!notification.isRead) {
                    await ref
                        .read(notificationServiceProvider)
                        .markRead([notification.id]);
                    ref.invalidate(notificationsProvider);
                  }
                },
              );
            },
          );
        },
      ),
    );
  }
}
