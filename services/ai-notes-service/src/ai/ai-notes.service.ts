import { BadRequestException, Injectable } from "@nestjs/common";
import type {
  AiAcceptOutputInput,
  AiGenerateNoteInput,
  AiSummarizeNoteInput,
  AiTreatmentPlanInput,
} from "@ordella/validation";
import { AiNotesRepository } from "@/ai/ai-notes.repository";
import { ContextGathererService } from "@/ai/context/context-gatherer.service";
import {
  buildGenerateNotePrompt,
  buildSummarizePrompt,
  buildTreatmentPlanPrompt,
} from "@/ai/prompts/prompt-templates";
import { AiProviderService } from "@/ai/providers/ai-provider.service";
import {
  AI_DISCLAIMER,
  type AiNoteGenerateResult,
  type AiSummarizeResult,
  type AiTreatmentPlanResult,
  type AiTranscribeResult,
  type AuthenticatedAiUser,
} from "@/utils/ai-helpers";

@Injectable()
export class AiNotesService {
  constructor(
    private readonly repository: AiNotesRepository,
    private readonly contextGatherer: ContextGathererService,
    private readonly aiProvider: AiProviderService,
  ) {}

  async generateNote(
    tenantId: string,
    user: AuthenticatedAiUser,
    input: AiGenerateNoteInput,
    authorization?: string,
    correlationId?: string,
  ): Promise<AiNoteGenerateResult> {
    const context = await this.contextGatherer.gather({
      tenantId,
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      authorization,
      correlationId,
    });

    const prompt = buildGenerateNotePrompt(context, input.rawText);
    const completion = await this.aiProvider.complete(prompt);
    const parsed = this.parseJson<{
      soap: AiNoteGenerateResult["soap"];
      summary: string;
      recommendations: string[];
    }>(completion.content);

    await this.repository.logUsage({
      tenantId,
      userId: user.userId,
      operation: "generate",
      modelName: completion.modelName,
      promptTokens: completion.promptTokens,
      completionTokens: completion.completionTokens,
      totalTokens: completion.totalTokens,
      metadata: { patientId: input.patientId, appointmentId: input.appointmentId },
    });

    const record = await this.repository.storeOutput({
      tenantId,
      userId: user.userId,
      operation: "generate",
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      inputSummary: input.rawText?.slice(0, 500),
      output: parsed,
    });

    return {
      soap: parsed.soap,
      summary: parsed.summary,
      recommendations: parsed.recommendations ?? [],
      disclaimer: AI_DISCLAIMER,
      outputId: record.id,
    };
  }

  async summarizeAppointment(
    tenantId: string,
    user: AuthenticatedAiUser,
    input: AiSummarizeNoteInput,
    authorization?: string,
    correlationId?: string,
  ): Promise<AiSummarizeResult> {
    const context = await this.contextGatherer.gather({
      tenantId,
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      authorization,
      correlationId,
    });

    const prompt = buildSummarizePrompt(context);
    const completion = await this.aiProvider.complete(prompt);
    const parsed = this.parseJson<{ summary: string; keyFindings: string[] }>(completion.content);

    await this.repository.logUsage({
      tenantId,
      userId: user.userId,
      operation: "summarize",
      modelName: completion.modelName,
      promptTokens: completion.promptTokens,
      completionTokens: completion.completionTokens,
      totalTokens: completion.totalTokens,
      metadata: { patientId: input.patientId, appointmentId: input.appointmentId },
    });

    const record = await this.repository.storeOutput({
      tenantId,
      userId: user.userId,
      operation: "summarize",
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      output: parsed,
    });

    return {
      summary: parsed.summary,
      keyFindings: parsed.keyFindings ?? [],
      disclaimer: AI_DISCLAIMER,
      outputId: record.id,
    };
  }

  async suggestTreatmentPlan(
    tenantId: string,
    user: AuthenticatedAiUser,
    input: AiTreatmentPlanInput,
    authorization?: string,
    correlationId?: string,
  ): Promise<AiTreatmentPlanResult> {
    const context = await this.contextGatherer.gather({
      tenantId,
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      authorization,
      correlationId,
    });

    const prompt = buildTreatmentPlanPrompt(context, input.rawText);
    const completion = await this.aiProvider.complete(prompt);
    const parsed = this.parseJson<{
      goals: string[];
      interventions: string[];
      homeExercises: string[];
      followUp: string;
      precautions: string[];
    }>(completion.content);

    await this.repository.logUsage({
      tenantId,
      userId: user.userId,
      operation: "treatment-plan",
      modelName: completion.modelName,
      promptTokens: completion.promptTokens,
      completionTokens: completion.completionTokens,
      totalTokens: completion.totalTokens,
      metadata: { patientId: input.patientId, appointmentId: input.appointmentId },
    });

    const record = await this.repository.storeOutput({
      tenantId,
      userId: user.userId,
      operation: "treatment-plan",
      patientId: input.patientId,
      appointmentId: input.appointmentId,
      therapistId: input.therapistId,
      inputSummary: input.rawText?.slice(0, 500),
      output: parsed,
    });

    return {
      goals: parsed.goals ?? [],
      interventions: parsed.interventions ?? [],
      homeExercises: parsed.homeExercises ?? [],
      followUp: parsed.followUp ?? "",
      precautions: parsed.precautions ?? [],
      disclaimer: AI_DISCLAIMER,
      outputId: record.id,
    };
  }

  async transcribeAndGenerate(
    tenantId: string,
    user: AuthenticatedAiUser,
    input: AiGenerateNoteInput,
    audio: Buffer,
    filename: string,
    authorization?: string,
    correlationId?: string,
  ): Promise<AiNoteGenerateResult & { transcript: string }> {
    const transcript = await this.aiProvider.transcribeAudio(audio, filename);

    await this.repository.logUsage({
      tenantId,
      userId: user.userId,
      operation: "transcribe",
      modelName: "whisper-1",
      promptTokens: 0,
      completionTokens: 0,
      totalTokens: 0,
      metadata: { filename, transcriptLength: transcript.length },
    });

    const mergedRawText = [input.rawText, transcript].filter(Boolean).join("\n\n");
    const result = await this.generateNote(
      tenantId,
      user,
      { ...input, rawText: mergedRawText },
      authorization,
      correlationId,
    );

    return { ...result, transcript };
  }

  async recordAcceptance(
    tenantId: string,
    user: AuthenticatedAiUser,
    input: AiAcceptOutputInput,
  ) {
    await this.repository.updateAcceptance(input.outputId, tenantId, user.userId, input.accepted);
    return { outputId: input.outputId, accepted: input.accepted };
  }

  private parseJson<T>(content: string): T {
    try {
      return JSON.parse(content) as T;
    } catch {
      throw new BadRequestException("AI response was not valid JSON");
    }
  }
}
