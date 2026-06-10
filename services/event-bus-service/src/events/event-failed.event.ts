export class EventFailedEvent {
  constructor(
    public readonly subject: string,
    public readonly error: any,
    public readonly metadata?: Record<string, any>,
  ) {}
}
