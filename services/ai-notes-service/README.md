# AI Notes Service

AI-assisted clinical documentation for the Ordella Physio platform.

## Features

- SOAP note generation from patient/appointment context
- Appointment summarization
- Treatment plan suggestions
- Optional voice-to-note via OpenAI Whisper
- Tenant-isolated AI usage logging (for future billing)
- Secure storage of AI outputs with accept/reject audit trail

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/ai/health` | Health check |
| POST | `/ai/notes/generate` | Generate SOAP note + summary + recommendations |
| POST | `/ai/notes/summarize` | Summarize appointment |
| POST | `/ai/notes/treatment-plan` | Suggest treatment plan |
| POST | `/ai/notes/transcribe` | Whisper transcription + note generation (multipart) |
| POST | `/ai/notes/accept` | Record accept/reject of AI output |

## Environment

See `.env.example`. Key variables:

- `AI_PROVIDER` — `openai` or `azure`
- `OPENAI_API_KEY` / `AZURE_OPENAI_*`
- `MODEL_NAME`, `MAX_TOKENS`, `TEMPERATURE`

## Local development

```bash
pnpm --filter @ordella/ai-notes-service dev
```

Default port: **3063**
