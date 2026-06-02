export function random(min: number, max: number, step: number): number {
  const range = (max - min) / step;

  const randomId = Math.floor(Math.random() * (range + 1));

  return min + randomId * step;
}
