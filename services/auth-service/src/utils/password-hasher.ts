import { comparePassword, hashPassword } from "@/utils/password";

export class PasswordHasher {
  async hash(plain: string): Promise<string> {
    return hashPassword(plain);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return comparePassword(plain, hash);
  }
}

export const passwordHasher = new PasswordHasher();
