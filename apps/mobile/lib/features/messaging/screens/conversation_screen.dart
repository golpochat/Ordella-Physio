import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/core/theme/app_colors.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/buttons/primary_button.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final conversationMessagesProvider =
    FutureProvider.autoDispose.family<List<MessagingMessage>, String>((ref, id) {
  return ref.watch(messagingServiceProvider).listMessages(id);
});

class ConversationScreen extends ConsumerStatefulWidget {
  const ConversationScreen({super.key, required this.id});

  final String id;

  @override
  ConsumerState<ConversationScreen> createState() => _ConversationScreenState();
}

class _ConversationScreenState extends ConsumerState<ConversationScreen> {
  final _messageController = TextEditingController();
  Timer? _pollTimer;
  bool _sending = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      final interval = ref.read(appConfigProvider).pollingIntervalMs;
      _pollTimer = Timer.periodic(Duration(milliseconds: interval), (_) {
        ref.invalidate(conversationMessagesProvider(widget.id));
      });
    });
  }

  @override
  void dispose() {
    _pollTimer?.cancel();
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _send() async {
    final content = _messageController.text.trim();
    if (content.isEmpty) return;

    setState(() => _sending = true);
    try {
      await ref
          .read(messagingServiceProvider)
          .sendMessage(widget.id, content);
      _messageController.clear();
      ref.invalidate(conversationMessagesProvider(widget.id));
    } finally {
      if (mounted) setState(() => _sending = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final async = ref.watch(conversationMessagesProvider(widget.id));
    final userId = ref.watch(authProvider).user?.id;

    return Scaffold(
      appBar: AppBar(title: const Text('Conversation')),
      body: Column(
        children: [
          Expanded(
            child: async.when(
              loading: () => const LoadingView(),
              error: (e, _) => ErrorView(
                message: e.toString(),
                onRetry: () =>
                    ref.invalidate(conversationMessagesProvider(widget.id)),
              ),
              data: (messages) => ListView.builder(
                padding: const EdgeInsets.all(16),
                itemCount: messages.length,
                itemBuilder: (context, index) {
                  final msg = messages[index];
                  final isOwn = msg.senderId == userId || msg.isOwn;
                  return Align(
                    alignment:
                        isOwn ? Alignment.centerRight : Alignment.centerLeft,
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
                        vertical: 10,
                      ),
                      constraints: BoxConstraints(
                        maxWidth: MediaQuery.sizeOf(context).width * 0.75,
                      ),
                      decoration: BoxDecoration(
                        color: isOwn
                            ? AppColors.primary
                            : AppColors.border,
                        borderRadius: BorderRadius.circular(12),
                      ),
                      child: Text(
                        msg.content,
                        style: TextStyle(
                          color: isOwn ? Colors.white : AppColors.textPrimary,
                        ),
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _messageController,
                    decoration: const InputDecoration(
                      hintText: 'Type a message...',
                    ),
                    onSubmitted: (_) => _send(),
                  ),
                ),
                const SizedBox(width: 8),
                PrimaryButton(
                  label: 'Send',
                  isLoading: _sending,
                  isExpanded: false,
                  onPressed: _send,
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
