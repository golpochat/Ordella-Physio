"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardBody, CardHeader, CardTitle } from "@/components/ui/card";
import { Input, Label } from "@/components/ui/input";
import {
  useReindexAll,
  useReindexIndex,
  useSearchIndexApi,
  useSemanticConfig,
} from "@/hooks/useSearchIndex";
import type { SearchIndexName } from "@/lib/search-index-types";

const INDEXES: SearchIndexName[] = ["patients", "appointments", "invoices", "staff"];

export function SearchSettingsPanel() {
  const searchApi = useSearchIndexApi();
  const reindexAll = useReindexAll();
  const [selectedIndex, setSelectedIndex] = useState<SearchIndexName>("patients");
  const [rankingRules, setRankingRules] = useState(
    '{"exactMatchBoost":10,"prefixMatchBoost":5,"fieldBoosts":{"name":5,"phone":3,"email":3}}',
  );
  const [synonyms, setSynonyms] = useState(
    '{"doctor":["physician","dr"],"appointment":["visit","consultation"]}',
  );
  const [stopwords, setStopwords] = useState('["the","a","an","of"]');
  const reindexIndex = useReindexIndex(selectedIndex);
  const semanticConfigQuery = useSemanticConfig(selectedIndex);
  const [semanticEnabled, setSemanticEnabled] = useState(false);
  const [lexicalWeight, setLexicalWeight] = useState(0.6);
  const [semanticWeight, setSemanticWeight] = useState(0.4);

  useEffect(() => {
    const settings = semanticConfigQuery.data?.settings;
    if (!settings) {
      return;
    }

    setSemanticEnabled(settings.semanticEnabled ?? false);
    setLexicalWeight(settings.lexicalWeight ?? 0.6);
    setSemanticWeight(settings.semanticWeight ?? 0.4);
  }, [semanticConfigQuery.data]);

  async function handleSaveSemanticConfig() {
    try {
      const result = await searchApi.setSemanticConfig(selectedIndex, {
        semanticEnabled,
        lexicalWeight,
        semanticWeight,
      });
      toast.success(result.message ?? "Semantic search settings saved.");
      await semanticConfigQuery.refetch();
    } catch {
      toast.error("Failed to save semantic search settings.");
    }
  }

  async function handleSaveRankingRules() {
    try {
      const parsed = JSON.parse(rankingRules) as Record<string, unknown>;
      const result = await searchApi.setRankingRules(selectedIndex, parsed);
      toast.success((result as { message?: string }).message ?? "Ranking rules saved.");
    } catch {
      toast.error("Ranking rules must be valid JSON.");
    }
  }

  async function handleSaveSynonyms() {
    try {
      const parsed = JSON.parse(synonyms) as Record<string, string[]>;
      const result = await searchApi.setSynonyms(selectedIndex, parsed);
      toast.success((result as { message?: string }).message ?? "Synonyms saved.");
    } catch {
      toast.error("Synonyms must be valid JSON.");
    }
  }

  async function handleSaveStopwords() {
    try {
      const parsed = JSON.parse(stopwords) as string[];
      const result = await searchApi.setStopwords(selectedIndex, parsed);
      toast.success((result as { message?: string }).message ?? "Stopwords saved.");
    } catch {
      toast.error("Stopwords must be a JSON array.");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Search settings</h1>
        <p className="text-muted-foreground">Tune relevance, synonyms, and rebuild indexes.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Reindex</CardTitle>
        </CardHeader>
        <CardBody className="flex flex-wrap items-end gap-3">
          <label className="grid gap-1 text-sm">
            <span>Index</span>
            <select
              className="input"
              value={selectedIndex}
              onChange={(event) => setSelectedIndex(event.target.value as SearchIndexName)}
            >
              {INDEXES.map((indexName) => (
                <option key={indexName} value={indexName}>
                  {indexName}
                </option>
              ))}
            </select>
          </label>
          <Button
            type="button"
            variant="outline"
            disabled={reindexIndex.isPending}
            onClick={() =>
              void reindexIndex.mutateAsync().then((result) => toast.success(result.message))
            }
          >
            Reindex selected
          </Button>
          <Button
            type="button"
            disabled={reindexAll.isPending}
            onClick={() =>
              void reindexAll.mutateAsync().then((result) => toast.success(result.message))
            }
          >
            Reindex all
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Semantic search ({selectedIndex})</CardTitle>
        </CardHeader>
        <CardBody className="space-y-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={semanticEnabled}
              onChange={(event) => setSemanticEnabled(event.target.checked)}
              className="h-4 w-4"
            />
            Enable semantic search for this index
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-1 text-sm">
              <span>Lexical weight ({lexicalWeight.toFixed(2)})</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={lexicalWeight}
                onChange={(event) => setLexicalWeight(Number(event.target.value))}
                className="w-full"
              />
            </label>
            <label className="grid gap-1 text-sm">
              <span>Semantic weight ({semanticWeight.toFixed(2)})</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={semanticWeight}
                onChange={(event) => setSemanticWeight(Number(event.target.value))}
                className="w-full"
              />
            </label>
          </div>
          <p className="text-sm text-muted-foreground">
            Embedding model: {semanticConfigQuery.data?.embeddingModel ?? "LOCAL_MINILM"} (
            {semanticConfigQuery.data?.dimensions ?? 384} dimensions)
          </p>
          <Button type="button" onClick={() => void handleSaveSemanticConfig()}>
            Save semantic settings
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Ranking rules ({selectedIndex})</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <Label htmlFor="ranking-rules">JSON rules</Label>
          <textarea
            id="ranking-rules"
            className="input min-h-32 w-full font-mono text-sm"
            value={rankingRules}
            onChange={(event) => setRankingRules(event.target.value)}
          />
          <Button type="button" onClick={() => void handleSaveRankingRules()}>
            Save ranking rules
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Synonyms ({selectedIndex})</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <textarea
            className="input min-h-28 w-full font-mono text-sm"
            value={synonyms}
            onChange={(event) => setSynonyms(event.target.value)}
          />
          <Button type="button" variant="outline" onClick={() => void handleSaveSynonyms()}>
            Save synonyms
          </Button>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stopwords ({selectedIndex})</CardTitle>
        </CardHeader>
        <CardBody className="space-y-3">
          <Input value={stopwords} onChange={(event) => setStopwords(event.target.value)} />
          <Button type="button" variant="outline" onClick={() => void handleSaveStopwords()}>
            Save stopwords
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
