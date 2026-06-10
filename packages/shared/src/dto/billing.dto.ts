export interface CreateInvoiceItemDto {
  description: string;
  quantity: number;
  unitPrice: number;
  taxRateId?: string;
}

export interface UpdateInvoiceItemDto extends Partial<CreateInvoiceItemDto> {}

export interface CreateInvoiceDto {
  patientId: string;
  appointmentId?: string;
  currency?: string;
  dueAt?: string;
  items: CreateInvoiceItemDto[];
}

export interface UpdateInvoiceDto {
  dueAt?: string;
  items?: CreateInvoiceItemDto[];
}

export interface CreateTaxRateDto {
  name: string;
  rate: number;
}

export interface UpdateTaxRateDto extends Partial<CreateTaxRateDto> {
  isActive?: boolean;
}
