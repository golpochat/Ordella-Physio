import { Injectable } from "@nestjs/common";

@Injectable()
export class PromptTemplateService {
  renderTemplate(template: string, variables: Record<string, string> = {}) {
    let rendered = template;

    for (const [key, value] of Object.entries(variables)) {
      rendered = rendered.replaceAll(`{{${key}}}`, value);
    }

    return rendered.replace(/\{\{partial:([a-zA-Z0-9_.-]+)\}\}/g, (_, partialKey: string) => {
      return variables[partialKey] ?? "";
    });
  }
}
