import { AggregateRoot } from "../core/aggregate-root";
import { fail, ok, type Result } from "../core/result";
import { PatientCreated, PatientUpdated } from "../events/patient.events";
import { Email } from "../value-objects/email.vo";
import { Name } from "../value-objects/name.vo";
import { Phone } from "../value-objects/phone.vo";

export type MedicalRecordSnapshot = {
  allergies?: string | null;
  medications?: string | null;
  conditions?: string | null;
};

export type PatientAggregateProps = {
  id: string;
  tenantId: string;
  name: Name;
  email: Email | null;
  phone: Phone | null;
  dateOfBirth: Date | null;
  medicalRecord: MedicalRecordSnapshot;
};

export type CreatePatientAggregateInput = {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  dateOfBirth?: Date;
  correlationId?: string;
};

export class PatientAggregate extends AggregateRoot<PatientAggregateProps> {
  private constructor(props: PatientAggregateProps) {
    super(props);
  }

  get tenantId(): string {
    return this.props.tenantId;
  }

  static create(input: CreatePatientAggregateInput): Result<PatientAggregate> {
    const nameResult = Name.create(input.firstName, input.lastName);
    if (nameResult.isFailure) {
      return fail(nameResult.error);
    }

    let email: Email | null = null;
    if (input.email) {
      const emailResult = Email.create(input.email);
      if (emailResult.isFailure) {
        return fail(emailResult.error);
      }
      email = emailResult.value;
    }

    let phone: Phone | null = null;
    if (input.phone) {
      const phoneResult = Phone.create(input.phone);
      if (phoneResult.isFailure) {
        return fail(phoneResult.error);
      }
      phone = phoneResult.value;
    }

    const aggregate = new PatientAggregate({
      id: input.id,
      tenantId: input.tenantId,
      name: nameResult.value,
      email,
      phone,
      dateOfBirth: input.dateOfBirth ?? null,
      medicalRecord: {},
    });

    aggregate.addDomainEvent(
      new PatientCreated(
        {
          patientId: aggregate.id,
          tenantId: aggregate.tenantId,
          firstName: aggregate.props.name.firstName,
          lastName: aggregate.props.name.lastName,
        },
        input.correlationId,
      ),
    );

    return ok(aggregate);
  }

  updateMedicalRecord(record: MedicalRecordSnapshot, correlationId?: string): Result<void> {
    (this.props as PatientAggregateProps).medicalRecord = { ...record };

    this.addDomainEvent(
      new PatientUpdated(
        {
          patientId: this.id,
          tenantId: this.tenantId,
          changes: { medicalRecord: record },
        },
        correlationId,
      ),
    );

    return ok(undefined);
  }
}
