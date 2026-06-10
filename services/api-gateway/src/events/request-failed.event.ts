export class RequestFailedEvent {
  constructor(
    public readonly service: string,
    public readonly path: string,
    public readonly error: any,
    public readonly metadata?: Record<string, any>,
  ) {}
}
