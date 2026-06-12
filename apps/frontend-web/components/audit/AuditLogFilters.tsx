"use client";

import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/input";
import { AUDIT_ACTIONS, AUDIT_ENTITY_TYPES, type AuditLogListFilters } from "@/lib/audit-types";
import type { ClinicUser } from "@/lib/clinic-portal-types";

const SELECT_CLASS =
  "flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm";

type AuditLogFiltersProps = {
  draft: AuditLogFilterDraft;
  users: ClinicUser[];
  disabled?: boolean;
  exportDisabled?: boolean;
  showEntityTypeFilter?: boolean;
  showExport?: boolean;
  onDraftChange: (draft: AuditLogFilterDraft) => void;
  onApply: () => void;
  onReset: () => void;
  onExport?: () => void;
};

export type AuditLogFilterDraft = {
  keyword: string;
  entityTypes: string[];
  actions: string[];
  actorUserIds: string[];
  dateStart: string;
  dateEnd: string;
};

export const EMPTY_AUDIT_LOG_FILTER_DRAFT: AuditLogFilterDraft = {
  keyword: "",
  entityTypes: [],
  actions: [],
  actorUserIds: [],
  dateStart: "",
  dateEnd: "",
};

export function auditFilterDraftToQuery(
  draft: AuditLogFilterDraft,
  pagination: Pick<AuditLogListFilters, "page" | "limit" | "sortBy" | "sortOrder">,
): AuditLogListFilters {
  return {
    ...pagination,
    keyword: draft.keyword.trim() || undefined,
    entityTypes: draft.entityTypes.length ? draft.entityTypes : undefined,
    actions: draft.actions.length ? draft.actions : undefined,
    actorUserIds: draft.actorUserIds.length ? draft.actorUserIds : undefined,
    dateStart: draft.dateStart ? new Date(draft.dateStart).toISOString() : undefined,
    dateEnd: draft.dateEnd ? new Date(draft.dateEnd).toISOString() : undefined,
  };
}

export function AuditLogFilters({
  draft,
  users,
  disabled = false,
  exportDisabled = false,
  showEntityTypeFilter = true,
  showExport = true,
  onDraftChange,
  onApply,
  onReset,
  onExport,
}: AuditLogFiltersProps) {
  return (
    <section className="audit-log-filters">
      <div className="audit-log-filters-grid">
        <div className="audit-log-filter-field">
          <Label htmlFor="domain-audit-keyword">Keyword</Label>
          <Input
            id="domain-audit-keyword"
            value={draft.keyword}
            disabled={disabled}
            placeholder="Search action, entity ID, metadata…"
            onChange={(event) => onDraftChange({ ...draft, keyword: event.target.value })}
          />
        </div>

        {showEntityTypeFilter ? (
          <div className="audit-log-filter-field">
            <Label htmlFor="domain-audit-entity-types">Entity types</Label>
            <select
              id="domain-audit-entity-types"
              className={SELECT_CLASS}
              multiple
              disabled={disabled}
              value={draft.entityTypes}
              onChange={(event) => {
                const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
                onDraftChange({ ...draft, entityTypes: selected });
              }}
            >
              {AUDIT_ENTITY_TYPES.map((entityType) => (
                <option key={entityType} value={entityType}>
                  {entityType}
                </option>
              ))}
            </select>
          </div>
        ) : null}

        <div className="audit-log-filter-field">
          <Label htmlFor="domain-audit-actions">Actions</Label>
          <select
            id="domain-audit-actions"
            className={SELECT_CLASS}
            multiple
            disabled={disabled}
            value={draft.actions}
            onChange={(event) => {
              const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
              onDraftChange({ ...draft, actions: selected });
            }}
          >
            {AUDIT_ACTIONS.map((action) => (
              <option key={action} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        <div className="audit-log-filter-field">
          <Label htmlFor="domain-audit-actors">Actors</Label>
          <select
            id="domain-audit-actors"
            className={SELECT_CLASS}
            multiple
            disabled={disabled}
            value={draft.actorUserIds}
            onChange={(event) => {
              const selected = Array.from(event.target.selectedOptions).map((option) => option.value);
              onDraftChange({ ...draft, actorUserIds: selected });
            }}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {[user.firstName, user.lastName].filter(Boolean).join(" ") || user.email}
              </option>
            ))}
          </select>
        </div>

        <div className="audit-log-filter-field">
          <Label htmlFor="domain-audit-date-start">From</Label>
          <Input
            id="domain-audit-date-start"
            type="datetime-local"
            value={draft.dateStart}
            disabled={disabled}
            onChange={(event) => onDraftChange({ ...draft, dateStart: event.target.value })}
          />
        </div>

        <div className="audit-log-filter-field">
          <Label htmlFor="domain-audit-date-end">To</Label>
          <Input
            id="domain-audit-date-end"
            type="datetime-local"
            value={draft.dateEnd}
            disabled={disabled}
            onChange={(event) => onDraftChange({ ...draft, dateEnd: event.target.value })}
          />
        </div>
      </div>

      <div className="audit-log-filters-actions">
        <Button type="button" className="btn-primary" disabled={disabled} onClick={onApply}>
          Apply filters
        </Button>
        <Button type="button" variant="outline" disabled={disabled} onClick={onReset}>
          Reset filters
        </Button>
        {showExport && onExport ? (
          <Button type="button" variant="outline" disabled={exportDisabled} onClick={onExport}>
            Export
          </Button>
        ) : null}
      </div>
    </section>
  );
}
