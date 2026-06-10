import { AggregateRoot } from "../core/aggregate-root";
import { ok, type Result } from "../core/result";
import { TenantCreated, TenantUpdated } from "../events/tenant.events";

export type TenantLocation = {
  id: string;
  name: string;
};

export type TenantStaffMember = {
  userId: string;
  role: string;
};

export type TenantAggregateProps = {
  id: string;
  name: string;
  slug: string;
  locations: TenantLocation[];
  staff: TenantStaffMember[];
};

export type CreateTenantAggregateInput = {
  id: string;
  name: string;
  slug: string;
  correlationId?: string;
};

export class TenantAggregate extends AggregateRoot<TenantAggregateProps> {
  private constructor(props: TenantAggregateProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get locations(): TenantLocation[] {
    return [...this.props.locations];
  }

  get staff(): TenantStaffMember[] {
    return [...this.props.staff];
  }

  static create(input: CreateTenantAggregateInput): Result<TenantAggregate> {
    const aggregate = new TenantAggregate({
      id: input.id,
      name: input.name.trim(),
      slug: input.slug.trim(),
      locations: [],
      staff: [],
    });

    aggregate.addDomainEvent(
      new TenantCreated(
        {
          tenantId: aggregate.id,
          name: aggregate.name,
          slug: aggregate.slug,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  update(changes: Partial<{ name: string; slug: string }>, correlationId?: string): Result<void> {
    if (changes.name) {
      (this.props as TenantAggregateProps).name = changes.name.trim();
    }
    if (changes.slug) {
      (this.props as TenantAggregateProps).slug = changes.slug.trim();
    }

    this.addDomainEvent(
      new TenantUpdated(
        {
          tenantId: this.id,
          changes: changes as Record<string, unknown>,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }

  addLocation(location: TenantLocation): void {
    this.props.locations.push(location);
  }

  addStaffMember(member: TenantStaffMember): void {
    this.props.staff.push(member);
  }
}
