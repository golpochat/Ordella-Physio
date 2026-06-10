export class GenerateReportCommand {
  constructor(
    public readonly reportType: string,
    public readonly tenantId: string,
    public readonly payload?: any,
  ) {}
}
