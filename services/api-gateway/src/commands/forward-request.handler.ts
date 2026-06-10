import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ForwardRequestCommand } from './forward-request.command';

@CommandHandler(ForwardRequestCommand)
export class ForwardRequestHandler implements ICommandHandler<ForwardRequestCommand> {
  async execute(command: ForwardRequestCommand): Promise<any> {
    // TODO: Implement API Gateway forwarding logic
    return { status: 'forwarded', command };
  }
}
