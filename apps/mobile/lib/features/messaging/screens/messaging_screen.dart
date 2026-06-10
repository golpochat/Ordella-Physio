import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/lists/app_list_tile.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final conversationsProvider =
    FutureProvider.autoDispose<List<MessagingConversation>>((ref) {
  return ref.watch(messagingServiceProvider).listConversations();
});

class MessagingScreen extends ConsumerStatefulWidget {
  const MessagingScreen({super.key});

  @override
  ConsumerState<MessagingScreen> createState() => _MessagingScreenState();
}

class _MessagingScreenState extends ConsumerState<MessagingScreen> {
  Timer? _pollTimer;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      ref.read(messagingServiceProvider).connectRealtime();
      final interval = ref.read(appConfigProvider).pollingIntervalMs;
      _pollTimer = Timer.periodic(Duration(milliseconds: interval), (_) {
        ref.invalidate(conversationsProvider);
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
    final async = ref.watch(conversationsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Messages')),
      body: async.when(
        loading: () => const LoadingView(message: 'Loading conversations...'),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(conversationsProvider),
        ),
        data: (items) {
          if (items.isEmpty) {
            return const Center(child: Text('No conversations yet'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final conv = items[index];
              final preview = conv.lastMessage?.content ?? 'No messages yet';
              return AppListTile(
                title: 'Conversation ${conv.id.substring(0, 8)}',
                subtitle: preview,
                trailing: conv.unreadCount > 0
                    ? CircleAvatar(
                        radius: 12,
                        child: Text('${conv.unreadCount}', style: const TextStyle(fontSize: 10)),
                      )
                    : null,
                onTap: () => context.push('/messages/${conv.id}'),
              );
            },
          );
        },
      ),
    );
  }
}
