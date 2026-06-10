import 'dart:async';

import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/core/config/app_config.dart';
import 'package:ordella_mobile/services/api_client.dart';
import 'package:web_socket_channel/web_socket_channel.dart';

class MessagingService {
  MessagingService({required ApiClient apiClient, required AppConfig config})
      : _api = apiClient,
        _config = config;

  final ApiClient _api;
  final AppConfig _config;
  WebSocketChannel? _channel;
  final _messageController = StreamController<MessagingMessage>.broadcast();

  Stream<MessagingMessage> get messageStream => _messageController.stream;

  Future<List<MessagingConversation>> listConversations() async {
    final response = await _api.get<dynamic>('messaging', '/conversations');
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(MessagingConversation.fromJson)
          .toList();
    }
    return [];
  }

  Future<MessagingConversation> getConversation(String id) async {
    final response =
        await _api.get<Map<String, dynamic>>('messaging', '/conversations/$id');
    return MessagingConversation.fromJson(response);
  }

  Future<List<MessagingMessage>> listMessages(String conversationId) async {
    final response = await _api.get<dynamic>(
      'messaging',
      '/conversations/$conversationId/messages',
    );

    if (response is Map<String, dynamic>) {
      final items = response['items'];
      if (items is List) {
        return items
            .whereType<Map<String, dynamic>>()
            .map(MessagingMessage.fromJson)
            .toList();
      }
    }
    if (response is List) {
      return response
          .whereType<Map<String, dynamic>>()
          .map(MessagingMessage.fromJson)
          .toList();
    }
    return [];
  }

  Future<MessagingMessage> sendMessage(
    String conversationId,
    String content,
  ) async {
    final response = await _api.post<Map<String, dynamic>>(
      'messaging',
      '/conversations/$conversationId/messages',
      body: {'content': content},
    );
    return MessagingMessage.fromJson(response);
  }

  Future<void> markRead(String messageId) async {
    await _api.post<void>('messaging', '/messages/$messageId/read');
  }

  Future<int> unreadCount() async {
    final response =
        await _api.get<Map<String, dynamic>>('messaging', '/unread-count');
    return response['count'] as int? ?? 0;
  }

  void connectRealtime() {
    final wsUrl = _config.messagingWsUrl;
    if (wsUrl == null) return;

    disconnectRealtime();
    _channel = WebSocketChannel.connect(Uri.parse(wsUrl));
    _channel!.stream.listen((event) {
      try {
        if (event is String && event.contains('message')) {
          // Bridge payloads vary; polling remains the primary sync path.
        }
      } catch (_) {}
    });
  }

  void disconnectRealtime() {
    _channel?.sink.close();
    _channel = null;
  }

  void dispose() {
    disconnectRealtime();
    _messageController.close();
  }
}
