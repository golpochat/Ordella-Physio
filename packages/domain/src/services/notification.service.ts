export type RoutingChannel = "EMAIL" | "SMS" | "PUSH" | "WEBHOOK" | "IN_APP";

export type NotificationPreference = {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
};

export type NotificationContext = {
  eventType: string;
  hasEmail: boolean;
  hasPhone: boolean;
  preferences: NotificationPreference;
};

export class NotificationDomainService {
  determineNotificationChannels(context: NotificationContext): RoutingChannel[] {
    const channels: RoutingChannel[] = [];

    if (context.preferences.emailEnabled && context.hasEmail) {
      channels.push("EMAIL");
    }

    if (context.preferences.smsEnabled && context.hasPhone) {
      channels.push("SMS");
    }

    if (context.preferences.pushEnabled) {
      channels.push("PUSH");
    }

    if (channels.length === 0) {
      channels.push("IN_APP");
    }

    return channels;
  }
}

export const notificationDomainService = new NotificationDomainService();
