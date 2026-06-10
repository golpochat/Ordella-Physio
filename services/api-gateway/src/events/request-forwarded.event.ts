export class RequestForwardedEvent {
  constructor(
    public readonly service: string,
    public readonly path: string,
    public readonly metadata?: Record<string, any>,
  ) {}
}
