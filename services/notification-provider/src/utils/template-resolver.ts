const BUILTIN_TEMPLATES: Record<string, { subject?: string; body: string }> = {

  APPOINTMENT_REMINDER: {

    subject: "Appointment reminder",

    body: "Hi {{name}}, your appointment is at {{time}}.",

  },

  INVOICE_READY: {
    subject: "Your invoice is ready",
    body: "Hello {{name}}, your invoice {{invoiceNumber}} is now available.",
  },
  REPORT_EXPORT: {
    subject: "Your report export is ready",
    body: "Hello, your report {{reportName}} is ready. {{downloadUrl}}",
  },
};


function applyVariables(template: string, variables: Record<string, string>): string {

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => variables[key] ?? "");

}



export function resolveTemplateContent(

  templateId: string | undefined,

  variables: Record<string, string> | undefined,

  fallbackMessage?: string,

) {

  if (!templateId) {

    return {

      subject: undefined as string | undefined,

      body: fallbackMessage ?? "",

      text: fallbackMessage,

    };

  }



  const template = BUILTIN_TEMPLATES[templateId];

  if (!template) {

    return {

      subject: undefined,

      body: fallbackMessage ?? templateId,

      text: fallbackMessage ?? templateId,

    };

  }



  const vars = variables ?? {};

  const body = applyVariables(template.body, vars);



  return {

    subject: template.subject ? applyVariables(template.subject, vars) : undefined,

    body,

    text: body,

  };

}


