export function isJson(value: string) {
  try {
    const result = JSON.parse(value);
    return result !== null && typeof result === "object";
  } catch {
    return false;
  }
}
