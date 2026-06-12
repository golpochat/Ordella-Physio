import { Injectable, OnModuleInit } from "@nestjs/common";
import type { NotificationChannel, NotificationProviderName } from "@/generated/prisma";
import {
  EmailSendgridProvider,
  type EmailSendInput,
  type ProviderSendResult,
} from "@/services/providers/email-sendgrid.provider";
import { PushFirebaseProvider, type PushSendInput } from "@/services/providers/push-firebase.provider";
import { SmsTwilioProvider, type SmsSendInput } from "@/services/providers/sms-twilio.provider";
import { ViberProvider, type ViberSendInput } from "@/services/providers/viber.provider";
import {
  WhatsappTwilioProvider,
  type WhatsappSendInput,
} from "@/services/providers/whatsapp-twilio.provider";

export type ProviderSendPayload =
  | EmailSendInput
  | SmsSendInput
  | PushSendInput
  | WhatsappSendInput
  | ViberSendInput;

export interface ChannelProviderAdapter {
  send(payload: ProviderSendPayload): Promise<ProviderSendResult>;
  ping(): Promise<{ healthy: boolean }>;
}

type ProviderRouteKey = `${NotificationChannel}:${NotificationProviderName}`;

@Injectable()
export class ProviderRegistryService implements OnModuleInit {
  private readonly providers = new Map<NotificationProviderName, ChannelProviderAdapter>();
  private readonly channelRoutes = new Map<ProviderRouteKey, ChannelProviderAdapter>();

  constructor(
    private readonly emailSendgridProvider: EmailSendgridProvider,
    private readonly smsTwilioProvider: SmsTwilioProvider,
    private readonly pushFirebaseProvider: PushFirebaseProvider,
    private readonly whatsappTwilioProvider: WhatsappTwilioProvider,
    private readonly viberProvider: ViberProvider,
  ) {}

  onModuleInit() {
    this.registerProvider("SENDGRID", this.wrap(this.emailSendgridProvider));
    this.registerProvider("TWILIO", this.wrap(this.smsTwilioProvider));
    this.registerProvider("FIREBASE", this.wrap(this.pushFirebaseProvider));
    this.registerProvider("VIBER", this.wrap(this.viberProvider));

    this.registerChannelRoute("EMAIL", "SENDGRID", this.wrap(this.emailSendgridProvider));
    this.registerChannelRoute("SMS", "TWILIO", this.wrap(this.smsTwilioProvider));
    this.registerChannelRoute("WHATSAPP", "TWILIO", this.wrap(this.whatsappTwilioProvider));
    this.registerChannelRoute("VIBER", "VIBER", this.wrap(this.viberProvider));
    this.registerChannelRoute("PUSH", "FIREBASE", this.wrap(this.pushFirebaseProvider));
  }

  registerProvider(providerName: NotificationProviderName, providerInstance: ChannelProviderAdapter) {
    this.providers.set(providerName, providerInstance);
  }

  registerChannelRoute(
    channel: NotificationChannel,
    providerName: NotificationProviderName,
    providerInstance: ChannelProviderAdapter,
  ) {
    this.channelRoutes.set(`${channel}:${providerName}`, providerInstance);
  }

  getProvider(providerName: NotificationProviderName): ChannelProviderAdapter | undefined {
    return this.providers.get(providerName);
  }

  getProviderForChannel(
    channel: NotificationChannel,
    providerName: NotificationProviderName,
  ): ChannelProviderAdapter | undefined {
    return (
      this.channelRoutes.get(`${channel}:${providerName}`) ?? this.providers.get(providerName)
    );
  }

  private wrap<T extends { send: (input: never) => Promise<ProviderSendResult>; ping: () => Promise<{ healthy: boolean }> }>(
    provider: T,
  ): ChannelProviderAdapter {
    return {
      send: (payload) => provider.send(payload as never),
      ping: () => provider.ping(),
    };
  }
}
