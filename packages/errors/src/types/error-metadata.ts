export type ErrorMetadata = Record<string, unknown>;

export type ErrorDetails = {
  field?: string;
  constraint?: string;
  value?: unknown;
  path?: string[];
};

export type ValidationErrorMetadata = ErrorMetadata & {
  details?: ErrorDetails[];
};

export type NormalizedErrorPayload = {
  code: string;
  message: string;
  metadata?: ErrorMetadata;
  statusCode?: number;
};

export type StandardErrorResponse = {
  success: false;
  error: {
    code: string;
    message: string;
    metadata?: ErrorMetadata;
  };
  correlationId?: string;
  timestamp: string;
};
