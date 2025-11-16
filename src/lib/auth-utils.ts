import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;
const MAX_LOGIN_ATTEMPTS = 5;
const LOCK_TIME = 15 * 60 * 1000; // 15 minutos

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export function isAccountLocked(lockedUntil?: Date): boolean {
  if (!lockedUntil) return false;
  return new Date() < lockedUntil;
}

export function calculateLockTime(): Date {
  return new Date(Date.now() + LOCK_TIME);
}

export function shouldLockAccount(attempts: number): boolean {
  return attempts >= MAX_LOGIN_ATTEMPTS;
}

export const AUTH_CONSTANTS = {
  MAX_LOGIN_ATTEMPTS,
  LOCK_TIME_MINUTES: LOCK_TIME / 60000,
};
