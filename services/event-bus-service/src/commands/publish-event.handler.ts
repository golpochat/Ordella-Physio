import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PublishEventCommand } from './publish-event.command';

@CommandHandler(PublishEventCommand)
export class PublishEventHandler implements ICommandHandler<PublishEventCommand> {
  async execute(command: PublishEventCommand): Promise<any> {
    // TODO: Integrate with NATS JetStream publisher
    return { status: 'queued', command };
  }
}
