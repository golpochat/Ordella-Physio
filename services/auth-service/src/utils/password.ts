import { BCRYPT_ROUNDS } from "@ordella/security";
import { hashPassword as hash, comparePassword as compare } from "@ordella/security";

const SALT_ROUNDS = BCRYPT_ROUNDS;

export async function hashPassword(password: string): Promise<string> {
  return hash(password, SALT_ROUNDS);
}

export async function comparePassword(password: string, passwordHash: string): Promise<boolean> {
  return compare(password, passwordHash);
}

export { SALT_ROUNDS };
