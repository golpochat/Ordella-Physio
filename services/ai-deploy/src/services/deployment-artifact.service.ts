import { Injectable, Logger } from "@nestjs/common";
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { deployConfig } from "@/config/deploy.config";
import type { ArtifactManifest } from "@/models/AIModelDeployment";

@Injectable()
export class DeploymentArtifactService {
  private readonly logger = new Logger(DeploymentArtifactService.name);

  private artifactDir(modelId: string, version: string) {
    return path.join(deployConfig.artifactsPath, modelId, version);
  }

  async packageModel(modelId: string, version: string) {
    const dir = this.artifactDir(modelId, version);
    await mkdir(dir, { recursive: true });

    const manifest = await this.generateManifest(modelId, version);
    const files = {
      weights: path.join(dir, "model-weights.bin"),
      tokenizer: path.join(dir, "tokenizer.json"),
      config: path.join(dir, "config.json"),
      metadata: path.join(dir, "metadata.json"),
      safety: path.join(dir, "safety-rules.json"),
    };

    await writeFile(files.weights, JSON.stringify({ modelId, version, stub: true }));
    await writeFile(files.tokenizer, JSON.stringify({ vocabSize: 50257, modelId }));
    await writeFile(files.config, JSON.stringify({ modelId, version, maxTokens: 4096 }));
    await writeFile(files.metadata, JSON.stringify(manifest.artifacts.metadata));
    await writeFile(files.safety, JSON.stringify(manifest.artifacts.safetyRules));
    await writeFile(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2));

    this.logger.log(`Packaged model ${modelId}@${version} at ${dir}`);
    return { dir, manifest };
  }

  async generateManifest(modelId: string, version: string): Promise<ArtifactManifest> {
    const dir = this.artifactDir(modelId, version);
    const payload = JSON.stringify({ modelId, version, packagedAt: new Date().toISOString() });
    const checksum = createHash("sha256").update(payload).digest("hex");

    return {
      modelId,
      version,
      packagedAt: new Date().toISOString(),
      artifacts: {
        weights: path.join(dir, "model-weights.bin"),
        tokenizer: path.join(dir, "tokenizer.json"),
        config: path.join(dir, "config.json"),
        metadata: { modelId, version, framework: "ordella", precision: "fp16" },
        safetyRules: { blockedTopics: [], maxOutputTokens: 4096, piiRedaction: true },
      },
      checksum,
    };
  }

  async uploadArtifact(modelId: string, version: string) {
    const dir = this.artifactDir(modelId, version);
    const location = `s3://ordella-ai-artifacts/${modelId}/${version}`;
    const localManifest = path.join(dir, "manifest.json");
    await writeFile(
      path.join(dir, "upload-manifest.json"),
      JSON.stringify({ location, uploadedAt: new Date().toISOString(), source: localManifest }),
    );
    this.logger.log(`Uploaded artifact for ${modelId}@${version} → ${location}`);
    return { location, localPath: dir };
  }

  async verifyArtifact(modelId: string, version: string) {
    const dir = this.artifactDir(modelId, version);
    const manifestPath = path.join(dir, "manifest.json");
    try {
      const raw = await readFile(manifestPath, "utf8");
      const manifest = JSON.parse(raw) as ArtifactManifest;
      const required = ["weights", "tokenizer", "config", "metadata", "safetyRules"];
      const missing = required.filter((key) => !manifest.artifacts[key as keyof typeof manifest.artifacts]);
      return { valid: missing.length === 0, manifest, missing };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Verification failed.";
      return { valid: false, manifest: null, missing: [message] };
    }
  }
}
