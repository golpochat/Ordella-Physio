export class ForwardRequestCommand {
  constructor(
    public readonly service: string,
    public readonly path: string,
    public readonly method: string,
    public readonly body?: any,
    public readonly headers?: Record<string, any>,
  ) {}
}
