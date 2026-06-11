import { Injectable } from "@nestjs/common";
import { UserAggregate } from "@ordella/domain";
import type { RegisterDto } from "@/auth/dto/register.dto";
import { UsersService } from "@/users/users.service";
import { EmailService } from "@/email/email.service";
import { AuthEventPublisher } from "@/events/auth-event.publisher";
import { createUserRegisteredEvent } from "@/auth/events/user-registered.event";
import { DEFAULT_USER_ROLE } from "@/constants";
import { generateEmailVerificationToken } from "@/utils/token";

export type RegisterCommandInput = {
  tenantId: string;
  dto: RegisterDto;
  correlationId?: string;
};

@Injectable()
export class RegisterCommand {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
    private readonly eventPublisher: AuthEventPublisher,
  ) {}

  async execute(input: RegisterCommandInput) {
    const role = input.dto.role ?? DEFAULT_USER_ROLE;

    const aggregateResult = UserAggregate.create({
      id: crypto.randomUUID(),
      tenantId: input.tenantId,
      firstName: input.dto.email.split("@")[0] ?? "User",
      lastName: "Account",
      email: input.dto.email,
      role: role as "OWNER" | "ADMIN" | "THERAPIST" | "STAFF",
      correlationId: input.correlationId,
    });

    if (aggregateResult.isFailure) {
      throw aggregateResult.error;
    }

    const user = await this.usersService.createUser({
      tenantId: input.tenantId,
      email: input.dto.email,
      password: input.dto.password,
      role,
    });

    const verificationToken = generateEmailVerificationToken({
      userId: user.id,
      tenantId: user.tenantId,
      email: user.email,
    });

    await this.emailService.sendVerificationEmail({
      tenantId: input.tenantId,
      email: user.email,
      token: verificationToken,
    });

    await this.eventPublisher.publishUserRegistered(
      createUserRegisteredEvent({
        tenantId: input.tenantId,
        userId: user.id,
        email: user.email,
        role: user.role,
      }),
      input.correlationId,
    );

    return user;
  }
}
