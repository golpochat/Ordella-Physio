export class PublishEventCommand {
  constructor(
    public readonly subject: string,
    public readonly data: any,
    public readonly metadata?: Record<string, any>,
  ) {}
}
