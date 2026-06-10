import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GenerateReportCommand } from './generate-report.command';

@CommandHandler(GenerateReportCommand)
export class GenerateReportHandler implements ICommandHandler<GenerateReportCommand> {
  async execute(command: GenerateReportCommand): Promise<any> {
    // TODO: Implement reporting logic
    return { status: 'pending', command };
  }
}
