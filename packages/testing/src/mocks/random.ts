let sequence = 0;
let seed = 42;

export function resetMockSequence(nextSeed = 42): void {
  sequence = 0;
  seed = nextSeed;
}

export function nextSequence(): number {
  sequence += 1;
  return sequence;
}

function pseudoRandom(): number {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

export function randomFrom<T>(items: readonly T[]): T {
  const index = Math.floor(pseudoRandom() * items.length);
  return items[index] as T;
}

export function randomInt(min: number, max: number): number {
  return Math.floor(pseudoRandom() * (max - min + 1)) + min;
}

export function randomHex(length: number): string {
  const chars = "0123456789abcdef";
  let value = "";
  for (let index = 0; index < length; index += 1) {
    value += chars[randomInt(0, chars.length - 1)];
  }
  return value;
}
