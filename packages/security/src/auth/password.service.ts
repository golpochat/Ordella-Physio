import bcrypt from "bcrypt";
import { BCRYPT_ROUNDS } from "../constants/security-headers";

export type PasswordServiceOptions = {
  rounds?: number;
};

export class PasswordService {
  private readonly rounds: number;

  constructor(options: PasswordServiceOptions = {}) {
    this.rounds = options.rounds ?? BCRYPT_ROUNDS;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.rounds);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export function createPasswordService(options?: PasswordServiceOptions): PasswordService {
  return new PasswordService(options);
}

export async function hashPassword(password: string, rounds = BCRYPT_ROUNDS): Promise<string> {
  return bcrypt.hash(password, rounds);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
