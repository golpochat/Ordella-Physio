import type { fetchServiceStatementData } from "./statements.repository";

export type ServiceStatementData = Awaited<ReturnType<typeof fetchServiceStatementData>>;

export type ServiceStatementOptions = {
  includeClinicalSummary?: boolean;
  from?: Date;
  to?: Date;
};

export type EmailServiceStatementInput = ServiceStatementOptions & {
  message?: string;
};
