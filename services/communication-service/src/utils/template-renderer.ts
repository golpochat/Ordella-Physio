import Handlebars from "handlebars";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type RenderTemplateInput = {
  templateBody: string;
  variables?: Record<string, unknown>;
  branding?: Record<string, string>;
};

export function renderTemplateString(input: RenderTemplateInput): string {
  const context = { ...(input.branding ?? {}), ...(input.variables ?? {}) };
  const compiled = Handlebars.compile(input.templateBody);
  return compiled(context);
}

export function loadFallbackTemplateFile(filename: string): string {
  const templatePath = join(__dirname, "..", "templates", "templates", filename);
  return readFileSync(templatePath, "utf8");
}

export function renderFallbackTemplate(
  filename: string,
  variables?: Record<string, unknown>,
  branding?: Record<string, string>,
): string {
  const body = loadFallbackTemplateFile(filename);
  return renderTemplateString({ templateBody: body, variables, branding });
}
