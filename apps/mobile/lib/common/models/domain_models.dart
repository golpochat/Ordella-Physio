class Appointment {
  const Appointment({
    required this.id,
    required this.tenantId,
    required this.patientId,
    required this.therapistId,
    required this.startTime,
    required this.endTime,
    required this.status,
    required this.type,
    this.locationId,
    this.notes,
    this.cancellationReason,
    this.createdAt,
    this.updatedAt,
  });

  final String id;
  final String tenantId;
  final String patientId;
  final String therapistId;
  final String startTime;
  final String endTime;
  final String status;
  final String type;
  final String? locationId;
  final String? notes;
  final String? cancellationReason;
  final String? createdAt;
  final String? updatedAt;

  factory Appointment.fromJson(Map<String, dynamic> json) {
    return Appointment(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String,
      patientId: json['patientId'] as String,
      therapistId: json['therapistId'] as String,
      startTime: json['startTime'] as String,
      endTime: json['endTime'] as String,
      status: json['status'] as String,
      type: json['type'] as String,
      locationId: json['locationId'] as String?,
      notes: json['notes'] as String?,
      cancellationReason: json['cancellationReason'] as String?,
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }
}

class ClinicalNote {
  const ClinicalNote({
    required this.id,
    required this.tenantId,
    required this.patientId,
    required this.therapistId,
    required this.type,
    required this.content,
    this.appointmentId,
    this.attachments = const [],
    this.createdAt,
    this.updatedAt,
  });

  final String id;
  final String tenantId;
  final String patientId;
  final String therapistId;
  final String type;
  final String content;
  final String? appointmentId;
  final List<String> attachments;
  final String? createdAt;
  final String? updatedAt;

  factory ClinicalNote.fromJson(Map<String, dynamic> json) {
    return ClinicalNote(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String,
      patientId: json['patientId'] as String,
      therapistId: json['therapistId'] as String,
      type: json['type'] as String,
      content: json['content'] as String,
      appointmentId: json['appointmentId'] as String?,
      attachments: (json['attachments'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }

  Map<String, dynamic> toCreatePayload() => {
        'patientId': patientId,
        'therapistId': therapistId,
        'type': type,
        'content': content,
        if (appointmentId != null) 'appointmentId': appointmentId,
      };

  Map<String, dynamic> toUpdatePayload() => {
        'type': type,
        'content': content,
      };
}

class Invoice {
  const Invoice({
    required this.id,
    required this.tenantId,
    required this.patientId,
    required this.invoiceNumber,
    required this.status,
    required this.subtotal,
    required this.tax,
    required this.discount,
    required this.total,
    required this.currency,
    this.appointmentId,
    this.dueDate,
    this.notes,
    this.createdAt,
    this.updatedAt,
  });

  final String id;
  final String tenantId;
  final String patientId;
  final String invoiceNumber;
  final String status;
  final num subtotal;
  final num tax;
  final num discount;
  final num total;
  final String currency;
  final String? appointmentId;
  final String? dueDate;
  final String? notes;
  final String? createdAt;
  final String? updatedAt;

  factory Invoice.fromJson(Map<String, dynamic> json) {
    return Invoice(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String,
      patientId: json['patientId'] as String,
      invoiceNumber: json['invoiceNumber'] as String,
      status: json['status'] as String,
      subtotal: json['subtotal'] as num,
      tax: json['tax'] as num,
      discount: json['discount'] as num,
      total: json['total'] as num,
      currency: json['currency'] as String? ?? 'USD',
      appointmentId: json['appointmentId'] as String?,
      dueDate: json['dueDate'] as String?,
      notes: json['notes'] as String?,
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }
}

class MessagingConversation {
  const MessagingConversation({
    required this.id,
    required this.tenantId,
    required this.participants,
    this.lastMessage,
    this.unreadCount = 0,
    this.createdAt,
    this.updatedAt,
  });

  final String id;
  final String tenantId;
  final List<MessagingParticipant> participants;
  final MessagingMessage? lastMessage;
  final int unreadCount;
  final String? createdAt;
  final String? updatedAt;

  factory MessagingConversation.fromJson(Map<String, dynamic> json) {
    return MessagingConversation(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String,
      participants: (json['participants'] as List<dynamic>? ?? [])
          .map((e) => MessagingParticipant.fromJson(e as Map<String, dynamic>))
          .toList(),
      lastMessage: json['lastMessage'] != null
          ? MessagingMessage.fromJson(json['lastMessage'] as Map<String, dynamic>)
          : null,
      unreadCount: json['unreadCount'] as int? ?? 0,
      createdAt: json['createdAt'] as String?,
      updatedAt: json['updatedAt'] as String?,
    );
  }
}

class MessagingParticipant {
  const MessagingParticipant({
    required this.id,
    required this.userId,
    required this.role,
  });

  final String id;
  final String userId;
  final String role;

  factory MessagingParticipant.fromJson(Map<String, dynamic> json) {
    return MessagingParticipant(
      id: json['id'] as String,
      userId: json['userId'] as String,
      role: json['role'] as String,
    );
  }
}

class MessagingMessage {
  const MessagingMessage({
    required this.id,
    required this.conversationId,
    required this.senderId,
    required this.content,
    required this.createdAt,
    this.readAt,
    this.isOwn = false,
    this.isRead = false,
  });

  final String id;
  final String conversationId;
  final String senderId;
  final String content;
  final String createdAt;
  final String? readAt;
  final bool isOwn;
  final bool isRead;

  factory MessagingMessage.fromJson(Map<String, dynamic> json) {
    return MessagingMessage(
      id: json['id'] as String,
      conversationId: json['conversationId'] as String,
      senderId: json['senderId'] as String,
      content: json['content'] as String,
      createdAt: json['createdAt'] as String,
      readAt: json['readAt'] as String?,
      isOwn: json['isOwn'] as bool? ?? false,
      isRead: json['isRead'] as bool? ?? false,
    );
  }
}

class AppNotification {
  const AppNotification({
    required this.id,
    required this.userId,
    required this.type,
    required this.title,
    required this.message,
    required this.createdAt,
    this.tenantId,
    this.metadata,
    this.readAt,
    this.isRead = false,
  });

  final String id;
  final String? tenantId;
  final String userId;
  final String type;
  final String title;
  final String message;
  final dynamic metadata;
  final String? readAt;
  final bool isRead;
  final String createdAt;

  factory AppNotification.fromJson(Map<String, dynamic> json) {
    return AppNotification(
      id: json['id'] as String,
      tenantId: json['tenantId'] as String?,
      userId: json['userId'] as String,
      type: json['type'] as String,
      title: json['title'] as String,
      message: json['message'] as String,
      metadata: json['metadata'],
      readAt: json['readAt'] as String?,
      isRead: json['isRead'] as bool? ?? json['readAt'] != null,
      createdAt: json['createdAt'] as String,
    );
  }
}
