import type { UserRole } from "../enums";

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  tenantId: string;
  role?: UserRole;
}

export interface LoginDto {
  email: string;
  password: string;
  tenantId?: string;
}

export interface RefreshTokenDto {
  refreshToken: string;
}

/** @deprecated Use LoginDto */
export type LoginRequestDto = LoginDto;

/** @deprecated Use RefreshTokenDto */
export type RefreshTokenRequestDto = RefreshTokenDto;

export interface LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    role: UserRole;
    tenantId: string;
  };
}
