import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { UserCreated, UserUpdated } from "../events/user.events";
import { Email } from "../value-objects/email.vo";
import { Name } from "../value-objects/name.vo";

export type UserRole = "OWNER" | "ADMIN" | "THERAPIST" | "STAFF";

export type UserAggregateProps = {
  id: string;
  tenantId: string;
  name: Name;
  email: Email;
  role: UserRole;
  isActive: boolean;
};

export type CreateUserAggregateInput = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  correlationId?: string;
};

export class UserAggregate extends AggregateRoot<UserAggregateProps> {
  private constructor(props: UserAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  get name(): Name {
    return this.props.name;
  }

  get email(): Email {
    return this.props.email;
  }

  get role(): UserRole {
    return this.props.role;
  }

  static create(input: CreateUserAggregateInput): Result<UserAggregate> {
    const nameResult = Name.create(input.firstName, input.lastName);
    if (nameResult.isFailure) {
      return fail(nameResult.error);
    }

    const emailResult = Email.create(input.email);
    if (emailResult.isFailure) {
      return fail(emailResult.error);
    }

    const aggregate = new UserAggregate({
      id: input.id,
      tenantId: input.tenantId,
      name: nameResult.value,
      email: emailResult.value,
      role: input.role,
      isActive: true,
    });

    aggregate.addDomainEvent(
      new UserCreated(
        {
          userId: aggregate.id,
          tenantId: aggregate.tenantId,
          email: aggregate.email.value,
          role: aggregate.role,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  update(changes: Partial<{ firstName: string; lastName: string; role: UserRole }>, correlationId?: string): Result<void> {
    if (changes.firstName || changes.lastName) {
      const nameResult = Name.create(
        changes.firstName ?? this.name.firstName,
        changes.lastName ?? this.name.lastName,
      );
      if (nameResult.isFailure) {
        return fail(nameResult.error);
      }
      (this.props as UserAggregateProps).name = nameResult.value;
    }

    if (changes.role) {
      (this.props as UserAggregateProps).role = changes.role;
    }

    this.addDomainEvent(
      new UserUpdated(
        {
          userId: this.id,
          tenantId: this.tenantId,
          changes: changes as Record<string, unknown>,
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
