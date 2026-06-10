import { Injectable } from "@nestjs/common";
import { randomString } from "@ordella/utils";
import type { CreateTemplateDto } from "@/templates/dto/create-template.dto";
import type { UpdateTemplateDto } from "@/templates/dto/update-template.dto";
import { TemplatesRepository } from "@/templates/templates.repository";
import { renderTemplateString } from "@/utils/template-renderer";
import { fetchTenantBrandingPlaceholder } from "@/utils/communication-helpers";

@Injectable()
export class TemplatesService {
  constructor(private readonly templatesRepository: TemplatesRepository) {}

  create(tenantId: string, dto: CreateTemplateDto) {
    return this.templatesRepository.create(tenantId, {
      id: randomString(24),
      key: dto.key,
      channel: dto.channel,
      subject: dto.subject,
      body: dto.body,
      variables: dto.variables ?? [],
      isDefault: dto.isDefault ?? false,
    });
  }

  list(tenantId: string) {
    return this.templatesRepository.list(tenantId);
  }

  findById(tenantId: string, templateId: string) {
    return this.templatesRepository.findById(tenantId, templateId);
  }

  findByKey(tenantId: string, key: string) {
    return this.templatesRepository.findByKey(tenantId, key);
  }

  update(tenantId: string, templateId: string, dto: UpdateTemplateDto) {
    return this.templatesRepository.update(tenantId, templateId, {
      subject: dto.subject,
      body: dto.body,
      variables: dto.variables,
      isDefault: dto.isDefault,
    });
  }

  async preview(tenantId: string, templateId: string, variables?: Record<string, unknown>) {
    const template = await this.templatesRepository.findById(tenantId, templateId);
    if (!template) {
      throw new Error("Template not found");
    }

    const branding = await fetchTenantBrandingPlaceholder(tenantId);
    return {
      subject: template.subject
        ? renderTemplateString({ templateBody: template.subject, variables, branding })
        : null,
      body: renderTemplateString({ templateBody: template.body, variables, branding }),
    };
  }
}
