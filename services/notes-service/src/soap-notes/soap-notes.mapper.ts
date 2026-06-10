import type { SoapNote } from "@/generated/prisma";
import { toSoapNoteResponse } from "@/notes/notes.mapper";

export { toSoapNoteResponse };

export function toSoapNoteListResponse(items: SoapNote[]) {
  return items.map(toSoapNoteResponse);
}
